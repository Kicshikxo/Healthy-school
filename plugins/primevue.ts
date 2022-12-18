import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import Skeleton from 'primevue/skeleton'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: false })
    nuxtApp.vueApp.component('PButton', Button)
    nuxtApp.vueApp.component('PInputText', InputText)
    nuxtApp.vueApp.component('PDataTable', DataTable)
    nuxtApp.vueApp.component('PColumn', Column)
    nuxtApp.vueApp.component('PDialog', Dialog)
    nuxtApp.vueApp.component('PSkeleton', Skeleton)
})
