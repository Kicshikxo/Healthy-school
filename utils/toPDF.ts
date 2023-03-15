import html2canvas from 'html2canvas'
import pdfMake from 'pdfmake/build/pdfmake'

export const PDFPageSize = {
    width: 595.28,
    height: 841.89
}

export const PDFDefaultScale = 2

export const toPDF = async (options: XOR<{ element: HTMLElement }, { elements: HTMLElement[] }> & { scale?: number }) => {
    const canvases = await Promise.all(
        [options.element ?? options.elements].flat().map(
            async (element) =>
                await html2canvas(element, {
                    useCORS: true,
                    logging: false,
                    allowTaint: true,
                    windowWidth: PDFPageSize.width * (options.scale ?? PDFDefaultScale),
                    windowHeight: PDFPageSize.height * (options.scale ?? PDFDefaultScale)
                })
        )
    )

    const pdf = pdfMake.createPdf({
        pageSize: 'A4',
        pageMargins: 0,
        content: canvases.map((canvas) => ({
            image: canvas.toDataURL(),
            fit: [PDFPageSize.width, PDFPageSize.height]
        }))
    })

    return pdf
}
