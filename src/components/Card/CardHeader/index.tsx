import { theme } from 'antd'
import Color from 'color'
import numeral from 'numeral'
import { useContext } from 'react'
import { GlobalContext } from '../../../global/globalProvider'

interface ICardHeader {
  header: CardHeader
}

export const CardHeader: React.FC<ICardHeader> = ({ header }: ICardHeader) => {
  const { useToken } = theme
  const { token } = useToken()

  const { darkMode } = useContext(GlobalContext)

  const { title, subTitle, currency, trend } = header

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex' }}>
        {currency && (
          <span
            style={{
              color: Color(token.colorText).lighten(3).hex(),
              fontSize: '1.2em',
              lineHeight: '25px',
            }}
          >
            {currency}
          </span>
        )}
        <div style={{ fontSize: '30px', margin: '0 10px 0 3px' }}>
          {typeof title === 'number' ? numeral(title).format('0,0') : title}
        </div>
        {trend && (
          <span
            style={{
              backgroundColor:
                trend.amount === 0
                  ? 'gray'
                  : trend.amount > 0
                  ? darkMode
                    ? Color(token.colorSuccess).darken(0.7).hex()
                    : Color(token.colorSuccess).lighten(0.7).hex()
                  : darkMode
                  ? Color(token.colorError).darken(0.8).hex()
                  : Color(token.colorError).lighten(0.6).hex(),
              height: '20px',
              alignSelf: 'center',
              color: darkMode
                ? Color(token.colorSuccess).lighten(0.1).hex()
                : Color(token.colorSuccess).lighten(0.1).hex(),
            }}
          >
            ^ {trend.amount} {trend.unit}
          </span>
        )}
      </div>
      {subTitle && <div>{subTitle}</div>}
    </div>
  )
}
