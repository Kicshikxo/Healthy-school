<template>
    <p-card class="p-card-content-pb-0 border-1 border-300 shadow-none">
        <template v-if="$slots.title" #title> <slot name="title"></slot> </template>
        <template v-if="$slots.content" #content> <slot name="content"></slot> </template>
        <template v-if="$slots.footer" #footer> <slot name="footer"></slot> </template>
    </p-card>
</template>
