export default async function saveOrEdotDealInDB(data: any) {
    return new Promise<boolean>(async(res) => {
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
              res(false);
            }

            res(true);

          } catch (error) {
            console.error('Error:', error);
            res(false);
          }
    })
}