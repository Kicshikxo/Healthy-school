<template>
    <div ref="studentPage">
        <student-info :student="student.data" :loading="student.loading" />
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
    </div>
</template>

<script setup lang="ts">
import { useClassStore } from '~~/store/class'
import { useStudentStore } from '~~/store/student'

definePageMeta({
    title: 'Информация по учащемуся',
    breadcrumb: 'student'
})

const route = useRoute()

const studentPage = ref<HTMLElement>()

const student = useStudentStore()
const currentClass = useClassStore()

student.setId(parseUUID(route.params.studentId as string))
currentClass.setId(parseUUID(route.params.classId as string))
</script>
