export const readData = async () => {
  const response = await fetch('/data.csv')
  const text = await response.text()

  const rows = text
    .split('\n')
    .map((row) => row.split(',').slice(2, 4))
    .slice(1)
    .map(([dateStr, value]) => [new Date(dateStr ?? ''), Number(value)] as [Date, number])

  return rows
}
