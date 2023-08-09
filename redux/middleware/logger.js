export const logger = (state) => (next) => (action) => {
    console.log(action)
    next(action)
}