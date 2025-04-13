import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3030'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

const instance = axios.create()
export default instance;