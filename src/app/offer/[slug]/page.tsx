import Offer from "@/components/Offer"
import { exampleOffers } from "@/consts/exampleDeals";

async function getOfferData(dealId : string) {
    const deal = exampleOffers.find(deal => deal.id === dealId);

    if (!deal) {
      throw new Error('Failed to fetch data')
    }

    return deal;
}

export default async function Page({
    params
} : {
    params: { slug: string}
}){
    const thinDeal = await getOfferData(params.slug);
    return(
        <main className="container" style={{display: 'flex', flex: 1}}>
            <Offer offerData={thinDeal}/>
        </main>
    )
}
