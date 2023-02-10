import { Class, Student } from '@prisma/client'
import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const student = ref<Student>()
    const currentClass = ref<Class>()

    const titles = computed<{ [key: string]: string | undefined | 'loading' }>(() => {
        return {
            index: 'Список классов',
            class: currentClass.value ? `${currentClass.value?.number}${currentClass.value?.liter}` : undefined,
            student: student.value
                ? `${student.value?.secondName} ${student.value?.firstName} ${student.value?.middleName}`
                : undefined
        }
    })

    function setStudent(value: Student) {
        student.value = value
    }

    function setClass(value: Class) {
        currentClass.value = value
    }

    function parsePath(path: string) {
        return [
            '/',
            ...path
                .split('/')
                .filter((_) => _)
                .reduce((acc, path, index, paths) => acc.concat(`/${paths.slice(0, index + 1).join('/')}`), [] as string[])
        ]
    }

    return { titles, setStudent, setClass, parsePath }
})
