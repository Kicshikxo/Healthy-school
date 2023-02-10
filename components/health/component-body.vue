<template>
    <p-card
        class="health-component-body border-1 surface-border shadow-none"
        :class="{
            'p-card-content-pb-0': !contentPaddingBottom,
            'p-card-content-pt-0': !contentPaddingTop,
            'p-card-title-mb-0': !titleMarginBottom
        }"
    >
        <template v-if="$slots.title" #title> <slot name="title"></slot> </template>
        <template v-if="$slots.content" #content> <slot name="content"></slot> </template>
        <template v-if="$slots.footer" #footer> <slot name="footer"></slot> </template>
    </p-card>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        contentPaddingBottom?: boolean
        contentPaddingTop?: boolean
        titleMarginBottom?: boolean
    }>(),
    {
        contentPaddingBottom: false,
        contentPaddingTop: true,
        titleMarginBottom: true
    }
)
</script>
