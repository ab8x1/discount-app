import ThinDeal from "@/components/ThinDeal";
import styles from '@/components/ThinDeal/thinDealStyles.module.css'
import { exampleOffers } from "@/consts/exampleDeals";

async function getThinDeals() {
  const res = exampleOffers;

  if (!res) {
    throw new Error('Failed to fetch data')
  }

  return res;
}

export default async function Home() { console.log('Index Page');
  const thinDeals = await getThinDeals();
  return (
    <main className="container">
      <div id={styles.dealsGrid}>
        {
          thinDeals.map(thinDeal =>
            <ThinDeal key={thinDeal.id} dealInfo={thinDeal}/>
          )
        }
      </div>
    </main>
  )
}
