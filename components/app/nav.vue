<template>
    <nav class="flex align-items-center gap-3 h-4rem py-3 mx-5 font-medium overflow-x-auto overflow-y-hidden">
        <nuxt-link
            to="/"
            :class="$route.path == '/' ? 'text-primary-50' : 'text-primary-200 hover:text-primary-100'"
            class="no-underline"
        >
            <i class="pi pi-users text-xl"></i>
        </nuxt-link>

        <div v-for="path in breadcrumbs" :key="path" class="flex align-items-center gap-3">
            <i class="pi pi-angle-right text-primary-200"></i>
            <nuxt-link
                :to="$router.resolve({ path }).meta.to ?? path"
                :class="$route.path == path ? 'text-primary-50' : 'text-primary-200 hover:text-primary-100'"
                class="no-underline"
            >
                {{
                    breadcrumbsStore.titles[$router.resolve({ path }).meta.breadcrumb as string] ??
                    $router.resolve({ path }).meta.title ??
                    $route.path
                }}
            </nuxt-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'

const route = useRoute()
const breadcrumbsStore = useBreadcrumbsStore()

const breadcrumbs = computed(() => breadcrumbsStore.parsePath(route.path))
</script>
