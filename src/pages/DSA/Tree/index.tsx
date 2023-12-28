import { useContext, useState } from 'react'
import { Button, theme } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'
import cls from 'classnames'

type Val = number | 'N'

const Tree = () => {
  const { locale, darkMode } = useContext(GlobalContext)

  const [values, setValues] = useState<Val[]>(new Array(15).fill(0).map((_, i) => i))
  const [visiting, setVisiting] = useState(new Array(15).fill(false))
  const [visited, setVisited] = useState(new Array(15).fill(false))
  const [visible, setVisible] = useState(new Array(15).fill(true))

  const { useToken } = theme
  const { token } = useToken()

  function onValueChange(e: any, i: number) {
    const newValues = [...values]
    newValues[i] = parseInt(e.target.value)
    setValues(newValues)
  }

  function onNodeClick(e: any, i: number) {
    if (!visited[i]) {
      const newVisited = [...visited]
      newVisited[i] = true
      setVisited(newVisited)
    }

    const newVisiting = [...visiting]
    newVisiting[i] = !newVisiting[i]
    setVisiting(newVisiting)
  }

  function onVisibleToggle(i: number) {
    const newVisible = [...visible]
    newVisible[i] = !newVisible[i]

    if (i === 1) {
      newVisible[3] = newVisible[1]
      newVisible[4] = newVisible[1]
      newVisible[7] = newVisible[1]
      newVisible[8] = newVisible[1]
      newVisible[9] = newVisible[1]
      newVisible[10] = newVisible[1]
    }

    if (i === 2) {
      newVisible[5] = newVisible[2]
      newVisible[6] = newVisible[2]
      newVisible[11] = newVisible[2]
      newVisible[12] = newVisible[2]
      newVisible[13] = newVisible[2]
      newVisible[14] = newVisible[2]
    }

    if (i === 3) {
      newVisible[7] = newVisible[3]
      newVisible[8] = newVisible[3]
    }

    if (i === 4) {
      newVisible[9] = newVisible[4]
      newVisible[10] = newVisible[4]
    }

    if (i === 5) {
      newVisible[11] = newVisible[5]
      newVisible[12] = newVisible[5]
    }

    if (i === 6) {
      newVisible[13] = newVisible[6]
      newVisible[14] = newVisible[6]
    }

    setVisible(newVisible)
    console.log(newVisible)
  }

  function reset() {
    setVisiting(new Array(15).fill(false))
    setVisited(new Array(15).fill(false))
    setVisible(new Array(15).fill(true))
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '樹結構' : 'Tree Structure'}</PageTitle>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', padding: '0.5rem 0', gap: '2px' }}>
          {values.map((value, i) => (
            <input
              style={{
                color: token.colorText,
                border: `1px solid ${token.colorTextBase}`,
                outline: visiting[i] ? `2px solid red` : visited[i] ? `2px solid purple` : `none`,
                backgroundColor: `${token.colorBgContainer}`,
                flex: '1 1 auto',
                maxWidth: '3.5rem',
                textAlign: 'center',
                padding: '1rem 1rem',
              }}
              onChange={(e) => {
                onValueChange(e, i)
              }}
              value={values[i]}
            />
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', padding: '0.5rem 0', gap: '2px' }}>
          {visible.map((value, i) => (
            <div
              style={{
                color: token.colorText,
                border: `1px solid ${token.colorTextBase}`,
                backgroundColor: `${token.colorBgContainer}`,
                flex: '1 1 auto',
                maxWidth: '3.5rem',
                textAlign: 'center',
                padding: '1rem 1.5rem',
              }}
              onClick={() => {
                onVisibleToggle(i)
              }}
            >
              {visible[i] ? 'T' : 'F'}
            </div>
          ))}
        </div>
      </div>
      <div className={cls(['tf-tree', 'tf-gap-sm', { dark: darkMode }])} style={{ width: '100%' }}>
        <ul>
          <li>
            <span
              className={cls(['tf-nc', { visiting: visiting[0], visited: visited[0] }])}
              onClick={(e) => onNodeClick(e, 0)}
            >
              {values[0]}
            </span>
            <ul style={{ visibility: visible[1] || visible[2] ? 'visible' : 'hidden' }}>
              <li style={{ visibility: visible[1] ? 'visible' : 'hidden' }}>
                <span
                  className={cls(['tf-nc', { visiting: visiting[1], visited: visited[1] }])}
                  onClick={(e) => onNodeClick(e, 1)}
                >
                  {values[1]}
                </span>
                <ul style={{ visibility: visible[3] || visible[4] ? 'visible' : 'hidden' }}>
                  <li style={{ visibility: visible[3] ? 'visible' : 'hidden' }}>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[3], visited: visited[3] }])}
                      onClick={(e) => onNodeClick(e, 3)}
                    >
                      {values[3]}
                    </span>
                    <ul style={{ visibility: visible[7] || visible[8] ? 'visible' : 'hidden' }}>
                      <li style={{ visibility: visible[7] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[7], visited: visited[7] }])}
                          onClick={(e) => onNodeClick(e, 7)}
                        >
                          {values[7]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li style={{ visibility: visible[8] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[8], visited: visited[8] }])}
                          onClick={(e) => onNodeClick(e, 8)}
                        >
                          {values[8]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li style={{ visibility: visible[4] ? 'visible' : 'hidden' }}>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[4], visited: visited[4] }])}
                      onClick={(e) => onNodeClick(e, 4)}
                    >
                      {values[4]}
                    </span>
                    <ul style={{ visibility: visible[9] || visible[10] ? 'visible' : 'hidden' }}>
                      <li style={{ visibility: visible[9] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[9], visited: visited[9] }])}
                          onClick={(e) => onNodeClick(e, 9)}
                        >
                          {values[9]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li style={{ visibility: visible[10] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[10], visited: visited[10] }])}
                          onClick={(e) => onNodeClick(e, 10)}
                        >
                          {values[10]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li style={{ visibility: visible[2] ? 'visible' : 'hidden' }}>
                <span
                  className={cls(['tf-nc', { visiting: visiting[2], visited: visited[2] }])}
                  onClick={(e) => onNodeClick(e, 2)}
                >
                  {values[2]}
                </span>
                <ul style={{ visibility: visible[5] || visible[6] ? 'visible' : 'hidden' }}>
                  <li style={{ visibility: visible[5] ? 'visible' : 'hidden' }}>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[5], visited: visited[5] }])}
                      onClick={(e) => onNodeClick(e, 5)}
                    >
                      {values[5]}
                    </span>
                    <ul style={{ visibility: visible[11] || visible[12] ? 'visible' : 'hidden' }}>
                      <li style={{ visibility: visible[11] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[11], visited: visited[11] }])}
                          onClick={(e) => onNodeClick(e, 11)}
                        >
                          {values[11]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li style={{ visibility: visible[12] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[12], visited: visited[12] }])}
                          onClick={(e) => onNodeClick(e, 12)}
                        >
                          {values[12]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li style={{ visibility: visible[6] ? 'visible' : 'hidden' }}>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[6], visited: visited[6] }])}
                      onClick={(e) => onNodeClick(e, 6)}
                    >
                      {values[6]}
                    </span>
                    <ul style={{ visibility: visible[13] || visible[14] ? 'visible' : 'hidden' }}>
                      <li style={{ visibility: visible[13] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[13], visited: visited[13] }])}
                          onClick={(e) => onNodeClick(e, 13)}
                        >
                          {values[13]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                      <li style={{ visibility: visible[14] ? 'visible' : 'hidden' }}>
                        <span
                          className={cls(['tf-nc', { visiting: visiting[14], visited: visited[14] }])}
                          onClick={(e) => onNodeClick(e, 14)}
                        >
                          {values[14]}
                        </span>
                        <ul>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                          <li>
                            <span className="tf-nc tf-null">❌</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="primary"
          onClick={() => {
            reset()
          }}
        >
          Reset
        </Button>
      </div>
    </>
  )
}

export default Tree
