export const convertFmsData = (data) => {
    let options = []

    for (let i = 0; i < data.length; i++) {
        options[i] = {
            value: data[i]['value'], label: data[i]['value']
        }
    }
    return options
}