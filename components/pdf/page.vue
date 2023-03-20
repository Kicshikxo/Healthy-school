<template>
    <div
        :style="{
            width: `${pdf.pageSize.width * pdf.defaultScale}px`,
            height: `${pdf.pageSize.height * pdf.defaultScale}px`
        }"
        class="pdf-page"
    >
        <div v-scaledown>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const pdf = usePDF()
</script>

<style>
.pdf-page {
    padding: 2cm 1.5cm 2cm 3cm !important;
}
</style>
