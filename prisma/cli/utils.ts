import { Role } from '@prisma/client'
import ora from 'ora'

export const roleLocalization: { [key in Role]: string } = {
    OPERATOR: 'Оператор',
    SCHOOL_OPERATOR: 'Оператор школы',
    CLASS_TEACHER: 'Классный руководитель',
    HEALTH_WORKER: 'Медицинский работник',
    PEDAGOGUE: 'Педагог',
    SOCIAL_PEDAGOGUE: 'Социальный педагог',
    PSYCHOLOGIST: 'Психолог',
    PHYSICAL_EDUCATION_TEACHER: 'Учитель физической культуры'
}

export async function proceedWithSpinner<T>(
    fn: () => T | Promise<T>,
    options: {
        text: string
        succeedText?: string
        failText?: string
        color?: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
        logError?: boolean
    }
) {
    const spinner = ora({
        text: options.text,
        color: options.color ?? 'cyan'
    }).start()
    try {
        const result = await fn()
        spinner.succeed(options.succeedText)
        return result
    } catch (e) {
        if (options.logError) {
            console.error(e)
        }
        spinner.fail(options.failText)
    }
}
