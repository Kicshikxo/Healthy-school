export default (snils: string) => {
    if (!/^\d{3}-\d{3}-\d{3}\s\d{2}$/.test(snils)) return false

    const [value, checksum] = snils.split(' ').map((part) => parseInt(part.replace(/\D/g, '')))
    const sum = `${value}`.split('').reduce((acc, value, index) => acc + parseInt(value) * (9 - index), 0)

    return (
        (sum < 100 && sum === checksum) ||
        ((sum === 100 || sum === 101) && checksum === 0) ||
        (sum > 101 && (sum % 101 === checksum || (sum % 101 === 100 && checksum === 0)))
    )
}
