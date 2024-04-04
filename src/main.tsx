import React from 'react'
import ReactDOM from 'react-dom/client'
import ColorPicker from './web/ColorPicker'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorPicker/>
  </React.StrictMode>,
)
