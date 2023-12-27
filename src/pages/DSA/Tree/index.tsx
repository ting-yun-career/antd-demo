import { useContext, useState } from 'react'
import { theme } from 'antd'
import { PageTitle } from '../../../components/PageTitle/PageTitle'
import { GlobalContext } from '../../../global/globalProvider'
import cls from 'classnames'

const Tree = () => {
  const { locale, darkMode } = useContext(GlobalContext)

  const [values, setValues] = useState(new Array(15).fill(0).map((_, i) => i))
  const [visiting, setVisiting] = useState(new Array(15).fill(false))
  const [visited, setVisited] = useState(new Array(15).fill(false))

  const { useToken } = theme
  const { token } = useToken()

  function onValueChange(e: any, i: number) {
    const newValues = [...values]
    newValues[i] = parseInt(e.target.value)
    console.log(newValues)
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

  function reset() {
    setVisiting(new Array(15).fill(false))
    setVisited(new Array(15).fill(false))
  }

  return (
    <>
      <PageTitle>{locale === 'zh_CN' ? '樹結構' : 'Tree Structure'}</PageTitle>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', padding: '0.5rem 0' }}>
          {values.map((value, i) => (
            <input
              style={{
                border: `1px solid ${token.colorTextBase}`,
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
      <div className={cls(['tf-tree', 'tf-gap-sm', { 'tf-dark': darkMode }])} style={{ width: '100%' }}>
        <ul>
          <li>
            <span
              className={cls(['tf-nc', { visiting: visiting[0], visited: visited[0] }])}
              onClick={(e) => onNodeClick(e, 0)}
            >
              {values[0]}
            </span>
            <ul>
              <li>
                <span
                  className={cls(['tf-nc', { visiting: visiting[1], visited: visited[1] }])}
                  onClick={(e) => onNodeClick(e, 1)}
                >
                  {values[1]}
                </span>
                <ul>
                  <li>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[3], visited: visited[3] }])}
                      onClick={(e) => onNodeClick(e, 3)}
                    >
                      {values[3]}
                    </span>
                    <ul>
                      <li>
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
                      <li>
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
                  <li>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[4], visited: visited[4] }])}
                      onClick={(e) => onNodeClick(e, 4)}
                    >
                      {values[4]}
                    </span>
                    <ul>
                      <li>
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
                      <li>
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
              <li>
                <span
                  className={cls(['tf-nc', { visiting: visiting[2], visited: visited[2] }])}
                  onClick={(e) => onNodeClick(e, 2)}
                >
                  {values[2]}
                </span>
                <ul>
                  <li>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[5], visited: visited[5] }])}
                      onClick={(e) => onNodeClick(e, 5)}
                    >
                      {values[5]}
                    </span>
                    <ul>
                      <li>
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
                      <li>
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
                  <li>
                    <span
                      className={cls(['tf-nc', { visiting: visiting[6], visited: visited[6] }])}
                      onClick={(e) => onNodeClick(e, 6)}
                    >
                      {values[6]}
                    </span>
                    <ul>
                      <li>
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
                      <li>
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
        <button
          className="primary"
          onClick={() => {
            reset()
          }}
        >
          Reset
        </button>
      </div>
    </>
  )
}

export default Tree
