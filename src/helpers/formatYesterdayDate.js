export default function formatYesterdayDate() {
  const currentDate = new Date()
  const stringDate = currentDate.toDateString()

  const month = stringDate.split(' ').splice(1)[0]
  const day = (parseInt(stringDate.split(' ').splice(1)[1]) - 1).toString() + ',' 
  const year = stringDate.split(' ').splice(1)[2]
  const formattedDate = month + ' ' + day + ' ' + year

  return formattedDate
}