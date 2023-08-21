'use client'
import TableData from '@/components/Earnings/TableData/TableData';

export default function RootLayout({
    searchParams
  } : {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {

  const { page } = searchParams;

  return(
    <TableData currentPage={Number(page)}/>
  )
}