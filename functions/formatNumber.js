import { AsYouType } from "libphonenumber-js";


export const formatNumber = (nums) => {
    return new AsYouType("RU").input(nums)
}