import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "../../../../lib/dbConnect";
import Deal from '../../../../lib/models/Deal';
import { DealType } from '@/types/deal';
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try{
        await dbConnect();
        const newDeal: DealType = {
            id: "test",
            amount: 0,
            date: {
                maturity: 0,
                purchasedAt: 0
            },
            discount: 0,
            purchasePrice: 0,
            token: "none"
        }
        await Deal.create(newDeal);
        return NextResponse.json({
            message: "true"
        })
    }
    catch(e){
        console.log("Error in saveDeal");
        console.log(e);
        return NextResponse.json({
            allContracts: []
        })
    }
  }