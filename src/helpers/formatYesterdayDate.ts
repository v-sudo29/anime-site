export default function formatYesterdayDate(): string {
  let today = new Date()
  let yest = new Date(today.setDate(today.getDate() - 1))

  let formattedDate = yest.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'})

  return formattedDate
}