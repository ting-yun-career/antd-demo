import { Typography } from 'antd'
import numeral from 'numeral'
import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'

interface IMoneyCard {
  header: CardHeader
  children: React.ReactNode
}

export const MoneyCard: React.FC<IMoneyCard> = ({ children, header }: IMoneyCard) => {
  const { darkMode } = useContext(GlobalContext)
  const { title, subTitle, currency, trend } = header

  return (
    <div style={{ width: '100%', backgroundColor: darkMode ? '#1e1e2d' : 'white' }}>
      <div style={{ display: 'flex' }}>
        {currency && <span>{currency}</span>}
        <Typography.Title level={2} style={{ margin: '0' }}>
          {numeral(title).format('0,0')}
        </Typography.Title>
        {trend && (
          <span className={trend.amount === 0 ? 'same' : trend.amount > 0 ? 'up' : 'down'}>
            ^ {trend.amount} {trend.unit}
          </span>
        )}
      </div>
      <div>{subTitle}</div>
      <div style={{ marginTop: '3rem' }}>{children}</div>
    </div>
  )
}
