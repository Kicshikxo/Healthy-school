<template>
    <section class="px-3">
        <p-card class="health-component shadow-none">
            <template #title>
                <div class="flex align-items-center justify-content-between">
                    <div>
                        <slot v-if="$slots.title" name="title"></slot>
                    </div>
                    <div class="flex gap-2 align-self-end">
                        <p-button
                            v-if="printable"
                            :disabled="isLoading"
                            icon="pi pi-print"
                            label="Печать"
                            class="p-button-primary"
                            @click="onPrint"
                        />
                        <p-button
                            v-if="downloadble"
                            :disabled="isLoading"
                            icon="pi pi-file-pdf"
                            label="Скачать"
                            class="p-button-primary"
                            @click="onDownload"
                        />
                        <p-button
                            v-if="reloadable"
                            :loading="isLoading"
                            icon="pi pi-refresh"
                            label="Обновить"
                            class="p-button-primary"
                            @click="reload"
                        />
                        <p-button
                            v-if="!enableEditing && editable"
                            :loading="isLoading"
                            icon="pi pi-pencil"
                            label="Редактировать"
                            :disabled="enableEditing"
                            class="p-button-primary"
                            @click="startEditing"
                        />
                        <p-button
                            v-if="enableEditing && editable"
                            icon="pi pi-times"
                            label="Отменить"
                            :disabled="!enableEditing || isLoading"
                            class="p-button-danger"
                            @click="cancelChanges"
                        />
                        <p-button
                            v-if="enableEditing && editable"
                            :loading="isLoading"
                            icon="pi pi-save"
                            label="Сохранить"
                            :disabled="!enableEditing || !allowSave"
                            class="p-button-success"
                            @click="saveChanges"
                        />
                    </div>
                </div>
            </template>
            <template v-if="$slots.body" #content>
                <slot :enable-editing="enableEditing" :loading="isLoading" name="body"></slot>
            </template>
        </p-card>
    </section>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const props = withDefaults(
    defineProps<{
        loading?: boolean
        editable?: boolean
        reloadable?: boolean
        printable?: boolean
        downloadble?: boolean
        allowSave?: boolean
        onCancel?: () => Promise<void> | void
        onSave?: () => Promise<void> | void
        onReload?: () => Promise<void> | void
        onPrint?: () => Promise<void> | void
        onDownload?: () => Promise<void> | void
    }>(),
    {
        editable: true,
        reloadable: false,
        printable: false,
        downloadble: false
    }
)

const emit = defineEmits<{
    (event: 'start-editing'): void
    (event: 'end-editing'): void
    (event: 'cancel-changes'): void
    (event: 'save-changes'): void
}>()

const toast = useToast()

const enableEditing = ref(false)
const innerLoading = ref(false)

const isLoading = computed(() => props.loading || innerLoading.value)

async function startEditing() {
    enableEditing.value = true
    emit('start-editing')
}

async function cancelChanges() {
    innerLoading.value = true
    try {
        enableEditing.value = false
        emit('end-editing')

        if (props.onCancel) await props.onCancel()
        emit('cancel-changes')
    } catch (e) {}
    innerLoading.value = false
}

async function saveChanges() {
    innerLoading.value = true
    try {
        if (props.onSave) await props.onSave()
        emit('save-changes')

        enableEditing.value = false
        emit('end-editing')

        toast.add({
            severity: 'success',
            summary: 'Данные сохранены',
            detail: 'Изменения были сохранены',
            life: 3000
        })
    } catch (e) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка сохранения',
            detail: 'Изменения не были сохранены',
            life: 3000
        })
    }
    innerLoading.value = false
}

async function reload() {
    innerLoading.value = true
    if (props.onReload) await props.onReload()
    innerLoading.value = false
}
</script>
