import EditDeal from "@/components/EditDeal/EditDeal";
import { exampleThinDeals } from "@/consts/exampleDeals";

async function getThinDeal(dealId : string) {
    const deal = exampleThinDeals.find(deal => deal.id === dealId);

    if (!deal) {
      throw new Error('Failed to fetch data')
    }

    return deal;
}

export default async function EditDealPage({
    params
} : {
    params: { slug: string}
}){
    const thinDeal = await getThinDeal(params.slug);
    return(
        <main className="container" style={{maxWidth: '950px'}}>
            <EditDeal/>
        </main>
    )
}
