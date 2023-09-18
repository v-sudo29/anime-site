const getTodaysDate = (): string => {
  const date = new Date();

  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export default getTodaysDate