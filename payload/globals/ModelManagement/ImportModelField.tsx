'use client'

import { useState } from 'react'

interface ImportedModel {
  id: number
  modelId: string
  name: string
  author: string
  parameterLabel?: string | null
}

export function ImportModelField() {
  const [modelId, setModelId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; model?: ImportedModel } | null>(null)

  const handleImport = async () => {
    if (!modelId.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/admin/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelId: modelId.trim() }),
      })

      const data = await response.json() as { success?: boolean; message?: string; error?: string; model?: ImportedModel }

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Model imported successfully',
          model: data.model,
        })
        setModelId('')
        // Trigger a refresh of the model list by dispatching a custom event
        window.dispatchEvent(new CustomEvent('models-updated'))
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to import model',
        })
      }
    } catch {
      setResult({
        success: false,
        message: 'Network error - failed to import model',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="field-type">
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
        Import Model from HuggingFace
      </h3>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          placeholder="e.g., meta-llama/Llama-3.3-70B-Instruct"
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px 12px',
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            color: 'var(--theme-text)',
            fontSize: '14px',
            fontFamily: 'monospace',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleImport()
            }
          }}
        />
        <button
          type="button"
          onClick={handleImport}
          disabled={loading || !modelId.trim()}
          style={{
            padding: '10px 20px',
            background: loading ? 'var(--theme-elevation-200)' : 'var(--theme-success-500)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !modelId.trim() ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            opacity: loading || !modelId.trim() ? 0.6 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          {loading ? 'Importing...' : 'Import'}
        </button>
      </div>

      {result && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '4px',
            background: result.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${result.success ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: result.success ? 'var(--theme-success-500)' : 'var(--theme-error-500)',
            marginBottom: '16px',
          }}
        >
          <p style={{ margin: 0 }}>{result.message}</p>
          {result.model && (
            <p style={{ margin: '8px 0 0', fontSize: '13px', opacity: 0.8 }}>
              {result.model.author}/{result.model.name}
              {result.model.parameterLabel && ` (${result.model.parameterLabel})`}
            </p>
          )}
        </div>
      )}

      <p style={{ fontSize: '13px', color: 'var(--theme-elevation-500)', margin: 0 }}>
        Enter a HuggingFace model ID (e.g., &quot;meta-llama/Llama-3.3-70B-Instruct&quot;) to import it into your database.
        If the model already exists, it will be updated with the latest information.
      </p>
    </div>
  )
}
