<template>
    <div>
        <slot />
        <div ref="pagesRoot" class="fixed pointer-events-none top-100 left-100">
            <slot name="pages" />
        </div>
    </div>
</template>

<script setup lang="ts">
const pdf = usePDF()

const loading = ref(false)
const pagesRoot = ref<HTMLElement>()

async function print(options?: { title: string }) {
    loading.value = true
    const document = await pdf.create({
        title: options?.title,
        elements: [...pagesRoot.value!.children] as HTMLElement[]
    })

    loading.value = false
    document.print()
}

async function download(options?: { title?: string; fileName?: string }) {
    loading.value = true
    const document = await pdf.create({
        title: options?.title,
        elements: [...pagesRoot.value!.children] as HTMLElement[]
    })

    loading.value = false
    document.download(options?.fileName ?? 'document')
}

defineExpose({
    loading,
    print,
    download
})
</script>
