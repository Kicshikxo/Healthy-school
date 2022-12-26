export default () => {
    const data = useState('session:data')
    const status = computed(() =>
        data.value ? 'authenticated' : 'unauthenticated'
    )

    return { data, status }
}
