import { execSync } from 'child_process'
import type { SupportedLanguage } from '../constants/languages'
import consola from 'consola'
import { SupportedOS } from './checkOS'

const installCommands = {
    [SupportedOS.Darwin]: {
        JavaScript: 'brew install node',
        TypeScript: 'brew install node',
        Php: 'brew install php',
        Python: 'brew install python && curl -LsSf https://astral.sh/uv/install.sh | sh',
    },
    [SupportedOS.Linux]: {
        JavaScript: 'sudo apt-get install -y nodejs',
        TypeScript: 'sudo apt-get install -y nodejs',
        Php: 'sudo apt-get install -y php',
        Python: 'sudo apt-get install -y python3 python3-pip && curl -LsSf https://astral.sh/uv/install.sh | sh',
    },
    [SupportedOS.Windows]: {
        JavaScript: 'choco install nodejs',
        TypeScript: 'choco install nodejs',
        Php: 'choco install php',
        Python: 'choco install python && powershell -c "irm https://astral.sh/uv/install.ps1 | iex"',
    },
}

const languageInfo = {
    JavaScript: 'Node.js and npm',
    TypeScript: 'Node.js and npm',
    Php: 'Php and composer',
    Python: 'Python and pip',
}

export async function installDependencies(language: SupportedLanguage, os: SupportedOS) {
    const info = languageInfo[language]
    consola.info(`This would install ${info}`)

    const shouldInstall = await consola.prompt('Do you want to continue?', {
        type: 'confirm',
        initial: true,
    })

    if (shouldInstall) {
        consola.start(`Installing ${info} for ${os}`)
        execSync(installCommands[os][language])
        consola.success(`Successfully installed ${info}`)

        if (language !== 'Python') {
            consola.warn('Please restart your terminal or run the following command to use the installed version:')
            consola.info('source ~/.bashrc or source ~/.zshrc or source ~/.fishrc')
        }
    }
}