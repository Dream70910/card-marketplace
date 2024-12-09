import { atom } from "jotai"

export const userAtom = atom()
export const priceRangeAtom = atom({ min: 100, max: 1000 })