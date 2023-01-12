<template>
    <slot v-if="data?.role === props.role || props.roles?.includes(data?.role!)" />
</template>

<script setup lang="ts">
import { Role } from '@prisma/client'

const props = defineProps<{ role?: Role; roles?: Role[] }>()

const { data } = useSessionState()
</script>
