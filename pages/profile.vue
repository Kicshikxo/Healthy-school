<template>
    <div>
        <div>Профиль</div>
        <div>
            {{ state.data }}
        </div>
        <div>
            {{ state.status }}
        </div>
        <div>
            <p-button label="Выйти" @click="signOut().then(() => $router.push('/login'))" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { signOut, state } = useSession()

definePageMeta({
    title: 'Профиль'
})
</script>
