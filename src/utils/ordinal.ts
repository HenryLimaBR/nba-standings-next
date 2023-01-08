export function ordinalNumber(n: number) {
  const letters = ['st', 'nd', 'rd', 'th']
  const u = n % 10
  let ordinal = 'th'
  
  if (n >= 11 && n <= 13) ordinal = 'th'
  else if (n === 312 || n === 411) ordinal = 'th'
  else if (u >= 1 && u <= 4) ordinal = letters[u - 1]

  return `${n}${ordinal}`
}