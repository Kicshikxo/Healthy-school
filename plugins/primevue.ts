import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button/Button.vue'
import InputText from 'primevue/inputtext/InputText.vue'
import DataTable from 'primevue/datatable/DataTable.vue'
import Column from 'primevue/column/Column.vue'
import Dialog from 'primevue/dialog/Dialog.vue'
import Skeleton from 'primevue/skeleton/Skeleton.vue'
import Dropdown from 'primevue/dropdown/Dropdown.vue'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: false })
    nuxtApp.vueApp.component('PButton', Button)
    nuxtApp.vueApp.component('PInputText', InputText)
    nuxtApp.vueApp.component('PDataTable', DataTable)
    nuxtApp.vueApp.component('PColumn', Column)
    nuxtApp.vueApp.component('PDialog', Dialog)
    nuxtApp.vueApp.component('PSkeleton', Skeleton)
    nuxtApp.vueApp.component('PDropdown', Dropdown)
})
