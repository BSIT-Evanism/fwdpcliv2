import { consola } from 'consola'
import { checkOS } from './utils/checkOS'
import { handleBeginnerFlow } from './flows/beginnerFlow'
import { execSync } from 'child_process'

async function main() {
    consola.box("Kamusta, Ka-FWDPeeps!")
    consola.info("I'm here to help you start your project with a bang!")

    checkOS()

    const isBeginner = await consola.prompt("Are you a beginner?", {
        type: "confirm",
        initial: false,
    })

    if (isBeginner) {
        await handleBeginnerFlow()
    } else {
        consola.info("Welcome back, Kaibigan!, Let's get started")
        consola.ready("What would you like to create today?")

        const projectType = await consola.prompt("What would you like to create?", {
            type: "select",
            options: ["Vue Project", "React Project", "Svelte Project", { label: "Other", value: "Other", hint: "Other language or framework?" }],
        })

        if (projectType === "Other") {
            const projectLanguage = await consola.prompt("What's your preferred programming language?", {
                type: "select",
                options: ["Php", "Python"],
            })

            const projectName = await consola.prompt("What's your project name?", {
                type: "text",
            })



        } else {
            await createJSProject(projectType as string)

            consola.success(`Done! Happy coding!`)
            process.exit(0)
        }
    }
}

async function createJSProject(projectType: string) {

    const projectName = await consola.prompt("What's your project name?", {
        type: "text",
    })

    const projectLanguage = await consola.prompt("Would you like to use TypeScript?", {
        type: "confirm",
        initial: false,
    })

    consola.start(`Creating ${projectType} project`)
    switch (projectType) {
        case "Vue Project":
            execSync(`npm create vite@latest "${projectName}" -- --template vue${projectLanguage ? "-ts" : ""}`)
            consola.warn(`Installing dependencies: don't cancel this operation`)
            execSync(`cd "${projectName}" && npm install`)
            break
        case "React Project":
            execSync(`npm create vite@latest "${projectName}" -- --template react${projectLanguage ? "-ts" : ""}`)
            consola.warn(`Installing dependencies: don't cancel this operation`)
            execSync(`cd "${projectName}" && npm install`)
            break
        case "Svelte Project":
            execSync(`npm create vite@latest "${projectName}" -- --template svelte${projectLanguage ? "-ts" : ""}`)
            consola.warn(`Installing dependencies: don't cancel this operation`)
            execSync(`cd "${projectName}" && npm install`)
            break
    }

    consola.success(`Successfully created ${projectType} project`)
    consola.info(`To start your project, run: cd "${projectName}" && npm run dev`)

}

main().catch((error) => {
    consola.error("An error occurred:", error)
    process.exit(1)
})