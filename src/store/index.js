import { atom } from "jotai"

export const userAtom = atom()
export const priceRangeAtom = atom({ min: 100, max: 1000 })
export const yearRangeAtom = atom({ min: 2015, max: 2024 })