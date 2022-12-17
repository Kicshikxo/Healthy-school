<template>
    <div class="flex flex-column min-h-screen surface-ground">
        <div class="h-16rem bg-indigo-500">
            <app-header />
            <app-nav />
        </div>

        <main class="flex flex-auto mx-5 mb-5" style="margin-top: -8rem">
            <div
                class="flex-auto relative border-2 surface-border border-round surface-section shadow-2 overflow-x-hidden overflow-y-auto"
            >
                <div class="absolute w-full min-h-full">
                    <slot />
                </div>
            </div>
        </main>
    </div>
</template>
