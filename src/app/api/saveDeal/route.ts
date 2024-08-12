import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "../../../../lib/dbConnect";
import Deal from '../../../../lib/models/Deal';
import { DealType } from '@/types/deal';
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    try{
        await dbConnect();
        const data = await request.json();
        await Deal.create(data);
        return NextResponse.json({message: "Deal added to DB"}, {status: 200})
    }
    catch(e){
        console.log("Error in saveDeal");
        console.log(e);
        return NextResponse.json({message: "Error in saveDeal"}, {status: 400})
    }
  }