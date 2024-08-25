import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "../../../../lib/dbConnect";
import Deal from '../../../../lib/models/Deal';
import { DealType } from '@/types/deal';
export const dynamic = "force-dynamic";

type routeJsonData = {
    newDeal?: DealType,
    updateDeal?: {
        id: string,
        updateData: {
            [parameter: string]: any,
        }
    }
} | undefined;

export async function POST(request: NextRequest) {
    try{
        await dbConnect();
        const data: routeJsonData = await request.json() || {};
        let message = "";
        if(data?.newDeal){
            await Deal.create(data.newDeal);
            message = "Deal added to DB";
        }
        else if(data?.updateDeal){
            const {id, updateData} = data.updateDeal;
            await Deal.findOneAndUpdate({id}, {$set: updateData});
            message = "Deal updated in DB";
        }
        else{
            throw new Error("No valid request body provided")
        }
        return NextResponse.json({message}, {status: 200})
    }
    catch(e){
        console.log("Error in saveDeal");
        console.log(e);
        return NextResponse.json({message: "Error in saveDeal"}, {status: 400})
    }
  }