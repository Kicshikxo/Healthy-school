import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmPopup from 'primevue/confirmpopup/ConfirmPopup.vue'
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
import TabMenu from 'primevue/tabmenu/TabMenu.vue'
import Chip from 'primevue/chip/Chip.vue'
import Menu from 'primevue/menu/Menu.vue'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { locale, ripple: true })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.use(ConfirmationService)
    nuxtApp.vueApp.component('p-confirm-popup', ConfirmPopup)
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
    nuxtApp.vueApp.component('p-tab-menu', TabMenu)
    nuxtApp.vueApp.component('p-chip', Chip)
    nuxtApp.vueApp.component('p-menu', Menu)
})

const locale = {
    startsWith: 'Начинается с',
    contains: 'Содержит',
    notContains: 'Не содержит',
    endsWith: 'Заканчивается',
    equals: 'Равно',
    notEquals: 'Не равно',
    noFilter: 'Нет фильтра',
    filter: 'Фильтр',
    lt: 'Меньше чем',
    lte: 'Меньше чем или равно',
    gt: 'Более чем',
    gte: 'Более чем или равно',
    dateIs: 'Дата равна',
    dateIsNot: 'Дата не равна',
    dateBefore: 'Дата до',
    dateAfter: 'Дата после',
    custom: 'Пользовательский',
    clear: 'Очистить',
    apply: 'Принять',
    matchAll: 'Сопоставить все',
    matchAny: 'Совпадение с любым',
    addRule: 'Добавить правило',
    removeRule: 'Удалить правило',
    accept: 'Да',
    reject: 'Нет',
    choose: 'Выбрать',
    upload: 'Загрузить',
    cancel: 'Отмена',
    completed: 'Завершено',
    pending: 'В ожидании',
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
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авн', 'Сен', 'Окт', 'Ноя', 'Дек'],
    chooseYear: 'Выбрать год',
    chooseMonth: 'Выбрать месяц',
    chooseDate: 'Выбрать дату',
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
    am: 'до полудня',
    pm: 'после полудня',
    today: 'Сегодня',
    weekHeader: 'Нед.',
    firstDayOfWeek: 1,
    dateFormat: 'dd.mm.yyyy',
    weak: 'Простой',
    medium: 'Нормальный',
    strong: 'Хороший',
    passwordPrompt: 'Введите пароль',
    emptyFilterMessage: 'Результатов не найдено',
    searchMessage: '{0} результатов доступно',
    selectionMessage: '{0} элементов выбрано',
    emptySelectionMessage: 'Нет выбранного элемента',
    emptySearchMessage: 'Результатов не найдено',
    emptyMessage: 'Нет доступных вариантов',
    aria: {
        trueLabel: 'Верно',
        falseLabel: 'Неверно',
        nullLabel: 'Не выбран',
        star: '1 звезда',
        stars: '{star} звёзд',
        selectAll: 'Выбраны все элементы',
        unselectAll: 'Все элементы не выбраны',
        close: 'Закрыть',
        previous: 'Предыдущий',
        next: 'Следующий',
        navigation: 'Навигация',
        scrollTop: 'Прокрутить в начало',
        moveTop: 'Переместить в начало',
        moveUp: 'Переместить вверх',
        moveDown: 'Переместить вниз',
        moveBottom: 'Переместить в конец',
        moveToTarget: 'Переместить в приёмник',
        moveToSource: 'Переместить в источник',
        moveAllToTarget: 'Переместить всё в приёмник',
        moveAllToSource: 'Переместить всё в источник',
        pageLabel: '{page}',
        firstPageLabel: 'Первая страница',
        lastPageLabel: 'Последняя страница',
        nextPageLabel: 'Следующая страница',
        previousPageLabel: 'Предыдущая страница',
        rowsPerPageLabel: 'Строк на странице',
        jumpToPageDropdownLabel: 'Перейти к раскрывающемуся списку страниц',
        jumpToPageInputLabel: 'Перейти к вводу страницы',
        selectRow: 'Выбрана строка',
        unselectRow: 'Строка не выбрана',
        expandRow: 'Строка развёрнута',
        collapseRow: 'Строка свёрнута',
        showFilterMenu: 'Показать меню фильтра',
        hideFilterMenu: 'Скрыть меню фильтра',
        filterOperator: 'Оператор фильтра',
        filterConstraint: 'Ограничение фильтра',
        editRow: 'Редактирование строки',
        saveEdit: 'Сохранить правку',
        cancelEdit: 'Отменить правку',
        listView: 'В виде списка',
        gridView: 'В виде сетки',
        slide: 'Слайд',
        slideNumber: '{slideNumber}',
        zoomImage: 'Увеличить изображение',
        zoomIn: 'Увеличить',
        zoomOut: 'Уменьшить',
        rotateRight: 'Повернуть вправо',
        rotateLeft: 'Повернуть влево'
    }
}
