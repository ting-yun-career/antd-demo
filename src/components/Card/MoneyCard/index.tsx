import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'
import { CardHeader } from '../CardHeader'

interface IMoneyCard {
  header: CardHeader
  children: React.ReactNode
}

export const MoneyCard: React.FC<IMoneyCard> = ({ children, header }: IMoneyCard) => {
  const { darkMode } = useContext(GlobalContext)

  return (
    <div style={{ width: '100%', backgroundColor: darkMode ? '#1e1e2d' : 'white' }}>
      <CardHeader header={header} />
      <div style={{ marginTop: '3rem' }}>{children}</div>
    </div>
  )
}
