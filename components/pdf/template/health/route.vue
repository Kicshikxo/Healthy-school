<template>
    <div>
        <student-info :student="student.data" />
        <div class="mb-4 text-3xl font-bold text-800 text-center">Индивидуальный здоровьесберегающий маршрут</div>
    </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()
</script>
