export const SUPPORTED_LANGUAGES = {
    JavaScript: { packageManager: 'npm', mainDependency: 'node' },
    TypeScript: { packageManager: 'npm', mainDependency: 'typescript' },
    Php: { packageManager: 'composer', mainDependency: 'php' },
    Python: { packageManager: 'pip', mainDependency: 'python' },
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES