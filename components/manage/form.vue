<template>
    <p-card class="m-3 border-1 surface-border shadow-none">
        <template #title> <slot name="title" /> </template>
        <template #content>
            <form @submit="" class="p-fluid">
                <slot name="form" :loading="isLoading" />
            </form>
        </template>
        <template #footer>
            <div class="flex justify-content-end gap-2">
                <p-button
                    :label="cancelLabel"
                    icon="pi pi-times"
                    class="p-button-text p-button-danger"
                    @click="cancel"
                    :disabled="disableCancel || isLoading"
                />
                <p-button
                    :label="submitLabel"
                    icon="pi pi-check"
                    class="p-button-text p-button-primary"
                    @click="submit"
                    :disabled="disableSubmit"
                    :loading="isLoading"
                />
            </div>
        </template>
    </p-card>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const props = withDefaults(
    defineProps<{
        loading?: boolean
        cancelLabel?: string
        submitLabel?: string
        onCancel?: () => Promise<any> | any
        onSubmit?: () => Promise<string> | string
        disableCancel?: boolean
        disableSubmit?: boolean
        successSubmitSummary?: string
        errorSubmitSummary?: string
    }>(),
    {
        cancelLabel: 'Очистить',
        submitLabel: 'Сохранить',
        disableCancel: false,
        disableSubmit: false
    }
)

const toast = useToast()

const innerLoading = ref(false)

const isLoading = computed(() => props.loading || innerLoading.value)

async function cancel() {
    innerLoading.value = true
    try {
        if (props.onCancel) {
            await props.onCancel()
        }
    } catch (e) {}
    innerLoading.value = false
}

async function submit() {
    innerLoading.value = true
    try {
        let detail = ''
        if (props.onSubmit) {
            detail = await props.onSubmit()
        }
        toast.add({
            severity: 'success',
            summary: props.successSubmitSummary,
            detail: detail,
            life: 3000
        })
    } catch (e) {
        toast.add({
            severity: 'error',
            summary: props.errorSubmitSummary,
            detail: (e as Error).message,
            life: 3000
        })
    }
    innerLoading.value = false
}
</script>
