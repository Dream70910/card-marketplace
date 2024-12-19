import { atom } from "jotai"

export const userAtom = atom()
export const priceRangeAtom = atom({ min: 100, max: 10000 })
export const yearRangeAtom = atom({ min: 2010, max: 2024 })