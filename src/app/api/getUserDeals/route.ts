import { NextResponse, NextRequest } from 'next/server'
import dbConnect from "../../../../lib/dbConnect";
import Deal from '../../../../lib/models/Deal';
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try{
        await dbConnect();
        const user = request.nextUrl.searchParams.get("user");
        const dealId = request.nextUrl.searchParams.get("dealId");
        const filter = user ? {owner: user} : dealId ? {id: dealId} : null;
        if(filter){
            const deals = await Deal.find(filter);
            return NextResponse.json(deals, {status: 200})
        }
        else throw new Error("No valid filter provided")
    }
    catch(e){
        console.log("Error in getUserDeals");
        console.log(e);
        return NextResponse.json(null, {status: 400})
    }
  }