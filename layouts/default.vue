<template>
    <div class="flex flex-column min-h-screen surface-ground">
        <div class="h-16rem bg-primary-600">
            <app-header />
            <nuxt-loading-indicator color="var(--primary-700)" class="mt-7 shadow-2" :height="2" :throttle="0" />
            <app-nav />
        </div>

        <main class="flex flex-auto mx-5 mb-5" style="margin-top: -8rem">
            <div
                class="flex-auto relative border-2 surface-border border-round surface-section shadow-2 overflow-x-auto overflow-y-auto"
            >
                <div class="absolute w-full min-h-full">
                    <p-toast position="top-center" />
                    <p-confirm-dialog />
                    <slot />
                </div>
            </div>
        </main>
    </div>
</template>
