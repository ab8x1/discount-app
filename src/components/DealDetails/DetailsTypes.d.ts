export type DealDetailsType = {
    discount: number,
    reedem: number,
    earn: number,
    roi: number,
    date: {
        start: number,
        end: number
    }
}

export type Stage = "buy" | "confirm"