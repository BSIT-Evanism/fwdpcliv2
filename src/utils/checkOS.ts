import { execSync } from 'child_process'
import { consola } from 'consola'

export enum SupportedOS {
    Darwin = 'macos',
    Linux = 'linux',
    Windows = 'windows',
}

export function checkOS() {
    try {
        const os = process.platform
        const osVersion = execSync('uname -r').toString().trim()
        consola.info(`Operating System: ${os} (${osVersion})`)

        return os
    } catch (error) {
        consola.error("Failed to check operating system")
        process.exit(1)
    }
}