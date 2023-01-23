import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button/Button.vue'
import ToggleButton from 'primevue/togglebutton/ToggleButton.vue'
import Checkbox from 'primevue/checkbox/Checkbox.vue'
import SelectButton from 'primevue/selectbutton/SelectButton.vue'
import InputText from 'primevue/inputtext/InputText.vue'
import Password from 'primevue/password/Password.vue'
import Textarea from 'primevue/textarea/Textarea.vue'
import InputNumber from 'primevue/inputnumber/InputNumber.vue'
import InputMask from 'primevue/inputmask/InputMask.vue'
import DataTable from 'primevue/datatable/DataTable.vue'
import Column from 'primevue/column/Column.vue'
import Toast from 'primevue/toast/Toast.vue'
import Dialog from 'primevue/dialog/Dialog.vue'
import Skeleton from 'primevue/skeleton/Skeleton.vue'
import Dropdown from 'primevue/dropdown/Dropdown.vue'
import MultiSelect from 'primevue/multiselect/MultiSelect.vue'
import ProgressBar from 'primevue/progressbar/ProgressBar.vue'
import Divider from 'primevue/divider/Divider.vue'
import Card from 'primevue/card/Card.vue'
import Chart from 'primevue/chart/Chart.vue'
import Calendar from 'primevue/calendar/Calendar.vue'
import TabView from 'primevue/tabview/TabView.vue'
import TabPanel from 'primevue/tabpanel/TabPanel.vue'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { locale, ripple: true })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('p-button', Button)
    nuxtApp.vueApp.component('p-toggle-button', ToggleButton)
    nuxtApp.vueApp.component('p-checkbox', Checkbox)
    nuxtApp.vueApp.component('p-select-button', SelectButton)
    nuxtApp.vueApp.component('p-input-text', InputText)
    nuxtApp.vueApp.component('p-password', Password)
    nuxtApp.vueApp.component('p-textarea', Textarea)
    nuxtApp.vueApp.component('p-input-number', InputNumber)
    nuxtApp.vueApp.component('p-input-mask', InputMask)
    nuxtApp.vueApp.component('p-data-table', DataTable)
    nuxtApp.vueApp.component('p-column', Column)
    nuxtApp.vueApp.component('p-toast', Toast)
    nuxtApp.vueApp.component('p-dialog', Dialog)
    nuxtApp.vueApp.component('p-skeleton', Skeleton)
    nuxtApp.vueApp.component('p-dropdown', Dropdown)
    nuxtApp.vueApp.component('p-multi-select', MultiSelect)
    nuxtApp.vueApp.component('p-progress-bar', ProgressBar)
    nuxtApp.vueApp.component('p-divider', Divider)
    nuxtApp.vueApp.component('p-card', Card)
    nuxtApp.vueApp.component('p-chart', Chart)
    nuxtApp.vueApp.component('p-calendar', Calendar)
    nuxtApp.vueApp.component('p-tab-view', TabView)
    nuxtApp.vueApp.component('p-tab-panel', TabPanel)
})

const locale = {
    startsWith: 'Начинается с',
    contains: 'Содержит',
    notContains: 'Не содержит',
    endsWith: 'Заканчивается на',
    equals: 'Равняется',
    notEquals: 'Не равняется',
    noFilter: 'Без фильтра',
    lt: 'Меньше',
    lte: 'Меньше или равно',
    gt: 'Больше',
    gte: 'Больше или равно',
    dateIs: 'Дата',
    dateIsNot: 'Дата не',
    dateBefore: 'Дата до',
    dateAfter: 'Дата после',
    clear: 'Очистить',
    apply: 'Применить',
    matchAll: 'Соответствует всем',
    matchAny: 'Соответствует любому',
    addRule: 'Добавить правило',
    removeRule: 'Удалить правило',
    accept: 'Да',
    reject: 'Нет',
    choose: 'Выбрать',
    upload: 'Загрузить',
    cancel: 'Отменить',
    completed: 'Завершено',
    pending: 'Ожидание',
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябль',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    chooseYear: 'Выберите год',
    chooseMonth: 'Выберите месяц',
    chooseDate: 'Выберите дату',
    prevDecade: 'Предыдущее десятилетие',
    nextDecade: 'Следующее десятилетие',
    prevYear: 'Предыдущий год',
    nextYear: 'Следующий год',
    prevMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    prevHour: 'Предыдущий час',
    nextHour: 'Следующий час',
    prevMinute: 'Предыдущая минута',
    nextMinute: 'Следующая минута',
    prevSecond: 'Предыдущая секунда',
    nextSecond: 'Следующая секунда',
    am: 'am',
    pm: 'pm',
    today: 'Сегодня',
    weekHeader: 'Нед',
    firstDayOfWeek: 0,
    dateFormat: 'dd.mm.yy',
    weak: 'Слабый',
    medium: 'Средний',
    strong: 'Сильный',
    passwordPrompt: 'Введите пароль',
    emptyFilterMessage: 'Результаты не найдены', // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: 'Найдено {0} результатов',
    selectionMessage: '{0} элементов выбрано',
    emptySelectionMessage: 'Нет выбранного элемента',
    emptySearchMessage: 'Результаты не найдены',
    emptyMessage: 'Нет доступных вариантов'
}
