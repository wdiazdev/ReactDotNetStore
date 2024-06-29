import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { router } from "../route/Routes"

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

axios.defaults.baseURL = "http://localhost:5000/api/"

// Includes credentials in cross-origin requests by default.
// This is useful for making authenticated API requests to a
// server that is different from the one serving your web application.
axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.response.use(
  async function (response) {
    await sleep()
    return response
  },
  function (error) {
    const { data, status } = error.response
    switch (status) {
      case 400:
        if (data && data.errors) {
          const modelStateErrors: string[] = []
          for (const key in data.errors) {
            modelStateErrors.push(data.errors[key])
          }
          throw modelStateErrors.flat()
        }
        toast.error(data.title)
        break
      case 401:
        toast.error(data.title)
        break
      case 500:
        router.navigate("/server-error", { state: { error: data } })
        break
      case 404:
        router.navigate("/not-found")
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

const Basket = {
  getBasket: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
  Catalog,
  TestErrors,
  Basket,
}

export default agent
