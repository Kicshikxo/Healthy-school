<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="students"
            :rowHover="!!students?.length"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
            @row-click="$router.push(`/${$route.params.classId}/${shortUUID($event.data.id)}`)"
            class="p-datatable-lg"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Список учащихся
                    <div class="flex gap-2">
                        <role-access role="CLASS_TEACHER">
                            <p-button
                                label="Добавить"
                                icon="pi pi-plus w-1rem"
                                class="p-button-success"
                                @click="showDialog = true"
                            />
                        </role-access>
                        <p-button
                            label="Обновить"
                            icon="pi pi-refresh w-1rem"
                            :loading="loadingStudents"
                            @click="refreshStudents"
                        />
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex justify-content-center w-full">
                    <p-progress-bar v-if="loadingStudents" mode="indeterminate" class="w-full h-1rem" />
                    <div v-else>Учащихся нет...</div>
                </div>
            </template>
            <p-column field="secondName" header="Фамилия"></p-column>
            <p-column field="firstName" header="Имя"></p-column>
            <p-column field="middleName" header="Отчество"></p-column>
            <p-column field="gender" header="Пол">
                <template #body="{ data }">
                    {{ localizeGender(data.gender as Gender) }}
                </template>
            </p-column>
            <p-column field="birthdate" header="Дата рождения">
                <template #body="{ data }">
                    {{ new Date(data.birthdate).toLocaleDateString() }}
                </template>
            </p-column>
        </p-data-table>

        <p-dialog :modal="true" v-model:visible="showDialog" header="Добавить учащегося" class="p-fluid">
            <div class="field">
                <label for="snils">СНИЛС</label>
                <p-input-mask id="snils" v-model="newStudent.snils" mask="999-999-999 99" required="true" autofocus />
            </div>
            <div class="field">
                <label for="secondName">Фамилия</label>
                <p-input-text id="secondName" v-model="newStudent.secondName" required="true" autofocus />
            </div>
            <div class="field">
                <label for="firstName">Имя</label>
                <p-input-text id="firstName" v-model="newStudent.firstName" required="true" />
            </div>
            <div class="field">
                <label for="middleName">Отчество</label>
                <p-input-text id="middleName" v-model="newStudent.middleName" required="true" />
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="birthdate">Дата рождения</label>
                    <p-calendar inputId="birthdate" v-model="newStudent.birthdate" />
                </div>
                <div class="field col w-15rem">
                    <label>Пол</label>
                    <p-dropdown
                        v-model="newStudent.gender"
                        :options="[
                            { label: 'Мужской', value: 'MALE' },
                            { label: 'Женский', value: 'FEMALE' }
                        ]"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Пол"
                        panelClass="border-1 surface-border"
                    />
                </div>
            </div>
            <template #footer>
                <p-button label="Отмена" icon="pi pi-times" class="p-button-text p-button-danger" @click="showDialog = false" />
                <p-button label="Добавить" icon="pi pi-check" class="p-button-text" @click="addStudent" />
            </template>
        </p-dialog>
    </div>
</template>

<script setup lang="ts">
import { Gender, Student } from '@prisma/client'
import { useClassStore } from '~~/store/class'

definePageMeta({
    title: 'Список учащихся',
    breadcrumb: 'class'
})

const route = useRoute()

const newStudent = ref<Student>({} as Student)
const showDialog = ref(false)

const currentClass = useClassStore()
currentClass.setId(parseUUID(route.params.classId as string))

async function addStudent() {
    const { error } = await useFetch('/api/students/add', {
        method: 'POST',
        body: {
            studentData: {
                ...newStudent.value,
                classId: currentClass.id
            }
        }
    })
    if (error.value) return

    showDialog.value = false
    newStudent.value = {} as Student
    await refreshStudents()
}

const {
    data: students,
    refresh: refreshStudents,
    pending: loadingStudents
} = useFetch('/api/students/list', {
    headers: useRequestHeaders() as HeadersInit,
    query: {
        classId: currentClass.id
    }
})
</script>
