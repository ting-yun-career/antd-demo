import { theme } from 'antd'
import Color from 'color'
import numeral from 'numeral'
import { Trend } from '../../../microComponents/Trend'

interface ICardHeader {
  header: CardHeader
}

export const CardHeader: React.FC<ICardHeader> = ({ header }: ICardHeader) => {
  const { useToken } = theme
  const { token } = useToken()

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
        {trend && <Trend trend={trend} style={{ alignSelf: 'center' }} />}
      </div>
      {subTitle && <div>{subTitle}</div>}
    </div>
  )
}
