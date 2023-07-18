import ThinDeal from "@/components/Deals/ThinDeal";
import styles from '@/components/Deals/thinDealStyles.module.css'
import { exampleThinDeals } from "@/consts/exampleDeals";

async function getThinDeals() {
  const res = exampleThinDeals;

  if (!res) {
    throw new Error('Failed to fetch data')
  }

  return res;
}

export default async function Home() { console.log('Index Page');
  const thinDeals = await getThinDeals();
  return (
    <main className="container">
      <h1>Explore Deals</h1>
      <div id={styles.dealsGrid}>
        {
          thinDeals.map(thinDeal =>
            <ThinDeal key={thinDeal.id} {...thinDeal}/>
          )
        }
      </div>
    </main>
  )
}
