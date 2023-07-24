export const handleSeriesChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const series = value.slice(0, 4);

    e.target.value = series
}