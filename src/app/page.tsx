import Deal from "@/components/Deals/Deal";
import styles from '@/components/Deals/dealStyles.module.css'
import { exampleThinDeals } from "@/consts/exampleDeals";

async function getDThinDeals() {
  const res = exampleThinDeals;

  if (!res) {
    throw new Error('Failed to fetch data')
  }

  return res;
}

export default async function Home() { console.log('Index Page');
  const thinDeals = await getDThinDeals();
  return (
    <main className="container">
      <h1>Explore Deals</h1>
      <div id={styles.dealsGrid}>
        {
          thinDeals.map(thinDeal =>
            <Deal key={thinDeal.id} {...thinDeal}/>
          )
        }
      </div>
    </main>
  )
}
