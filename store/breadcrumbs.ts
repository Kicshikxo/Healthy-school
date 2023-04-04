import { Class, Student } from '@prisma/client'
import { defineStore } from 'pinia'

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const student = ref<Student | null>()
    const currentClass = ref<Class | null>()

    const titles = computed<{ [key: string]: string | undefined | 'loading' }>(() => {
        return {
            class: currentClass.value ? `${currentClass.value?.number}${currentClass.value?.liter ?? ''}` : 'Список учащихся',
            student: student.value
                ? `${student.value?.secondName} ${student.value?.firstName} ${student.value?.middleName}`
                : 'Информация по учащемуся'
        }
    })

    function setStudent(value: Student | null) {
        student.value = value
    }

    function setClass(value: Class | null) {
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
