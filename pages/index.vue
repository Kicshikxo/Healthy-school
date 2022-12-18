<template>
    <div class="flex flex-column gap-2 p-2">
        <p-dropdown
            v-model="selectedRegion"
            :options="regions"
            placeholder="Муниципальное образование"
        />
        <p-dropdown
            v-model="selectedOrganization"
            :disabled="!selectedRegion"
            :options="organizations"
            placeholder="Выберите образовательную организацию"
        />
        <p-dropdown
            v-model="selectedClass"
            :disabled="!selectedOrganization"
            :options="classes"
            placeholder="Выберите класс"
        />
        <p-dropdown
            v-model="selectedStudent"
            :disabled="!selectedClass"
            :options="(students as any[])"
            optionLabel="secondName"
            placeholder="Выберите обучающегося"
        />
        <div v-if="selectedStudent" class="shadow-4 p-4">
            <div>
                <div class="text-xl my-2">
                    {{ selectedStudent?.secondName }}
                    {{ selectedStudent?.firstName }}
                    {{ selectedStudent?.middleName }}
                    класс {{ selectedClass }}
                </div>
                <div class="grid border-top-1 border-bottom-1 border-500">
                    <div
                        class="col-6 flex justify-content-center align-items-center text-2xl"
                    >
                        Группа здоровья
                    </div>
                    <div class="col-6 health-groups-buttons">
                        <SelectButton
                            v-model="selectedHealthGroup"
                            :options="healthGroups"
                            :disabled="!selectedStudent"
                            optionLabel="name"
                        />
                    </div>
                </div>
                <div v-if="selectedHealthGroup" class="grid p-2 text-xl">
                    <div class="col-6 text-center">Наличие инвалидности</div>
                    <div class="col-6 text-center">
                        <div v-if="selectedHealthGroup.value == 1">-</div>
                        <div v-if="selectedHealthGroup.value == 2">Нет</div>
                        <div v-if="selectedHealthGroup.value == 3">Да</div>
                    </div>
                </div>
                <div v-if="selectedHealthGroup" class="grid p-2 text-xl">
                    <div class="col-6 text-center">
                        Сведения о заболеваемости
                    </div>
                    <div class="col-6 text-center">
                        <div v-if="selectedHealthGroup.value == 1">-</div>
                        <div v-if="selectedHealthGroup.value == 2">
                            Болеет (2-4 раза/год)
                        </div>
                        <div v-if="selectedHealthGroup.value == 3">
                            Болеет (более 4 раз/год)
                        </div>
                    </div>
                </div>
                <div v-if="selectedHealthGroup" class="grid p-2 text-xl">
                    <div class="col-6 text-center">
                        Сбалансированное питание
                    </div>
                    <div class="col-6 text-center">
                        <div v-if="selectedHealthGroup.value == 1">-</div>
                        <div v-if="selectedHealthGroup.value == 2">
                            Не регулярно
                        </div>
                        <div v-if="selectedHealthGroup.value == 3">Нет</div>
                    </div>
                </div>
                <div v-if="selectedHealthGroup" class="grid p-2 text-xl">
                    <div class="col-6 text-center">
                        Наличие хронических заболеваний
                    </div>
                    <div class="col-6 text-center">
                        <div v-if="selectedHealthGroup.value == 1">-</div>
                        <div v-if="selectedHealthGroup.value == 2">
                            Проблемная наследственность, риск заболеваний
                        </div>
                        <div v-if="selectedHealthGroup.value == 3">
                            <p-dropdown
                                :options="['Да', 'Нет']"
                                placeholder="Да"
                            />
                        </div>
                    </div>
                </div>
                <div
                    v-if="
                        selectedHealthGroup && selectedHealthGroup?.value != 1
                    "
                    class="grid p-2 text-xl"
                >
                    <div class="col-6 text-center">
                        Наличие хронических заболеваний
                    </div>
                    <div class="col-6 text-center">
                        <div v-if="selectedHealthGroup.value == 2">
                            <p-dropdown
                                :options="[
                                    'общие офтальмо-гигиенические мероприятия',
                                    'очковая или контактная коррекция зрения',
                                    'курсы плеоптики и ортоптики по показаниям'
                                ]"
                                placeholder="Зрение"
                            />
                        </div>
                        <div v-if="selectedHealthGroup.value == 3">
                            <p-dropdown
                                :options="[
                                    'диспансерное наблюдение врача-офтальмолога',
                                    'офтальмо-гигиенические мероприятия',
                                    'очковая или контактная коррекция',
                                    'курсы плеоптики и ортоптики',
                                    'курсы нейротрофической терапии',
                                    'использование тифлоприборов',
                                    'организация рабочего места обучающегося с патологией органов зрения',
                                    'обучение на основе применения рельефно-точечной системы обозначений Брайля'
                                ]"
                                placeholder="Зрение"
                            />
                        </div>
                    </div>
                </div>
                <div
                    v-if="
                        selectedHealthGroup && selectedHealthGroup?.value != 1
                    "
                    class="grid p-2 text-xl"
                >
                    <div class="col-6 text-center">Иное</div>
                    <div class="col-6 text-center">
                        <p-input-text />
                    </div>
                </div>
            </div>
            <div v-if="selectedHealthGroup" class="text-xl mt-4">
                <div
                    v-if="selectedHealthGroup.value == 1"
                    class="bg-green-200 p-2 border-round"
                >
                    <div>Выводы: нет ограничений по здоровью.</div>
                    <div>
                        Профилактические и здоровьесберегающие мероприятия:
                        обеспечить рациональную физическую нагрузку и исполнение
                        требований гигиенических нормативов, регулярные занятия
                        физической культурой и соблюдение режима дня, прогулки
                        на свежем воздухе и закаливание, полноценное и
                        сбалансированное питание. Проведение профилактических
                        бесед со школьниками старших классов о пагубном
                        воздействии вредных привычек на здоровье.
                    </div>
                </div>
                <div
                    v-if="selectedHealthGroup.value == 2"
                    class="bg-yellow-200 p-2 border-round"
                >
                    <div>
                        Выводы: подвержен риску развития частых/хронических
                        заболеваний, обладает пониженным иммунитетом/проблемной
                        наследственностью.
                    </div>
                    <div>
                        Профилактические и здоровьесберегающие мероприятия:
                        обеспечить рациональную физическую нагрузку и исполнение
                        требований гигиенических нормативов, регулярные занятия
                        физической культурой и соблюдение режима дня, прогулки
                        на свежем воздухе и закаливание, полноценное и
                        сбалансированное питание. Проведение профилактических
                        бесед со школьниками старших классов о пагубном
                        воздействии вредных привычек на здоровье.
                    </div>
                </div>
                <div
                    v-if="selectedHealthGroup.value == 3"
                    class="bg-red-200 p-2 border-round"
                >
                    <div>
                        Выводы: наблюдается значительное ухудшение здоровья,
                        нарушение функционирования некоторых органов и систем;
                        сниженная сопротивляемость организма; требуется
                        лечение/реабилитация.
                    </div>
                    <div>
                        Профилактические и здоровьесберегающие рекомендации:
                        обеспечить рациональную физическую нагрузку и исполнение
                        требований гигиенических нормативов, регулярные занятия
                        физической культурой и соблюдение режима дня, прогулки
                        на свежем воздухе и закаливание, полноценное и
                        сбалансированное питание. Проведение профилактических
                        бесед со школьниками старших классов о пагубном
                        воздействии вредных привычек на здоровье. Необходимо
                        направление на ПМПК для решения вопроса о создании
                        специальных образовательных условий.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'
import { Student } from '@prisma/client'

definePageMeta({
    title: 'Домашняя страница'
})

const selectedHealthGroup = ref<{ name: string; value: number }>()

const healthGroups = [
    {
        name: 'Первая',
        value: 1
    },
    {
        name: 'Вторая',
        value: 2
    },
    {
        name: 'Третья',
        value: 3
    }
]

const selectedRegion = ref<string>()
const regions = [
    'город Курск',
    'город Железногорск',
    'город Льгов',
    'город Курчатов',
    'город Щигры',
    'Беловский район',
    'Большесолдатский район',
    'Глушковский район',
    'Горшеченский район',
    'Дмитриевский район',
    'Железногорский район',
    'Золотухинский район',
    'Касторенский район',
    'Конышевский район',
    'Кореневский район',
    'Курский район',
    'Курчатовский район',
    'Льговский район',
    'Мантуровский район',
    'Медвенский район',
    'Обоянский район ',
    'Октябрьский район',
    'Поныровский район',
    'Пристенский район',
    'Рыльский район',
    'Советский район',
    'Солнцевский район',
    'Суджанский район',
    'Тимский район',
    'Фатежский район',
    'Хомутовский район',
    'Черемисиновский район',
    'Щигровский район'
]

const selectedOrganization = ref<string>()
const organizations = [
    'Муниципальное казенное общеобразовательное учреждение «Барановская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Богатыревская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Болотская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Быковская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Головищенская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Горшеченская средняя общеобразовательная школа имени Н.И. Жиронкина» ',
    'Муниципальное казенное общеобразовательное учреждение «Горшеченская средняя общеобразовательная школа № 2»',
    'Муниципальное казенное общеобразовательное учреждение «Мелавская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Роговская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Сосновская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Солдатская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Среднеапоченская средняя общеобразовательная школа»',
    'Муниципальное казённое общеобразовательное учреждение «Удобенская средняя общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Ясеновская средняя общеобразовательная школа»',
    'Муниципальное казенное  общеобразовательное учреждение «Знаменская  основная общеобразовательная школа»',
    'Муниципальное казенное общеобразовательное учреждение «Бекетовская начальная общеобразовательная школа»'
]

const selectedClass = ref<string>()
const classes = ['1А', '1Б']

const selectedStudent = ref<Student>()
const { data: students } = useFetch('/api/students')
</script>

<style>
.health-groups-buttons .p-button {
    width: 33.3333%;
}

.p-selectbutton .p-button.p-highlight:nth-child(1) {
    background: #c6e0b3;
    border-color: none;
    color: black;
}
.p-selectbutton .p-button.p-highlight:nth-child(2) {
    background: #ffffb3;
    border-color: none;
    color: black;
}
.p-selectbutton .p-button.p-highlight:nth-child(3) {
    background: #ff9b9b;
    border-color: none;
    color: black;
}
</style>
