<template>
    <div ref="studentPage">
        <section class="p-5">
            <div class="flex justify-content-between gap-8">
                <div class="flex flex-auto gap-5">
                    <nuxt-img src="images/avatars/persona 0-0.png" alt="student avatar" width="96" height="96" />
                    <div class="flex flex-auto flex-column justify-content-between">
                        <div class="flex align-items-center text-900 text-3xl h-2rem">
                            <p-skeleton v-if="loadingData" class="max-w-30rem" />
                            <div v-else class="text-800 font-bold">
                                {{ studentData?.secondName }}
                                {{ studentData?.firstName }}
                                {{ studentData?.middleName }}
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-5">
                            <div class="flex flex-column">
                                <div class="text-500">Дата рождения</div>
                                <div class="flex align-items-end h-1rem mt-2 text-700">
                                    <p-skeleton v-if="loadingData" class="max-w-30rem" />
                                    <div v-else>{{ new Date(studentData?.birthdate!).toLocaleDateString() }}</div>
                                </div>
                            </div>
                            <div class="flex flex-column">
                                <div class="text-500">Класс</div>
                                <div class="flex align-items-end h-1rem mt-2 text-700">
                                    <p-skeleton v-if="loadingData" class="max-w-30rem" />
                                    <div v-else>{{ studentData?.class.number! + studentData?.class.liter! }}</div>
                                </div>
                            </div>
                            <div class="flex flex-column w-8rem">
                                <div class="text-500">СНИЛС</div>
                                <div class="flex align-items-end h-1rem mt-2 text-700">
                                    <p-skeleton v-if="loadingData" class="max-w-30rem" />
                                    <div v-else>{{ studentData?.snils }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <p-button icon="pi pi-print" class="p-button-rounded p-button-secondary" @click="printStudent" />
                    <p-button icon="pi pi-file-pdf" class="p-button-rounded p-button-secondary" @click="saveToPDF" />
                    <role-access role="CLASS_TEACHER">
                        <p-button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteStudent" />
                    </role-access>
                </div>
            </div>
        </section>
        <role-access role="PHYSICAL_EDUCATION_TEACHER">
            <health-physical :student-data="studentData" :loading-data="loadingData" :refresh-data="refreshData" />
        </role-access>
        <role-access role="HEALTH_WORKER">
            <health-medical :student-data="studentData" :loading-data="loadingData" :refresh-data="refreshData" />
        </role-access>
        <role-access role="SOCIAL_PEDAGOGUE">
            <health-social :student-data="studentData" :loading-data="loadingData" :refresh-data="refreshData" />
        </role-access>
        <role-access role="CLASS_TEACHER">
            <health-route :student-data="studentData" :loading-data="loadingData" :refresh-data="refreshData" />
        </role-access>
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

definePageMeta({
    title: `Информация по учащемуся`
})

const toast = useToast()
const route = useRoute()
const router = useRouter()

const studentPage = ref<HTMLElement>()

async function deleteStudent() {
    const { error } = await useFetch('/api/students/remove', {
        method: 'DELETE',
        body: { studentId: studentData.value?.id }
    })
    if (error.value) {
        return toast.add({
            severity: 'error',
            summary: 'Ошибка удаления',
            detail: 'Данные не были удалены',
            life: 3000
        })
    }

    router.back()
}

async function getPDF() {
    const pdf = new jsPDF()
    const canvas = await html2canvas(studentPage.value!, { windowWidth: 1000 })

    const fullHeight = canvas.height
    const pageHeight = canvas.width * (pdf.internal.pageSize.height / pdf.internal.pageSize.width)
    const pages = Math.ceil(fullHeight / pageHeight)

    const pageCanvas = document.createElement('canvas')
    const pageContext = pageCanvas.getContext('2d')!

    pageCanvas.width = canvas.width
    pageCanvas.height = pageHeight

    let pdfWidth = pdf.internal.pageSize.width
    let pdfHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width

    for (let page = 0; page < pages; page++) {
        if (page === pages - 1 && fullHeight % pageHeight !== 0) {
            pageCanvas.height = fullHeight % pageHeight
            pdfHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width
        }

        if (page) pdf.addPage()

        const width = pageCanvas.width
        const height = pageCanvas.height
        pageContext.clearRect(0, 0, width, height)
        pageContext.drawImage(canvas, 0, page * pageHeight, width, height, 0, 0, width, height)

        pdf.addImage(pageCanvas, 0, 0, pdfWidth, pdfHeight)
    }
    return pdf
}

async function printStudent() {
    const pdf = await getPDF()

    pdf.autoPrint()
    pdf.output('dataurlnewwindow')
}

async function saveToPDF() {
    const pdf = await getPDF()

    pdf.save(`${studentData.value?.secondName} ${studentData.value?.firstName} ${studentData.value?.middleName}.pdf`)
}

const {
    data: studentData,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/students/info', {
    headers: useRequestHeaders() as HeadersInit,
    query: {
        studentId: route.params.studentId,
        classId: route.params.classId
    }
})
</script>
