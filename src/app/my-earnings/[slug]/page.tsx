import TableData from "@/components/Earnings/TableData";

export default function MyEarningsTableSlug({
    params
} : {
    params: { slug: string}
}) {
  return (
    <TableData page={Number(params.slug)}/>
  )
}