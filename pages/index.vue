<template>
    <div>
        <pre style="height: 100vh">{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api')
</script>
