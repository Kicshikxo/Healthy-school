<template>
    <nav class="flex align-items-center gap-3 h-4rem py-3 mx-5 font-medium overflow-x-auto overflow-y-hidden">
        <nuxt-link
            to="/"
            :class="$route.path == '/' ? 'text-primary-50' : 'text-primary-200 hover:text-primary-100'"
            class="no-underline"
        >
            <i class="pi pi-home w-1rem text-xl"></i>
        </nuxt-link>

        <div v-for="path in breadcrumbs" :key="path" class="flex align-items-center gap-3">
            <i class="pi pi-angle-right w-1rem text-primary-200"></i>
            <nuxt-link
                :to="path"
                :class="$route.path == path ? 'text-primary-50' : 'text-primary-200 hover:text-primary-100'"
                class="no-underline"
            >
                {{ $router.resolve({ path }).meta.title ?? $route.path }}
            </nuxt-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() =>
    route.path
        .split('/')
        .slice(1)
        .reduce((acc, path, index, paths) => acc.concat(`/${paths.slice(0, index + 1).join('/')}`), [] as string[])
)
</script>
