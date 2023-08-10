import EditDeal from "@/components/EditDeal/EditDeal";

export default async function EditDealPage({
    params
} : {
    params: { slug: string}
}){
    return(
        <main className="container" style={{maxWidth: '950px'}}>
            <EditDeal id={params.slug}/>
        </main>
    )
}
