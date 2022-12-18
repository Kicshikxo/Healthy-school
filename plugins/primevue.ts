import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button/Button'
import InputText from 'primevue/inputtext/InputText'
import DataTable from 'primevue/datatable/DataTable'
import Column from 'primevue/column/Column'
import Dialog from 'primevue/dialog/Dialog'
import Skeleton from 'primevue/skeleton/Skeleton'
import Dropdown from 'primevue/dropdown/Dropdown'

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
