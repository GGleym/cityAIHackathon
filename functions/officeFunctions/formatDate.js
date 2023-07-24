export const formatDate = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    const day = value.slice(0, 2);
    const month = value.slice(2, 4);
    const year = value.slice(4, 8);
    const formattedValue = [day, month, year].filter(Boolean).join('.');
    e.target.value = formattedValue;
}