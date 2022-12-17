<template>
    <div>
        <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api/children')
</script>
