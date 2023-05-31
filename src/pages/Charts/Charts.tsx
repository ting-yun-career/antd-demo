import { useContext } from 'react'
import { GlobalContext } from '../../global/globalProvider'

// 准备数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]

const Charts = () => {
  const { darkMode, setDarkMode, locale, changeLocale } = useContext(GlobalContext)

  // useEffect(() => {
  // }, [darkMode])

  return (
    <>
      <div>Chart</div>
    </>
  )
}

export default Charts
