<template>
    <div ref="studentPage">
        <student-info :student="student.data" :loading="student.loading">
            <template #actions>
                <role-access role="CLASS_TEACHER">
                    <p-button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-danger"
                        @click="confirmDeleteStudent($event)"
                    />
                    <p-confirm-popup />
                </role-access>
            </template>
        </student-info>
        <role-access role="HEALTH_WORKER">
            <health-medical />
        </role-access>
        <role-access role="PEDAGOGUE">
            <health-pedagogue />
        </role-access>
        <role-access role="PHYSICAL_EDUCATION_TEACHER">
            <health-physical />
        </role-access>
        <role-access role="PSYCHOLOGIST">
            <health-psychological />
        </role-access>
        <role-access role="SOCIAL_PEDAGOGUE">
            <health-social />
        </role-access>
        <role-access role="CLASS_TEACHER">
            <health-class-teacher />
        </role-access>
        <role-access role="OPERATOR">
            <health-route />
        </role-access>
    </div>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useClassStore } from '~~/store/class'
import { useStudentStore } from '~~/store/student'

definePageMeta({
    title: 'Информация по учащемуся',
    breadcrumb: 'student'
})

const toast = useToast()
const confirm = useConfirm()

const route = useRoute()
const router = useRouter()

const studentPage = ref<HTMLElement>()

const student = useStudentStore()
const currentClass = useClassStore()

student.setId(parseUUID(route.params.studentId as string))
currentClass.setId(parseUUID(route.params.classId as string))

async function confirmDeleteStudent(event: MouseEvent) {
    confirm.require({
        target: event.currentTarget as HTMLElement,
        icon: 'pi pi-info-circle',
        message: 'Вы действительно хотите удалить учащегося?',
        acceptClass: 'p-button-danger',
        accept: async () => {
            await deleteStudent()
            toast.add({
                severity: 'success',
                summary: 'Успешно',
                detail: 'Учащийся удалён',
                life: 3000
            })
        }
    })
}

async function deleteStudent() {
    const { error } = await useFetch('/api/students/remove', {
        method: 'DELETE',
        body: { studentId: student.data?.id }
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
</script>
