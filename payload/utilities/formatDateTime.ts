export const formatDateTime = (timestamp: string): string => {
  const date = timestamp ? new Date(timestamp) : new Date();

  const month = date.toLocaleString('default', { month: 'long' }).toUpperCase();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
