'use client'

import { useCallback, useEffect, useState } from 'react'
import { useField, TextInput } from '@payloadcms/ui'

interface Model {
  id: number
  modelId: string
  name: string
  author: string
  parameterLabel?: string | null
  downloads?: number
}

export function ModelSelect() {
  const { value, setValue, path } = useField<string>({ path: 'modelId' })
  const [search, setSearch] = useState('')
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDisplay, setSelectedDisplay] = useState('')

  // Fetch models based on search
  const fetchModels = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setModels([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/models?search=${encodeURIComponent(query)}&limit=20`)
      if (response.ok) {
        const data = await response.json() as { models?: Model[] }
        setModels(data.models || [])
      }
    } catch (error) {
      console.error('Failed to fetch models:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchModels(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search, fetchModels])

  // Set initial display value
  useEffect(() => {
    if (value && !selectedDisplay) {
      setSelectedDisplay(value)
    }
  }, [value, selectedDisplay])

  const handleSelect = (model: Model) => {
    setValue(model.modelId)
    setSelectedDisplay(`${model.author}/${model.name}`)
    setSearch('')
    setIsOpen(false)
    setModels([])
  }

  const handleClear = () => {
    setValue('')
    setSelectedDisplay('')
    setSearch('')
  }

  return (
    <div className="field-type text" style={{ position: 'relative' }}>
      <label className="field-label" htmlFor={path}>
        Model
        <span className="required">*</span>
      </label>

      {/* Selected value display */}
      {selectedDisplay && !isOpen ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => setIsOpen(true)}
        >
          <span style={{ fontFamily: 'monospace' }}>{selectedDisplay}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleClear()
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 4px',
              color: 'var(--theme-elevation-500)',
            }}
          >
            ×
          </button>
        </div>
      ) : (
        /* Search input */
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search models (e.g., llama, mistral, gpt)..."
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            color: 'var(--theme-text)',
            fontSize: '14px',
          }}
        />
      )}

      {/* Dropdown results */}
      {isOpen && (search.length >= 2 || models.length > 0) && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'var(--theme-elevation-50)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            marginTop: '4px',
            maxHeight: '300px',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {loading ? (
            <div style={{ padding: '12px', textAlign: 'center', color: 'var(--theme-elevation-500)' }}>
              Loading...
            </div>
          ) : models.length === 0 ? (
            <div style={{ padding: '12px', textAlign: 'center', color: 'var(--theme-elevation-500)' }}>
              {search.length < 2 ? 'Type at least 2 characters to search' : 'No models found'}
            </div>
          ) : (
            models.map((model) => (
              <div
                key={model.id}
                onClick={() => handleSelect(model)}
                style={{
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--theme-elevation-100)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--theme-elevation-100)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: 'var(--theme-elevation-500)', fontSize: '12px' }}>
                      {model.author}/
                    </span>
                    <span style={{ fontWeight: 500 }}>{model.name}</span>
                  </div>
                  {model.parameterLabel && (
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        background: 'var(--theme-elevation-150)',
                        borderRadius: '3px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {model.parameterLabel}
                    </span>
                  )}
                </div>
                {model.downloads !== undefined && (
                  <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)', marginTop: '2px' }}>
                    {model.downloads.toLocaleString()} downloads
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
          }}
          onClick={() => {
            setIsOpen(false)
            if (!value) setSearch('')
          }}
        />
      )}

      {/* Hidden input for form value */}
      <input type="hidden" name={path} value={value || ''} />

      <div className="field-description" style={{ marginTop: '8px', fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
        Search and select a model from the database
      </div>
    </div>
  )
}
