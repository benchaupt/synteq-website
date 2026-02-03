'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Model {
  id: number
  modelId: string
  name: string
  author: string
  authorLogo?: string | null
  description?: string | null
  parameterLabel?: string | null
  downloads?: number
  likes?: number
  featured: boolean
  taskType?: string | null
  tags?: string[]
}

export function ModelListField() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'featured'>('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [editingModel, setEditingModel] = useState<Model | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    authorLogo: '',
  })
  const [uploading, setUploading] = useState(false)
  const [applyingToProvider, setApplyingToProvider] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchModels = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      })
      if (search) params.set('search', search)
      if (filter === 'featured') params.set('featured', 'true')

      const response = await fetch(`/api/models?${params}`)
      if (response.ok) {
        const data = await response.json() as { models?: Model[]; pagination?: { totalPages?: number } }
        setModels(data.models || [])
        setTotalPages(data.pagination?.totalPages || 1)
      }
    } catch (error) {
      console.error('Failed to fetch models:', error)
    } finally {
      setLoading(false)
    }
  }, [page, search, filter])

  useEffect(() => {
    fetchModels()
  }, [fetchModels])

  // Listen for model updates from import
  useEffect(() => {
    const handleUpdate = () => {
      fetchModels()
    }
    window.addEventListener('models-updated', handleUpdate)
    return () => window.removeEventListener('models-updated', handleUpdate)
  }, [fetchModels])

  const toggleFeatured = async (model: Model) => {
    setActionLoading(model.id)
    try {
      const response = await fetch('/api/admin/models', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: model.id, featured: !model.featured }),
      })

      if (response.ok) {
        setModels((prev) =>
          prev.map((m) => (m.id === model.id ? { ...m, featured: !m.featured } : m))
        )
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const deleteModel = async (model: Model) => {
    if (!confirm(`Delete "${model.modelId}"? This cannot be undone.`)) return

    setActionLoading(model.id)
    try {
      const response = await fetch(`/api/admin/models?id=${model.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setModels((prev) => prev.filter((m) => m.id !== model.id))
      }
    } catch (error) {
      console.error('Failed to delete model:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const resyncModel = async (model: Model) => {
    setActionLoading(model.id)
    try {
      const response = await fetch('/api/admin/models', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: model.id }),
      })

      if (response.ok) {
        const data = await response.json() as { model?: Model }
        if (data.model) {
          setModels((prev) =>
            prev.map((m) => (m.id === model.id ? { ...data.model!, tags: data.model!.tags } : m))
          )
        }
      }
    } catch (error) {
      console.error('Failed to re-sync model:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const openEditModal = async (model: Model) => {
    try {
      const response = await fetch(`/api/admin/models?id=${model.id}`)
      if (response.ok) {
        const fullModel = await response.json() as Model
        setEditingModel(fullModel)
        setEditForm({
          name: fullModel.name || '',
          description: fullModel.description || '',
          authorLogo: fullModel.authorLogo || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch model:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingModel) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('author', editingModel.author)

      const response = await fetch('/api/admin/models/upload-logo', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json() as { url?: string }
        if (data.url) {
          setEditForm((f) => ({ ...f, authorLogo: data.url! }))
        }
      } else {
        const error = await response.json() as { error?: string }
        alert(error.error || 'Failed to upload')
      }
    } catch (error) {
      console.error('Failed to upload logo:', error)
      alert('Failed to upload logo')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const applyLogoToProvider = async () => {
    if (!editingModel || !editForm.authorLogo) return

    setApplyingToProvider(true)
    try {
      const response = await fetch('/api/admin/models/apply-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: editingModel.author,
          authorLogo: editForm.authorLogo,
        }),
      })

      if (response.ok) {
        const data = await response.json() as { message?: string; count?: number }
        alert(data.message || `Logo applied to all ${editingModel.author} models`)
        // Refresh the list
        fetchModels()
      } else {
        const error = await response.json() as { error?: string }
        alert(error.error || 'Failed to apply logo')
      }
    } catch (error) {
      console.error('Failed to apply logo to provider:', error)
      alert('Failed to apply logo to provider')
    } finally {
      setApplyingToProvider(false)
    }
  }

  const saveEdit = async () => {
    if (!editingModel) return

    setActionLoading(editingModel.id)
    try {
      const response = await fetch('/api/admin/models', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingModel.id,
          name: editForm.name || editingModel.name,
          description: editForm.description || null,
          authorLogo: editForm.authorLogo || null,
        }),
      })

      if (response.ok) {
        const data = await response.json() as { model?: Model }
        if (data.model) {
          setModels((prev) =>
            prev.map((m) => (m.id === editingModel.id ? { ...m, ...data.model } : m))
          )
        }
        setEditingModel(null)
      }
    } catch (error) {
      console.error('Failed to save model:', error)
    } finally {
      setActionLoading(null)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="field-type" style={{ marginTop: '32px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>
        Manage Models
      </h3>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Search models..."
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            color: 'var(--theme-text)',
            fontSize: '14px',
          }}
        />
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value as 'all' | 'featured')
            setPage(1)
          }}
          style={{
            padding: '8px 12px',
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            color: 'var(--theme-text)',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <option value="all">All Models</option>
          <option value="featured">Featured Only</option>
        </select>
      </div>

      {/* Model List */}
      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--theme-elevation-500)' }}>
            Loading models...
          </div>
        ) : models.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--theme-elevation-500)' }}>
            No models found. Import some models using the form above.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--theme-elevation-100)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--theme-elevation-500)' }}>
                  Model
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--theme-elevation-500)' }}>
                  Task
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--theme-elevation-500)' }}>
                  Stats
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--theme-elevation-500)' }}>
                  Featured
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--theme-elevation-500)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr
                  key={model.id}
                  style={{ borderTop: '1px solid var(--theme-elevation-100)' }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {model.authorLogo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={model.authorLogo}
                          alt=""
                          style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'contain' }}
                        />
                      )}
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
                          {model.author}/
                        </span>
                        <span style={{ fontWeight: 500 }}>{model.name}</span>
                        {model.parameterLabel && (
                          <span
                            style={{
                              marginLeft: '8px',
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
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--theme-elevation-500)' }}>
                    {model.taskType || '—'}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: 'var(--theme-elevation-500)' }}>
                    {model.downloads !== undefined && (
                      <span style={{ marginRight: '12px' }}>
                        ↓ {formatNumber(model.downloads)}
                      </span>
                    )}
                    {model.likes !== undefined && (
                      <span>♥ {formatNumber(model.likes)}</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => toggleFeatured(model)}
                      disabled={actionLoading === model.id}
                      style={{
                        padding: '4px 12px',
                        background: model.featured ? 'var(--theme-success-500)' : 'var(--theme-elevation-150)',
                        color: model.featured ? 'white' : 'var(--theme-elevation-500)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: actionLoading === model.id ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        fontWeight: 500,
                        opacity: actionLoading === model.id ? 0.6 : 1,
                        transition: 'all 0.15s',
                      }}
                    >
                      {model.featured ? '★ Featured' : 'Feature'}
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => openEditModal(model)}
                      style={{
                        marginRight: '8px',
                        padding: '4px 12px',
                        background: 'var(--theme-elevation-150)',
                        color: 'var(--theme-text)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => resyncModel(model)}
                      disabled={actionLoading === model.id}
                      title="Re-sync from HuggingFace (keeps your edits)"
                      style={{
                        marginRight: '8px',
                        padding: '4px 12px',
                        background: 'var(--theme-elevation-150)',
                        color: 'var(--theme-text)',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: actionLoading === model.id ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        opacity: actionLoading === model.id ? 0.6 : 1,
                      }}
                    >
                      ↻ Sync
                    </button>
                    <a
                      href={`https://huggingface.co/${model.modelId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginRight: '8px',
                        padding: '4px 12px',
                        background: 'var(--theme-elevation-150)',
                        color: 'var(--theme-text)',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
                    >
                      HF ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => deleteModel(model)}
                      disabled={actionLoading === model.id}
                      style={{
                        padding: '4px 12px',
                        background: 'transparent',
                        color: 'var(--theme-error-500)',
                        border: '1px solid var(--theme-error-500)',
                        borderRadius: '4px',
                        cursor: actionLoading === model.id ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        fontWeight: 500,
                        opacity: actionLoading === model.id ? 0.6 : 1,
                        transition: 'all 0.15s',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '6px 12px',
              background: 'var(--theme-elevation-100)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '4px',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <span style={{ padding: '6px 12px', color: 'var(--theme-elevation-500)' }}>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '6px 12px',
              background: 'var(--theme-elevation-100)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '4px',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editingModel && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1000,
            }}
            onClick={() => setEditingModel(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'var(--theme-elevation-0)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '8px',
              padding: '24px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
              zIndex: 1001,
            }}
          >
            <h3 style={{ margin: '0 0 20px', fontSize: '18px' }}>
              Edit: {editingModel.author}/{editingModel.name}
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>
                Display Name
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
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
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>
                Description
              </label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'var(--theme-elevation-100)',
                  border: '1px solid var(--theme-elevation-150)',
                  borderRadius: '4px',
                  color: 'var(--theme-text)',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 500 }}>
                Logo
              </label>

              {/* Current logo preview */}
              {editForm.authorLogo && (
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={editForm.authorLogo}
                    alt="Current logo"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      background: 'var(--theme-elevation-100)',
                      padding: '4px',
                    }}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <button
                    type="button"
                    onClick={() => setEditForm((f) => ({ ...f, authorLogo: '' }))}
                    style={{
                      padding: '4px 8px',
                      background: 'transparent',
                      color: 'var(--theme-error-500)',
                      border: '1px solid var(--theme-error-500)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Upload button */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp,image/gif"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  style={{
                    padding: '8px 16px',
                    background: 'var(--theme-elevation-150)',
                    color: 'var(--theme-text)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '13px',
                    opacity: uploading ? 0.6 : 1,
                  }}
                >
                  {uploading ? 'Uploading...' : '📤 Upload Logo'}
                </button>

                {editForm.authorLogo && (
                  <button
                    type="button"
                    onClick={applyLogoToProvider}
                    disabled={applyingToProvider}
                    style={{
                      padding: '8px 16px',
                      background: 'var(--theme-success-500)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: applyingToProvider ? 'not-allowed' : 'pointer',
                      fontSize: '13px',
                      opacity: applyingToProvider ? 0.6 : 1,
                    }}
                  >
                    {applyingToProvider ? 'Applying...' : `Apply to all ${editingModel.author} models`}
                  </button>
                )}
              </div>

              {/* Or enter URL manually */}
              <div style={{ marginTop: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px', color: 'var(--theme-elevation-500)' }}>
                  Or enter URL manually:
                </label>
                <input
                  type="text"
                  value={editForm.authorLogo}
                  onChange={(e) => setEditForm((f) => ({ ...f, authorLogo: e.target.value }))}
                  placeholder="https://example.com/logo.svg"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--theme-elevation-100)',
                    border: '1px solid var(--theme-elevation-150)',
                    borderRadius: '4px',
                    color: 'var(--theme-text)',
                    fontSize: '13px',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setEditingModel(null)}
                style={{
                  padding: '10px 20px',
                  background: 'var(--theme-elevation-150)',
                  color: 'var(--theme-text)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEdit}
                disabled={actionLoading === editingModel.id}
                style={{
                  padding: '10px 20px',
                  background: 'var(--theme-success-500)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: actionLoading === editingModel.id ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  opacity: actionLoading === editingModel.id ? 0.6 : 1,
                }}
              >
                {actionLoading === editingModel.id ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
