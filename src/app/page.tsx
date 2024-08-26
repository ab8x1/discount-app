import ThinDeals from "@/components/ThinDeal";
import styles from '@/components/ThinDeal/thinDealStyles.module.css'
import { exampleOffers } from "@/consts/exampleDeals";

async function getOffers() {
  const res = exampleOffers;

  if (!res) {
    throw new Error('Failed to fetch data')
  }

  return res;
}

export default async function Home() { console.log('Index Page');
  const thinDeals = await getOffers();
  return (
    <main className="container">
      <div id={styles.dealsGrid}>
        <ThinDeals thinDeals={thinDeals}/>
      </div>
    </main>
  )
}
