<template>
    <div>
        <div>Профиль</div>
        <div>
            {{ data }}
        </div>
        <div>
            <p-button label="Выйти" @click="signOut" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { getSession, signOut } = useSession()
const { data } = await getSession()

definePageMeta({
    title: 'Профиль'
})
</script>
