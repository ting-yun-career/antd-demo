import { theme } from 'antd'
import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'
import { CardHeader } from '../CardHeader'

interface IMoneyCard {
  header: CardHeader
  children: React.ReactNode
}

export const MoneyCard: React.FC<IMoneyCard> = ({ children, header }: IMoneyCard) => {
  const { colors } = useContext(GlobalContext)

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: colors.cardBgColor,
      }}
    >
      <CardHeader header={header} />
      <div style={{ marginTop: '3rem' }}>{children}</div>
    </div>
  )
}
