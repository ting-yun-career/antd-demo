import numeral from 'numeral'

export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`
