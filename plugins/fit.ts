export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.directive('scaledown', {
        mounted: (element: HTMLElement) => {
            const { width: elementWidth, height: elementHeight } = element.getBoundingClientRect()

            const parent = element.parentNode as HTMLElement
            const parentStyle = window.getComputedStyle(element.parentNode as HTMLElement)
            const parentWidth = parent.clientWidth - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight)
            const parentHeight =
                parent.clientHeight - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom)

            element.style.transformOrigin = 'center top'
            element.style.transform = `scale(${Math.min(
                Math.min(parentWidth / elementWidth, parentHeight / elementHeight),
                1
            ).toPrecision(2)})`
        }
    })
})
