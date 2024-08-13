import EditDeal from "@/components/EditDeal/EditDeal";
import { DealType } from "@/types/deal";

async function getDeal(id: string): Promise<DealType | null>{
    const queryString = new URLSearchParams({dealId: id}).toString();
    const userDealRes = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/getUserDeals?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: "no-store"
    });
    const userDeals: DealType[] = await userDealRes.json();
    const [userDeal] = userDeals
    return userDeal || null;
}

export default async function EditDealPage({
    params
} : {
    params: { slug: string}
}){
    const dealData = await getDeal(params.slug);
    return(
        <main className="container" style={{maxWidth: '950px'}}>
            <EditDeal deal={dealData}/>
        </main>
    )
}
