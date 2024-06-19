import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify"

axios.defaults.baseURL = "http://localhost:5000/api/"

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data, status } = error.response
    switch (status) {
      case 400:
        toast.error(data.title)
        break
      case 401:
        toast.error(data.title)
        break
      case 500:
        toast.error(data.title)
        break
      default:
        break
    }
    return Promise.reject(error.response)
  },
)

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
}

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
}

const agent = {
  Catalog,
  TestErrors,
}

export default agent
