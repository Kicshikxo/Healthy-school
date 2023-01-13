<template>
    <section class="px-3">
        <p-card class="shadow-none">
            <template #title>
                <div class="flex align-items-center justify-content-between">
                    <span> Компонент медицинского здоровья </span>
                    <div class="flex gap-3 align-self-end">
                        <p-button
                            v-if="!enableEditing"
                            icon="pi pi-pencil"
                            label="Редактировать"
                            :disabled="enableEditing"
                            class="p-button-primary"
                            @click="enableEditing = true"
                        />
                        <p-button
                            v-if="enableEditing"
                            icon="pi pi-times"
                            label="Отменить"
                            :disabled="!enableEditing"
                            class="p-button-danger"
                            @click="cancelChanges"
                        />
                        <p-button
                            v-if="enableEditing"
                            icon="pi pi-save"
                            label="Сохранить"
                            :disabled="!enableEditing"
                            class="p-button-success"
                            @click="saveChanges"
                        />
                    </div>
                </div>
            </template>
            <template #content>
                <div class="text-xl font-bold">Группа здоровья</div>
                <p-card
                    class="col p-card-content-pb-0 p-card-content-pt-0 my-3 shadow-none"
                    :class="{
                        'bg-green-300': currentHealthZone === 'GREEN',
                        'bg-yellow-300': currentHealthZone === 'YELLOW',
                        'bg-red-300': currentHealthZone === 'RED'
                    }"
                >
                    <template #title>
                        <span v-if="currentHealthZone === 'GREEN'" class="text-0"> Первая </span>
                        <span v-if="currentHealthZone === 'YELLOW'" class="text-0"> Вторая </span>
                        <span v-if="currentHealthZone === 'RED'" class="text-0"> Третья </span>
                    </template>
                    <template #content>
                        <span v-if="currentHealthZone === 'GREEN'" class="text-0">
                            Выводы:
                            <br />
                            - нет ограничений по здоровью
                        </span>
                        <span v-if="currentHealthZone === 'YELLOW'" class="text-0">
                            Выводы:
                            <br />
                            - подвержен риску развития частых/хронических заболеваний
                            <br />
                            - обладает пониженным иммунитетом/проблемной наследственностью
                        </span>
                        <span v-if="currentHealthZone === 'RED'" class="text-0">
                            Выводы:
                            <br />
                            - наблюдается значительное ухудшение здоровья, нарушение функционирования некоторых органов и систем
                            <br />
                            - сниженная сопротивляемость организма
                            <br />
                            - требуется лечение/реабилитация
                        </span>
                    </template>
                </p-card>
                <p-card
                    class="p-card-content-pb-0 p-card-content-pt-0 border-1 border-300 shadow-none"
                    :class="{ 'border-noround-bottom': showDetails }"
                >
                    <template #content>
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">Наличие инвалидности</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-dropdown
                                    :disabled="!enableEditing"
                                    :options="disabilities"
                                    optionLabel="value"
                                    v-model="selectedDisability"
                                    class="w-full"
                                    placeholder="Наличие инвалидности"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-3 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-dropdown>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">
                                Сведения о заболеваемости
                            </div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-dropdown
                                    :disabled="!enableEditing"
                                    :options="morbidities"
                                    optionLabel="value"
                                    v-model="selectedMorbidity"
                                    class="w-full"
                                    placeholder="Сведения о заболеваемости"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-3 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-dropdown>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">
                                Сбалансированное питание
                            </div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-dropdown
                                    :disabled="!enableEditing"
                                    :options="balancedDiets"
                                    optionLabel="value"
                                    v-model="selectedBalancedDiets"
                                    class="w-full"
                                    placeholder="Сбалансированное питание"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-3 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-dropdown>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">
                                Наличие хронических заболеваний
                            </div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-dropdown
                                    :disabled="!enableEditing"
                                    :options="chronicDiseases"
                                    optionLabel="value"
                                    v-model="selectedChronicDiseases"
                                    class="w-full"
                                    placeholder="Наличие хронических заболеваний"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-3 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-dropdown>
                            </div>
                        </div>
                    </template>
                </p-card>
                <p-card
                    v-if="showDetails"
                    class="p-card-content-pb-0 p-card-content-pt-0 border-1 border-300 border-noround-top border-noround-bottom shadow-none"
                >
                    <template #title> Профилактические и здоровьесберегающие мероприятия </template>
                    <template #content>
                        <p-multi-select
                            :disabled="!enableEditing"
                            v-model="selectedIndividualRecommendations"
                            :options="individualRecommendations"
                            panelClass="border-1 border-300"
                            display="chip"
                            appendTo="self"
                            placeholder="Профилактические и здоровьесберегающие мероприятия"
                            class="w-full"
                        />
                    </template>
                </p-card>
                <p-card
                    v-if="showDetails"
                    class="p-card-content-pb-0 p-card-content-pt-0 border-1 border-300 border-noround-top shadow-none"
                >
                    <template #title> Индивидуальные рекомендации и назначения профильных медицинских специалистов </template>
                    <template #content>
                        <div class="grid grid-nogutter">
                            <p-divider class="mt-2" />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">Зрение</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-multi-select
                                    :disabled="!enableEditing"
                                    :options="vision"
                                    optionLabel="value"
                                    v-model="selectedVision"
                                    class="w-full"
                                    display="chip"
                                    appendTo="self"
                                    placeholder="Зрение"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-2 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-multi-select>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">Слух</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-multi-select
                                    :disabled="!enableEditing"
                                    :options="hearing"
                                    optionLabel="value"
                                    v-model="selectedHearing"
                                    class="w-full"
                                    display="chip"
                                    appendTo="self"
                                    placeholder="Слух"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-2 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-multi-select>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">Ортопедия</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-multi-select
                                    :disabled="!enableEditing"
                                    :options="orthopedia"
                                    optionLabel="value"
                                    v-model="selectedOrthopedia"
                                    class="w-full"
                                    display="chip"
                                    appendTo="self"
                                    placeholder="Ортопедия"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-2 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-multi-select>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">ЖКТ</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-multi-select
                                    :disabled="!enableEditing"
                                    :options="gastrointestinal"
                                    optionLabel="value"
                                    v-model="selectedGastrointestinal"
                                    class="w-full"
                                    display="chip"
                                    appendTo="self"
                                    placeholder="ЖКТ"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-2 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-multi-select>
                            </div>
                            <p-divider />
                            <div class="col-6 flex justify-content-start align-items-center text-lg">
                                Неврология, психиатрия
                            </div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-multi-select
                                    :disabled="!enableEditing"
                                    :options="neurologyAndPsychiatry"
                                    optionLabel="value"
                                    v-model="selectedNeurologyAndPsychiatry"
                                    class="w-full"
                                    display="chip"
                                    appendTo="self"
                                    placeholder="Неврология, психиатрия"
                                    panelClass="border-1 border-300"
                                >
                                    <template #option="slotProps">
                                        <div class="flex align-items-center">
                                            <div
                                                style="min-width: 6px; height: 20px"
                                                class="mr-2 border-round"
                                                :class="{
                                                    'bg-green-500': slotProps.option.healthZone === 'GREEN',
                                                    'bg-yellow-500': slotProps.option.healthZone === 'YELLOW',
                                                    'bg-red-500': slotProps.option.healthZone === 'RED'
                                                }"
                                            />
                                            <div>
                                                {{ slotProps.option.value }}
                                            </div>
                                        </div>
                                    </template>
                                </p-multi-select>
                            </div>
                            <p-divider />
                            <div class="mb-2 text-xl font-bold">Иное</div>
                            <p-textarea
                                :disabled="!enableEditing"
                                :autoResize="true"
                                :rows="6"
                                placeholder="Заполняется вручную медицинской сестрой"
                                class="w-full"
                            />
                        </div>
                    </template>
                </p-card>
            </template>
        </p-card>
    </section>
</template>

<script setup lang="ts">
import { HealthZone, MedicalHealth, PhysicalHealth, SocialHealth, Student } from '@prisma/client'
import { useToast } from 'primevue/usetoast'

const selectedDisability = ref<{ value: string; healthZone: HealthZone }>()
const disabilities = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'Нет', healthZone: 'GREEN' },
    { value: 'Да', healthZone: 'RED' }
])

const selectedMorbidity = ref<{ value: string; healthZone: HealthZone }>()
const morbidities = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'Не болеет', healthZone: 'GREEN' },
    { value: 'Болеет (2-4 раза/год)', healthZone: 'YELLOW' },
    { value: 'Болеет (более 4 раз/год)', healthZone: 'RED' }
])

const selectedBalancedDiets = ref<{ value: string; healthZone: HealthZone }>()
const balancedDiets = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'Регулярно', healthZone: 'GREEN' },
    { value: 'Не регулярно', healthZone: 'YELLOW' },
    { value: 'Нет', healthZone: 'RED' }
])

const selectedChronicDiseases = ref<{ value: string; healthZone: HealthZone }>()
const chronicDiseases = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'Нет', healthZone: 'GREEN' },
    { value: 'Проблемная наследственность, риск заболеваний', healthZone: 'YELLOW' },
    { value: 'Да', healthZone: 'RED' }
])

const selectedVision = ref<{ value: string; healthZone: HealthZone }[]>()
const vision = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'общие офтальмо-гигиенические мероприятия', healthZone: 'YELLOW' },
    { value: 'очковая или контактная коррекция зрения', healthZone: 'YELLOW' },
    { value: 'курсы плеоптики и ортоптики по показаниям', healthZone: 'YELLOW' },

    { value: 'диспансерное наблюдение врача-офтальмолога', healthZone: 'RED' },
    { value: 'офтальмо-гигиенические мероприятия', healthZone: 'RED' },
    { value: 'очковая или контактная коррекция', healthZone: 'RED' },
    { value: 'курсы плеоптики и ортоптики', healthZone: 'RED' },
    { value: 'курсы нейротрофической терапии', healthZone: 'RED' },
    { value: 'использование тифлоприборов', healthZone: 'RED' },
    { value: 'организация специального рабочего места обучающегося с патологией органов зрения', healthZone: 'RED' },
    { value: 'обучение на основе применения рельефно-точечной системы обозначений Брайля', healthZone: 'RED' }
])

const selectedHearing = ref<{ value: string; healthZone: HealthZone }[]>()
const hearing = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'физиофункциональное лечение', healthZone: 'YELLOW' },
    { value: 'консультация аллерголога', healthZone: 'YELLOW' },

    { value: 'диспансерное наблюдение врача-оториноларинголога', healthZone: 'RED' },
    { value: 'физиофункциональное лечение', healthZone: 'RED' },
    { value: 'консультация сурдолога', healthZone: 'RED' },
    { value: 'организация специального рабочего места обучающегося с патологией органов слуха', healthZone: 'RED' },
    { value: 'контроль за ношением слуховых аппаратов', healthZone: 'RED' },
    { value: 'занятия с сурдопедагогом', healthZone: 'RED' }
])

const selectedOrthopedia = ref<{ value: string; healthZone: HealthZone }[]>()
const orthopedia = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'профилактика остеохондроза, спинальной нестабильности (нарушений осанки)', healthZone: 'YELLOW' },

    { value: 'диспансерное наблюдение врача-ортопеда', healthZone: 'RED' },
    { value: 'занятия адаптивной (лечебной) физкультурой', healthZone: 'RED' },
    { value: 'специальная физкультурная группа', healthZone: 'RED' },
    { value: 'физиофункциональное лечение', healthZone: 'RED' },
    { value: 'соблюдение статодинамического режима (чередование обучения и отдыха)', healthZone: 'RED' },
    { value: 'ограничение физических нагрузок', healthZone: 'RED' },
    { value: 'коррегирующее амбулаторное/ стационарное лечение', healthZone: 'RED' },
    {
        value: 'организация специального рабочего места обучающегося с патологией опорно-двигательного аппарата',
        healthZone: 'RED'
    }
])

const selectedGastrointestinal = ref<{ value: string; healthZone: HealthZone }[]>()
const gastrointestinal = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'соблюдение индивидуальной диеты', healthZone: 'YELLOW' },
    { value: 'организация режима сбалансированного питания', healthZone: 'YELLOW' },

    { value: 'обеспечение полноценного и сбалансированного питания', healthZone: 'RED' },
    { value: 'соблюдение диеты (№ 1, 3, 4, 5, 15), дробного питания (5-6 раз в сутки)', healthZone: 'RED' },
    { value: 'соблюдение санитарно-гигиенического режима/дефекации', healthZone: 'RED' },
    { value: 'освобождение от занятий физической культурой на период обострения', healthZone: 'RED' },
    { value: 'подготовительная физкультурная группа (в период ремиссии)', healthZone: 'RED' },
    { value: 'специальная физкультурная группа (в период реконвалесценции)', healthZone: 'RED' },
    { value: 'основная физкультурная группа (в период стойкой ремиссии)', healthZone: 'RED' },
    {
        value: 'ограничение физической нагрузки (исключение глубоких наклонов, длительного пребывания в согнутом положении, поднятия руками тяжестей более 8-10 кг на обе руки, физических упражнений связанных с перенапряжением мышц брюшного пресса)',
        healthZone: 'RED'
    },
    { value: 'специальная организация сна с приподнятым головным концом кровати (не менее чем на 15 см)', healthZone: 'RED' }
])

const selectedNeurologyAndPsychiatry = ref<{ value: string; healthZone: HealthZone }[]>()
const neurologyAndPsychiatry = ref<{ value: string; healthZone: HealthZone }[]>([
    { value: 'регулярный прием витаминов и ноотропов', healthZone: 'YELLOW' },
    { value: 'профилактика  артериальной гипо- и гипертензии, нарушений сна, других форм неврозов', healthZone: 'YELLOW' },
    {
        value: 'физиофункциональное лечение вегетососудистой дистонии, неврозов  (ЛФК, массаж, электрофорез, электросон, лазер, магнит и др.)',
        healthZone: 'YELLOW'
    },

    { value: 'диспансерное наблюдение врача-невролога', healthZone: 'RED' },
    { value: 'диспансерное наблюдение врача-психиатра', healthZone: 'RED' },
    { value: 'амбулаторное и стационарное обследование и медикаментозное лечение', healthZone: 'RED' },
    { value: 'прием ноотропов и витаминов', healthZone: 'RED' },
    {
        value: 'своевременное проведение реабилитационных и абилитационных процедур (ЛФК, массаж, физиотерапевтическое лечение)',
        healthZone: 'RED'
    },
    { value: 'организация режима правильных физических нагрузок (занятия физкультурой в спецгруппе)', healthZone: 'RED' },
    { value: 'индивидуальный режим организации учебной нагрузки', healthZone: 'RED' },
    { value: 'дозированный режим труда и отдыха', healthZone: 'RED' },
    { value: 'сопровождение профильными специалистами', healthZone: 'RED' }
])

const currentHealthZone = computed<HealthZone>(() => {
    const generalOptions = [selectedDisability, selectedMorbidity, selectedBalancedDiets, selectedChronicDiseases]

    if (generalOptions.some((option) => option.value?.healthZone === 'RED')) {
        return 'RED'
    }
    if (generalOptions.some((option) => option.value?.healthZone === 'YELLOW')) {
        const medicalOptions = [
            ...(selectedVision.value ?? []),
            ...(selectedHearing.value ?? []),
            ...(selectedOrthopedia.value ?? []),
            ...(selectedGastrointestinal.value ?? []),
            ...(selectedNeurologyAndPsychiatry.value ?? [])
        ]
        if (medicalOptions.some((option) => option.healthZone === 'RED')) return 'RED'
        return 'YELLOW'
    }
    return 'GREEN'
})

const showDetails = computed(() => currentHealthZone.value === 'YELLOW' || currentHealthZone.value === 'RED')

const yellowRecommendations = [
    'рациональная физическая нагрузка и исполнение требований гигиенических нормативов',
    'регулярные занятия физической культурой и соблюдение режима дня',
    'прогулки на свежем воздухе и закаливание',
    'полноценное и сбалансированное питание',
    'Проведение профилактических бесед о пагубном воздействии вредных привычек на здоровье человека'
]

const redRecommendations = [
    'рациональная физическая нагрузка и исполнение требований гигиенических нормативов',
    'регулярные занятия физической культурой и соблюдение режима дня',
    'прогулки на свежем воздухе и закаливание',
    'полноценное и сбалансированное питание',
    'Проведение профилактических бесед о пагубном воздействии вредных привычек на здоровье человека',
    'Направление на ПМПК для решения вопроса о создании специальных образовательных условий'
]

const selectedIndividualRecommendations = ref<string>()

const individualRecommendations = computed(() => {
    if (currentHealthZone.value === 'YELLOW') {
        return yellowRecommendations
    }
    if (currentHealthZone.value === 'RED') {
        return redRecommendations
    }
})

const toast = useToast()

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const enableEditing = ref<boolean>(false)

function cancelChanges() {
    enableEditing.value = false
}

async function saveChanges() {
    enableEditing.value = false
}
</script>
