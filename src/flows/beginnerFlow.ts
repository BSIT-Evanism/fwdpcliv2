import { consola } from 'consola'
import { checkDependencies } from '../utils/checkDependencies'
import type { SupportedLanguage } from '../constants/languages'
import { installDependencies } from '../utils/installDependencies'
import { checkOS, SupportedOS } from '../utils/checkOS'
import { execSync } from 'child_process'

export async function handleBeginnerFlow() {
    consola.info("Let's get you started with your web development journey!")

    const preferredProgrammingLanguage = await consola.prompt("What's your preferred programming language?", {
        type: "select",
        options: [
            "JavaScript",
            "TypeScript",
            "Php",
            "Python",
            { label: "Ruby", value: "Ruby", hint: "Not yet supported" },
            { label: "Go", value: "Go", hint: "Not yet supported" },
            { label: "Rust", value: "Rust", hint: "Not yet supported" },
            { label: "C#", value: "C#", hint: "Not yet supported" },
            { label: "C++", value: "C++", hint: "Not yet supported" },
            { label: "C", value: "C", hint: "Not yet supported" },
        ],
    })
    const os = checkOS()

    const dependenciesInstalled = await checkDependencies(preferredProgrammingLanguage as SupportedLanguage)

    if (!dependenciesInstalled) {
        await installDependencies(preferredProgrammingLanguage as SupportedLanguage, os as SupportedOS)
    }

    const scaffoldProject = await consola.prompt("Would you like to scaffold a beginner project?", {
        type: "confirm",
        initial: true,
    })

    if (scaffoldProject) {
        const projectName = await consola.prompt("What's the name of your project?", {
            type: "text",
            placeholder: "Enter your project name...",
        })

        consola.start(`Creating project: ${projectName}`)

        switch (preferredProgrammingLanguage) {
            case "JavaScript":
                scaffoldJavaScriptProject(projectName)
                break
            case "TypeScript":
                scaffoldTypeScriptProject(projectName)
                break
            case "Python":
                scaffoldPythonProject(projectName)
                break
            case "Php":
                scaffoldPhpProject(projectName)
                break
            default:
                consola.warn(`Scaffolding for ${preferredProgrammingLanguage} is not yet implemented.`)
                return
        }

        consola.success(`Project ${projectName} created successfully!`)
    }

    consola.success("You're all set! Happy coding!")
}

function scaffoldJavaScriptProject(projectName: string) {
    consola.start(`Scaffolding JavaScript project: ${projectName}`)
    execSync(`npm create vite "${projectName}" -- --template vanilla`)
    consola.success(`JavaScript project ${projectName} scaffolded successfully!`)
}

function scaffoldTypeScriptProject(projectName: string) {
    consola.start(`Scaffolding TypeScript project: ${projectName}`)
    execSync(`npm create vite "${projectName}" -- --template vanilla-ts`)
    consola.success(`TypeScript project ${projectName} scaffolded successfully!`)
}

function scaffoldPythonProject(projectName: string) {
    consola.start(`Scaffolding Python project: ${projectName}`)
    execSync(`mkdir "${projectName}" && cd "${projectName}" && python -m venv venv && source venv/bin/activate && pip install flask`)
    consola.success(`Python project ${projectName} scaffolded successfully!`)
}

function scaffoldPhpProject(projectName: string) {
    consola.start(`Scaffolding PHP project: ${projectName}`)
    execSync(`composer create-project --prefer-dist laravel/laravel "${projectName}"`)
    consola.success(`PHP project ${projectName} scaffolded successfully!`)
}
