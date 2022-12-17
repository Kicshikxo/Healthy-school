<template>
    <nav
        class="flex align-items-center gap-3 h-4rem py-3 mx-5 font-medium overflow-x-auto overflow-y-hidden"
    >
        <nuxt-link
            to="/"
            :class="
                $route.path == '/'
                    ? 'text-indigo-50'
                    : 'text-indigo-200 hover:text-indigo-100'
            "
            class="no-underline"
        >
            <i class="pi pi-home w-1rem text-xl"></i>
        </nuxt-link>

        <div
            v-for="route in breadcrumbs"
            :key="route.path"
            class="flex align-items-center gap-3"
        >
            <i class="pi pi-angle-right w-1rem text-indigo-200"></i>
            <nuxt-link
                :to="route.path"
                :class="
                    $route.path == route.path
                        ? 'text-indigo-50'
                        : 'text-indigo-200 hover:text-indigo-100'
                "
                class="no-underline"
            >
                {{ route.name }}
            </nuxt-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
const shortcuts = new Map<string, string>()
shortcuts.set('login', 'Логин')
shortcuts.set('profile', 'Профиль')
shortcuts.set('children', 'Учащиеся')

const route = useRoute()

const breadcrumbs = computed(() =>
    route.path
        .split('/')
        .slice(1)
        .reduce(
            (acc, path, index, paths) =>
                acc.concat({
                    name: shortcuts.get(path) ?? path,
                    path: `/${paths.slice(0, index + 1).join('/')}`
                }),
            [] as { name: string; path: string }[]
        )
)
</script>
