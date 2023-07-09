export const handleNumberPassportChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    const series = value.slice(0, 6);

    e.target.value = series
}
