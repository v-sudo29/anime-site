export default function filterTitle(title) {
  let thisTitle = title
  const newTitle = thisTitle.replace(/\./g, '').replace(/;/g, ' ').replace(/\[/g, '').replace(/\]/g, '')
  
  return newTitle
}