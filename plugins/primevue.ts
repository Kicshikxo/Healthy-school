import { defineNuxtPlugin } from '#app'
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

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: false })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component('PButton', Button)
    nuxtApp.vueApp.component('PToggleButton', ToggleButton)
    nuxtApp.vueApp.component('PCheckbox', Checkbox)
    nuxtApp.vueApp.component('PSelectButton', SelectButton)
    nuxtApp.vueApp.component('PInputText', InputText)
    nuxtApp.vueApp.component('PTextarea', Textarea)
    nuxtApp.vueApp.component('PInputNumber', InputNumber)
    nuxtApp.vueApp.component('PInputMask', InputMask)
    nuxtApp.vueApp.component('PDataTable', DataTable)
    nuxtApp.vueApp.component('PColumn', Column)
    nuxtApp.vueApp.component('PToast', Toast)
    nuxtApp.vueApp.component('PDialog', Dialog)
    nuxtApp.vueApp.component('PSkeleton', Skeleton)
    nuxtApp.vueApp.component('PDropdown', Dropdown)
    nuxtApp.vueApp.component('PMultiSelect', MultiSelect)
    nuxtApp.vueApp.component('PProgressBar', ProgressBar)
    nuxtApp.vueApp.component('PDivider', Divider)
    nuxtApp.vueApp.component('PCard', Card)
})
