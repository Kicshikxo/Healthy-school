<template>
    <manage-form
        success-submit-summary="Успешное добавление"
        error-submit-summary="Ошибка добавления"
        submit-label="Добавить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Добавление пользователя </template>
        <template #form>
            <div class="formgrid grid">
                <form-select-municipality
                    label="Муниципалитет"
                    placeholder="Выберите муниципалитет"
                    v-model="selectedMunicipality"
                    :error-message="selectedMunicipalityError"
                    class="col"
                />
                <form-select-organization
                    label="Школа"
                    placeholder="Выберите школу"
                    v-model="selectedOrganization"
                    :error-message="selectedOrganizationError"
                    :municipality-id="selectedMunicipality?.id"
                    class="col"
                />
            </div>
            <p-divider class="mt-1" />
            <div class="formgrid grid">
                <form-input-text
                    label="Имя пользователя"
                    placeholder="Введите имя пользователя (логин)"
                    v-model="username"
                    :errorMessage="usernameError"
                    :disabled="!selectedOrganization"
                    class="col"
                />
                <form-input-password
                    label="Пароль"
                    placeholder="Введите пароль"
                    v-model="password"
                    :errorMessage="passwordError"
                    :disabled="!selectedOrganization"
                    class="col"
                />
            </div>
            <div class="formgrid grid">
                <form-input-dropdown
                    label="Роль"
                    placeholder="Выберите роль"
                    v-model="role"
                    :errorMessage="roleError"
                    :disabled="!selectedOrganization"
                    :options="Object.keys(Role).filter(role => role !== Role.OPERATOR).map((role) => ({ label: localizeRole(role as Role), value: role }))"
                    optionLabel="label"
                    optionValue="value"
                    class="col"
                />
                <form-input-password
                    label="Повтор пароля"
                    placeholder="Повторите пароль"
                    v-model="repeatPassword"
                    :errorMessage="repeatPasswordError"
                    :disabled="!selectedOrganization"
                    class="col"
                />
            </div>
            <form-multiselect-class
                v-if="role === Role.CLASS_TEACHER"
                label="Закреплённые классы"
                placeholder="Выберите закреплённые классы"
                v-model="assignedClasses"
                :errorMessage="assignedClassesError"
                :disabled="!selectedOrganization"
                :organizationId="selectedOrganization.id"
            />
            <form-input-text
                label="Фамилия"
                placeholder="Введите фамилию"
                v-model="secondName"
                :errorMessage="secondNameError"
                :disabled="!selectedOrganization"
            />
            <form-input-text
                label="Имя"
                placeholder="Введите имя"
                v-model="firstName"
                :errorMessage="firstNameError"
                :disabled="!selectedOrganization"
            />
            <form-input-text
                label="Отчество"
                placeholder="Введите отчество"
                v-model="middleName"
                :disabled="!selectedOrganization"
                :errorMessage="middleNameError"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Class, EducationalOrganization, Municipality, Role, User } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { resetForm, validate, setFieldError } = useForm()

const { value: selectedMunicipality, errorMessage: selectedMunicipalityError } = useField<Municipality>(
    'municipality',
    (value) => validateMunicipality(value)
)
const { value: selectedOrganization, errorMessage: selectedOrganizationError } = useField<EducationalOrganization>(
    'organizationId',
    (value) => validateOrganization(value)
)
const { value: role, errorMessage: roleError } = useField<Role>('role', (value) => validateRole(value))
const { value: username, errorMessage: usernameError } = useField<string>('username', (value) => validateUsername(value))
const { value: password, errorMessage: passwordError } = useField<string>('password', (value) => validatePassword(value))
const { value: repeatPassword, errorMessage: repeatPasswordError } = useField<string>('repeatPassword', (value?: string) => {
    if (!value?.trim()) return 'Повторите пароль'
    if (value !== password.value) return 'Пароли не совпадают'
    if (value.length > 50) return 'Слишком длинный пароль'
    return true
})
const { value: assignedClasses, errorMessage: assignedClassesError } = useField<Class[]>('assignedClasses', (value) => {
    if (role.value !== Role.CLASS_TEACHER) return true
    if (!value?.length) return 'Выберите закреплённые классы'
    return true
})
const { value: secondName, errorMessage: secondNameError } = useField<string>('secondName', (value) =>
    validateSecondName(value)
)
const { value: firstName, errorMessage: firstNameError } = useField<string>('firstName', (value) => validateFirstName(value))
const { value: middleName, errorMessage: middleNameError } = useField<string>('middleName', (value) =>
    validateMiddleName(value)
)

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: checkUsername } = await useFetch('/api/users/check-username', {
        query: { username: username.value }
    })
    if (!checkUsername.value?.available) {
        setFieldError('username', 'Имя пользователя уже используется')
        throw new Error('Имя пользователя уже используется')
    }

    const { error } = await useFetch('/api/users/add', {
        method: 'POST',
        body: {
            role: role.value,
            username: username.value,
            password: password.value,
            secondName: secondName.value,
            firstName: firstName.value,
            middleName: middleName.value,
            organizationId: selectedOrganization.value.id,
            assignedClasses: assignedClasses.value
        } as User & { organizationId: string; assignedClasses?: Class[] }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Пользователь успешно добавлен'
}
</script>
