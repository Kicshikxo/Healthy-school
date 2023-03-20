<template>
    <div>
        <student-info :student="student.data" />
    </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()
</script>
