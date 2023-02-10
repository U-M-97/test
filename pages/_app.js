import '../styles/globals.css'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import {store, persistor} from '../redux/store';
import { PersistGate } from "redux-persist/integration/react"
import "../style.css"
import { useRouter } from 'next/router';
import { useState, useEffect } from "react"

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
