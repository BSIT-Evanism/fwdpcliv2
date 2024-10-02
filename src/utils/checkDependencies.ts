import { execSync } from 'child_process'
import { consola } from 'consola'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../constants/languages'

export async function checkDependencies(language: SupportedLanguage) {
    const { packageManager, mainDependency } = SUPPORTED_LANGUAGES[language]

    try {
        execSync(`which ${packageManager}`)
        execSync(`which ${mainDependency}`)
    } catch (error) {
        consola.error(`${packageManager} or ${mainDependency} not found. Please install them to proceed.`)

        return false
    }

    return true
}