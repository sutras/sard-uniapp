import { useState, useEffect, useRef } from 'react'
import Clipboard from 'clipboard'
import Collapse from '../collapse'

export interface CodeProps {
  code?: string
}

export function Code(props: CodeProps) {
  const { code } = props

  const [visible, setVisible] = useState(false)

  const copyRef = useRef<HTMLDivElement>()

  const codeRef = useRef(null)

  const timer = useRef(0)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    let clipboard: Clipboard

    if (copyRef.current) {
      clipboard = new Clipboard(copyRef.current, {
        text: () => codeRef.current?.textContent,
      })
      clipboard.on('success', () => {
        setCopySuccess(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
          setCopySuccess(false)
        }, 1000) as unknown as number
      })
    }
    return () => clipboard?.destroy?.()
  }, [])

  return (
    <div className="doc-code">
      <div className="doc-code-header">
        <div className="doc-code-tool">
          <div className="doc-code-tool-item" title="复制" ref={copyRef}>
            <span className="doc-code-tool-icon bi-files"></span>
            {copySuccess && (
              <div className="doc-code-copy-success">复制成功</div>
            )}
          </div>
          <div
            className="doc-code-tool-item"
            title={visible ? '收起代码' : '显示代码'}
            onClick={() => setVisible(!visible)}
          >
            <span className="doc-code-tool-icon bi-code-square"></span>
          </div>
        </div>
      </div>
      <Collapse visible={visible}>
        <div className="doc-code-body">
          <pre className="language-jsx">
            <code
              className="language-jsx"
              ref={codeRef}
              dangerouslySetInnerHTML={{
                __html: code,
              }}
            ></code>
          </pre>
        </div>
      </Collapse>
    </div>
  )
}

export default Code
