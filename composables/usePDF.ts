import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake'

export default () => {
    const pageSize = {
        width: 595.28,
        height: 841.89
    }

    const defaultScale = 2

    async function create(
        options: XOR<{ element: HTMLElement }, { elements: HTMLElement[] }> & { title?: string; scale?: number }
    ) {
        const canvases = await Promise.all(
            [options.element ?? options.elements].flat().map(
                async (element) =>
                    await html2canvas(element, {
                        useCORS: true,
                        logging: false,
                        allowTaint: true,
                        windowWidth: pageSize.width * (options.scale ?? defaultScale),
                        windowHeight: pageSize.height * (options.scale ?? defaultScale)
                    })
            )
        )

        const pdf = pdfMake.createPdf({
            info: { title: options.title },
            pageSize: 'A4',
            pageMargins: 0,
            content: canvases.map((canvas) => ({
                image: canvas.toDataURL('image/png'),
                fit: [pageSize.width, pageSize.height]
            }))
        })

        return pdf
    }

    return { create, pageSize, defaultScale }
}
