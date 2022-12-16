<template>
    <div class="flex justify-content-center align-content-center flex-wrap h-screen w-screen">
        <h1>{{ data }}</h1>
    </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api')
</script>
