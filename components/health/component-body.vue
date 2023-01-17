<template>
    <p-card
        class="health-component-body border-1 border-300 shadow-none"
        :class="{
            'p-card-content-pb-0': !paddingBottom,
            'p-card-content-pt-0': !paddingTop
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
        paddingBottom?: boolean
        paddingTop?: boolean
    }>(),
    {
        paddingBottom: false,
        paddingTop: true
    }
)
</script>
