<template>
    <pdf-wrapper ref="pdf">
        <health-component
            :loading="student.loading || pdf?.loading"
            :editable="false"
            :reloadable="true"
            :on-reload="student.refresh"
            :printable="true"
            :on-print="() => pdf?.print({ title: pdfFileName })"
            :downloadble="true"
            :on-download="() => pdf?.download({ fileName: pdfFileName })"
        >
            <template #title> Индивидуальный здоровьесберегающий маршрут </template>
            <template #body>
                <health-component-body :content-padding-top="false" :class="{ 'opacity-60': student.loading }">
                    <template #content>
                        <div class="flex flex-column gap-2">
                            <health-route-card
                                v-for="conclusion in Object.values(student.conclusions)"
                                :conclusion="conclusion"
                            />
                        </div>
                    </template>
                </health-component-body>
            </template>
        </health-component>

        <template #pages>
            <pdf-template-health-route />
            <health-route-card v-for="conclusion in Object.values(student.conclusions)" :conclusion="conclusion" />
        </template>
    </pdf-wrapper>
</template>

<script setup lang="ts">
import { PdfWrapper } from '#components'
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()

const pdfFileName = computed(
    () =>
        `${student.data?.secondName} ${student.data?.firstName} ${
            student.data?.middleName
        } здоровьесберегающий маршрут на ${new Date().toLocaleString('ru')}.pdf`
)

const pdf = ref<InstanceType<typeof PdfWrapper>>()
</script>
