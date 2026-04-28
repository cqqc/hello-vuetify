import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"

const service = axios.create({ timeout: 1000 * 90 })

// const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 2000 });
const mock = new AxiosMockAdapter(service, { delayResponse: 1000 })
mock.onGet("/users").reply(200, {
  users: [ { id: 1, name: "John Smith" } ]
})

service.interceptors.request.use(
  async (config) => {

    return config
  },
  (error) => {

    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    console.log('response', response)
    return response
  },
  (error) => {

    return Promise.reject(error)
  }
)

export default service
