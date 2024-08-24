import {Document, Schema, models, model} from "mongoose";

export interface Deals extends Document {
    id: string,
    offerId: string,
    owner: string,
    token: string,
    amountBigIntStringified: string,
    amount: number,
    amountAfterReedem?: number,
    purchasePrice: number,
    discount: number,

    date: {
        purchasedAt: number,
        maturity: number,
        redeemedAt?: number
    },
}

const DealSchema = new Schema<Deals>({
    id: { type: String, required: true },
    offerId: { type: String, required: true },
    owner: { type: String, required: true },
    token: { type: String, required: true },
    amountBigIntStringified: { type: String, required: true },
    amount: { type: Number, required: true },
    amountAfterReedem: { type: Number },
    purchasePrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    date: {
        purchasedAt: { type: Number, required: true },
        maturity: { type: Number, required: true },
        redeemedAt: { type: Number },
    },
});

export default models.Deal || model<Deals>("Deal", DealSchema);