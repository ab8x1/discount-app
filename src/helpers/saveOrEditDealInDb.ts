export default async function saveOrEdotDealInDB(data: any): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/saveOrUpdateDeal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          return false;
        }

        return true;

      } catch (error) {
        console.error('Error:', error);
        return false;
      }
}