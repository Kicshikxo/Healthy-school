export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.directive('stretch-parent', {
        mounted: (element: HTMLElement) => {
            new ResizeObserver(() => {
                const parent = element.parentNode as HTMLElement
                if (!parent) return

                parent.style.width = `${element.offsetWidth}px`
                parent.style.height = `${element.offsetHeight}px`
            }).observe(element)
        }
    })
})
