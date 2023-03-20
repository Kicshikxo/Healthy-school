<template>
    <pdf-wrapper ref="pdf">
        <health-component
            :loading="student.loading || pdf?.loading"
            :editable="false"
            :reloadable="true"
            :on-reload="student.refresh"
            :printable="true"
            :on-print="pdf?.print"
            :downloadble="true"
            :on-download="pdf?.download"
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
            <pdf-page>
                <pdf-template-health-route />
            </pdf-page>
            <pdf-page v-for="conclusion in Object.values(student.conclusions)">
                <health-route-card :conclusion="conclusion" />
            </pdf-page>
        </template>
    </pdf-wrapper>
</template>

<script setup lang="ts">
import { useStudentStore } from '~~/store/student'
import { PdfWrapper } from '#components'

const student = useStudentStore()

const pdf = ref<InstanceType<typeof PdfWrapper>>()
</script>
