'use client'

import { useEffect, useState } from 'react'
import { Star, GitFork, Eye, ExternalLink } from 'lucide-react'
import { CornerCard } from '@/app/_components/corner-card'

export type GitHubEmbedBlockProps = {
  embedType: 'repo' | 'gist' | 'file'
  url: string
  showStats?: boolean
  showDescription?: boolean
  blockType: 'githubEmbed'
}

type Props = GitHubEmbedBlockProps & {
  className?: string
}

interface RepoData {
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
  topics: string[]
}

function parseGitHubUrl(url: string): { owner: string; repo: string; type: 'repo' | 'gist' | 'file'; path?: string } | null {
  try {
    const urlObj = new URL(url)
    if (!urlObj.hostname.includes('github.com') && !urlObj.hostname.includes('gist.github.com')) {
      return null
    }

    const parts = urlObj.pathname.split('/').filter(Boolean)

    if (urlObj.hostname.includes('gist.github.com')) {
      return { owner: parts[0], repo: parts[1] || '', type: 'gist' }
    }

    if (parts.length >= 2) {
      const hasBlob = parts.includes('blob')
      return {
        owner: parts[0],
        repo: parts[1],
        type: hasBlob ? 'file' : 'repo',
        path: hasBlob ? parts.slice(3).join('/') : undefined,
      }
    }

    return null
  } catch {
    return null
  }
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  Jupyter: '#DA5B0B',
  CUDA: '#3A4E3A',
}

export function GitHubEmbedBlock({
  className,
  url,
  embedType,
  showStats = true,
  showDescription = true,
}: Props) {
  const [repoData, setRepoData] = useState<RepoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const parsed = parseGitHubUrl(url)

  useEffect(() => {
    if (!parsed || embedType !== 'repo') {
      setLoading(false)
      return
    }

    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch repository')
        }
        const data = await response.json() as RepoData
        setRepoData(data)
      } catch {
        setError('Failed to load repository')
      } finally {
        setLoading(false)
      }
    }

    fetchRepoData()
  }, [parsed?.owner, parsed?.repo, embedType])

  if (!parsed) {
    return (
      <div className={className}>
        <CornerCard className="text-center py-12 px-12">
          <p className="text-white/50">Invalid GitHub URL</p>
        </CornerCard>
      </div>
    )
  }

  // Gist embed
  if (embedType === 'gist') {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <CornerCard className="!p-0 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="size-5 text-white/70" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span className="font-mono text-sm text-white/70">{parsed.owner}</span>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
          <iframe
            src={`${url}.pibb`}
            className="w-full min-h-64 bg-[#0d1117]"
            sandbox="allow-scripts allow-same-origin"
          />
        </CornerCard>
      </div>
    )
  }

  // File embed - show code preview
  if (embedType === 'file' && parsed.path) {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <CornerCard className="!p-0 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <svg className="size-5 text-white/70 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span className="font-mono text-sm text-white/70 truncate">
                {parsed.owner}/{parsed.repo}
              </span>
              <span className="text-white/30 shrink-0">/</span>
              <span className="font-mono text-sm text-white truncate">{parsed.path}</span>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
          <iframe
            src={`https://emgithub.com/iframe.html?target=${encodeURIComponent(url)}&style=github-dark&type=code&showBorder=off&showLineNumbers=on&showFileMeta=off&showFullPath=off&showCopy=on`}
            className="w-full min-h-64"
            sandbox="allow-scripts allow-same-origin"
          />
        </CornerCard>
      </div>
    )
  }

  // Repository card - loading
  if (loading) {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <CornerCard className="animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 bg-white/10 rounded-full" />
            <div className="h-5 w-48 bg-white/10 rounded" />
          </div>
          <div className="h-4 w-full bg-white/10 rounded mb-4" />
          <div className="flex gap-4">
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/10 rounded" />
          </div>
        </CornerCard>
      </div>
    )
  }

  // Repository card - error/fallback
  if (error || !repoData) {
    return (
      <div className={['not-prose', className].filter(Boolean).join(' ')}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <CornerCard className="relative">
            {/* GitHub logo - top right */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logos/github-logo.svg"
              alt="GitHub"
              className="absolute top-6 right-6 md:top-8 md:right-8 size-6 opacity-50 invert"
            />
            <div className="flex items-center gap-3 pr-8">
              <svg className="size-8 text-white/70" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span className="font-mono text-white group-hover:text-accent transition-colors">
                {parsed.owner}/{parsed.repo}
              </span>
              <ExternalLink className="size-4 text-white/50 ml-auto" />
            </div>
          </CornerCard>
        </a>
      </div>
    )
  }

  const langColor = repoData.language ? languageColors[repoData.language] || '#858585' : null

  // Repository card - success
  return (
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      <a
        href={repoData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <CornerCard className="relative">
          {/* GitHub logo - top right */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/github-logo.svg"
            alt="GitHub"
            className="absolute top-6 right-6 md:top-8 md:right-8 size-6 opacity-50 invert"
          />
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={repoData.owner.avatar_url}
              alt={repoData.owner.login}
              className="size-10 sm:size-12 rounded-full"
            />
            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg text-white group-hover:text-accent transition-colors truncate">
                  {repoData.full_name}
                </h3>
                <ExternalLink className="size-4 text-white/30 group-hover:text-accent/50 shrink-0" />
              </div>

              {showDescription && repoData.description && (
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {repoData.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                {langColor && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: langColor }}
                    />
                    {repoData.language}
                  </span>
                )}

                {showStats && (
                  <>
                    <span className="flex items-center gap-1">
                      <Star className="size-4" />
                      {formatNumber(repoData.stargazers_count)}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="size-4" />
                      {formatNumber(repoData.forks_count)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="size-4" />
                      {formatNumber(repoData.watchers_count)}
                    </span>
                  </>
                )}
              </div>

              {repoData.topics && repoData.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {repoData.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-white/5 text-white/60 text-sm rounded-md"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CornerCard>
      </a>
    </div>
  )
}
