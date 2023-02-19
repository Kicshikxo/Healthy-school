<template>
    <div>
        <div>Профиль</div>
        <div>
            {{ state.data }}
        </div>
        <div>
            {{ state.status }}
        </div>
    </div>
</template>

<script setup lang="ts">
const { state } = useAuth()

definePageMeta({
    title: 'Профиль'
})
</script>
