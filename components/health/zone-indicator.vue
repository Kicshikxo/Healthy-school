<template>
    <div class="flex align-items-center" :class="`gap-${gap}`">
        <div
            class="border-round"
            :class="{
                'health-zone-indicator': healthZone,
                'bg-green-500': healthZone === 'GREEN',
                'bg-yellow-500': healthZone === 'YELLOW',
                'bg-red-500': healthZone === 'RED'
            }"
        />
        <div>
            {{ label }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { HealthZone } from '@prisma/client'

withDefaults(
    defineProps<{
        healthZone?: HealthZone
        label?: string
        gap?: number
    }>(),
    {
        gap: 2
    }
)
</script>

<style>
.health-zone-indicator {
    min-width: 6px;
    height: 20px;
}
</style>
