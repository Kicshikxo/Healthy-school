<template>
    <section class="px-3">
        <p-card class="shadow-none">
            <template #title>
                <div class="flex align-items-center justify-content-between">
                    <div>
                        <slot v-if="$slots.title" name="title"></slot>
                    </div>
                    <div class="flex gap-2 align-self-end">
                        <p-button
                            v-if="!enableEditing"
                            :loading="isLoading"
                            icon="pi pi-pencil"
                            label="Редактировать"
                            :disabled="enableEditing"
                            class="p-button-primary"
                            @click="startEditing"
                        />
                        <p-button
                            v-if="enableEditing"
                            icon="pi pi-times"
                            label="Отменить"
                            :disabled="!enableEditing || isLoading"
                            class="p-button-danger"
                            @click="cancelChanges"
                        />
                        <p-button
                            v-if="enableEditing"
                            :loading="isLoading"
                            icon="pi pi-save"
                            label="Сохранить"
                            :disabled="!enableEditing || !hasChanges"
                            class="p-button-success"
                            @click="saveChanges"
                        />
                    </div>
                </div>
            </template>
            <template v-if="$slots.body" #content>
                <slot :enable-editing="enableEditing" name="body"></slot>
            </template>
        </p-card>
    </section>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
    loading?: boolean
    hasChanges?: boolean
    onCancel?: () => Promise<void> | void
    onSave?: () => Promise<void> | void
}>()

const emit = defineEmits<{
    (event: 'start-editing'): void
    (event: 'end-editing'): void
    (event: 'cancel-changes'): void
    (event: 'save-changes'): void
}>()

const toast = useToast()

const enableEditing = ref<boolean>(false)

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
</script>
