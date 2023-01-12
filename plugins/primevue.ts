import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Button from 'primevue/button/Button.vue'
import ToggleButton from 'primevue/togglebutton/ToggleButton.vue'
import Checkbox from 'primevue/checkbox/Checkbox.vue'
import SelectButton from 'primevue/selectbutton/SelectButton.vue'
import InputText from 'primevue/inputtext/InputText.vue'
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

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: false })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('p-button', Button)
    nuxtApp.vueApp.component('p-toggle-button', ToggleButton)
    nuxtApp.vueApp.component('p-checkbox', Checkbox)
    nuxtApp.vueApp.component('p-select-button', SelectButton)
    nuxtApp.vueApp.component('p-input-text', InputText)
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
})
