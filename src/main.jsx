import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalContextProvider } from './context/useContext.jsx'
import { Provider } from 'react-redux'
import store from './reduxStore/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GlobalContextProvider>
    <Provider store={store}>
      <App />
    </Provider> 
     {/* <App/> */}
  </GlobalContextProvider>
  </React.StrictMode>,
)
