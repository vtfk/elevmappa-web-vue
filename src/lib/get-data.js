import store from '@/store'
import axios from 'axios'
import config from '../../config'
const https = require('https')

const instance = axios.create({
  baseURL: config.apiUrl,
  timeout: Number(config.apiTimeout) * 1000,
  httpsAgent: new https.Agent({ keepAlive: true })
})

const getData = (path, payload) => {
  const options = {
    headers: {
      Authorization: `Bearer ${store.state.oidcStore.id_token}`
    }
  }

  return payload
    ? instance.post(path, payload, options)
    : instance.get(path, options)
}

export default getData
