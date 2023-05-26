import numeral from 'numeral'

export const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`
