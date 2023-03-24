<template>
    <div id="swagger-ui"></div>
</template>

<script setup lang="ts">
import { SwaggerUIBundle } from 'swagger-ui-dist'

definePageMeta({
    layout: false,
    auth: false
})

onMounted(() => {
    SwaggerUIBundle({
        url: '/api/openapi',
        dom_id: '#swagger-ui'
    })
})
</script>

<style src="@/node_modules/swagger-ui-dist/swagger-ui.css"></style>
<style>
.swagger-ui * {
    font-family: Rubik !important;
    outline: none !important;
}
.swagger-ui .topbar {
    display: none;
}
</style>
