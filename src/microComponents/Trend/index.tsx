import { theme } from 'antd'
import Color from 'color'
import { useContext, useMemo } from 'react'
import { GlobalContext } from '../../global/globalProvider'

interface ITrend {
  trend: Trend
  style?: React.CSSProperties
}

export const Trend: React.FC<ITrend> = ({ trend, style }: ITrend) => {
  const { useToken } = theme
  const { token } = useToken()

  const { darkMode } = useContext(GlobalContext)

  const { amount, unit } = trend

  const bgColor = useMemo(() => {
    if (amount === 0) {
      return 'gray'
    }
    if (amount > 0) {
      return darkMode ? Color(token.colorSuccess).darken(0.7).hex() : Color(token.colorSuccess).lighten(0.7).hex()
    } else {
      return darkMode ? Color(token.colorError).darken(0.8).hex() : Color(token.colorError).lighten(0.6).hex()
    }
  }, [trend, darkMode])

  const ftColor = useMemo(() => {
    if (amount === 0) {
      return 'gray'
    }

    if (amount > 0) {
      return darkMode ? Color(token.colorSuccess).lighten(0.1).hex() : Color(token.colorSuccess).darken(0.1).hex()
    } else {
      return darkMode ? Color(token.colorError).lighten(0.1).hex() : Color(token.colorError).darken(0.1).hex()
    }
  }, [trend, darkMode])

  const tick = useMemo(() => {
    if (amount === 0) {
      return null
    }

    const tickStyles = {
      fontSize: '13px',
    }

    if (amount > 0) {
      return (
        <span className="material-symbols-outlined" style={{ ...tickStyles }}>
          arrow_upward
        </span>
      )
    } else {
      return (
        <span className="material-symbols-outlined" style={{ ...tickStyles }}>
          arrow_downward
        </span>
      )
    }
  }, [trend])

  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: ftColor,
        display: 'flex',
        borderRadius: '3px',
        padding: '1px',
        fontSize: '11px',
        ...style,
      }}
    >
      {tick}
      {amount} {unit}
    </span>
  )
}
