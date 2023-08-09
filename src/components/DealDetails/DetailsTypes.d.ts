import { tokens } from "@/types/deal"

export type DealDetailsType = {
    discount: number,
    reedem: number,
    earn: number,
    roi: number,
    token: tokens,
    date: {
        start: number,
        end: number
    }
}

export type Stage = "buy" | "confirm"