import shortUUID from 'short-uuid'
import { Class } from '@prisma/client'
import { defineStore } from 'pinia'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'

export const useClassStore = defineStore('class', () => {
    const translator = shortUUID()
    const route = useRoute()

    const id = ref<string | undefined>(route.params.classId ? translator.toUUID(route.params.classId as string) : undefined)
    function setId(value: string) {
        id.value = value
    }

    const {
        data,
        pending: loading,
        refresh
    } = useFetch('/api/classes/info', {
        headers: useRequestHeaders() as HeadersInit,
        query: { classId: id }
    })

    const breadcrumbs = useBreadcrumbsStore()
    watchEffect(() => breadcrumbs.setClass(data.value as Class))

    return { id, setId, data, loading, refresh }
})
