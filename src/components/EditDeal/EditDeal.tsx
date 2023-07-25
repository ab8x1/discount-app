'use client'
import { DetailsGrid } from "../DealDetails/DetailsStyles";
import EditDealInfo from "./EditDealInfo";
import DealDetailsProgress from "../DealDetails/DetailsProgress";

export default function EditDeal(){
    return(
        <DetailsGrid>
            <EditDealInfo/>
            <DealDetailsProgress
                amount={1000}
                dealDetails={{
                    discount: 1,
                    reedem: 1030,
                    earn: 30,
                    roi: 1,
                    date: {
                        start: 1,
                        end: 1718373949000
                    }
                }}
                step="wait"
            />
        </DetailsGrid>

    )
}
