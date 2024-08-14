import { tokens } from "@/types/deal"

export type DealDetailsType = {
    offerId: string,
    discount: number | null,
    reedem: number | null,
    earn: number | null,
    roi: number | null,
    token: tokens,
    date: {
        start: number,
        end: number
    },
    chainHexId: string
}

export type Stage = "buy" | "confirm"