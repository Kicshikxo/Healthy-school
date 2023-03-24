<template>
    <div>
        <slot />
        <div class="fixed pointer-events-none top-100 left-100">
            <div ref="pagesRoot">
                <slot name="pages" />
            </div>
            <div ref="pagesOutput">
                <pdf-page v-for="page in pagesList">
                    <div v-for="element in page" v-html="element.outerHTML" />
                </pdf-page>
            </div>
            <pdf-page ref="pdfEmptyPage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PdfPage } from '#components'

const pdf = usePDF()

const loading = ref(false)
const pagesRoot = ref<HTMLElement>()
const pagesOutput = ref<HTMLElement>()

const pagesList = ref<HTMLElement[][]>()
const pagesObserver = ref<MutationObserver>()
const pdfEmptyPage = ref<InstanceType<typeof PdfPage>>()

function paginate() {
    const pageElement = pdfEmptyPage.value!.$el

    const pageStyle = window.getComputedStyle(pageElement)
    const pageWidth = pageElement.clientWidth - parseFloat(pageStyle.paddingLeft) - parseFloat(pageStyle.paddingRight)
    const pageHeight = pageElement.clientHeight - parseFloat(pageStyle.paddingTop) - parseFloat(pageStyle.paddingBottom)

    pagesList.value = [[]]
    for (const element of pagesRoot.value!.children) {
        const { width, height } = element.getBoundingClientRect()

        const currentPageHeight =
            pagesList.value.at(-1)?.reduce((acc, element) => acc + element.getBoundingClientRect().height, 0) ?? 0

        if (height > pageHeight - currentPageHeight) {
            pagesList.value.push([])
        }

        pagesList.value.at(-1)?.push(element as HTMLElement)
    }
}

onMounted(() => {
    pagesObserver.value = new MutationObserver(paginate)

    pagesObserver.value.observe(pagesRoot.value as Node, {
        characterData: true,
        attributes: true,
        childList: true,
        subtree: true
    })

    paginate()
})
onUnmounted(() => pagesObserver.value?.disconnect())

async function print(options?: { title: string }) {
    loading.value = true
    const document = await pdf.create({
        title: options?.title,
        elements: [...pagesOutput.value!.children] as HTMLElement[]
    })

    loading.value = false
    document.print()
}

async function download(options?: { title?: string; fileName?: string }) {
    loading.value = true
    const document = await pdf.create({
        title: options?.title,
        elements: [...pagesOutput.value!.children] as HTMLElement[]
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
