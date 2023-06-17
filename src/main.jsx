import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './store/services/store'
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  </>,
)
