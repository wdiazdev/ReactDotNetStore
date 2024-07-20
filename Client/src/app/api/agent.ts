import axios, { AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { router } from "../route/Routes"
import { PaginatedResponse } from "../../models/pagination"
import { store } from "../store/configureStore"

axios.defaults.baseURL = "http://localhost:5000/api/"

// Includes credentials in cross-origin requests by default.
// This is useful for making authenticated API requests to a
// server that is different from the one serving your web application.
axios.defaults.withCredentials = true

const responseBody = (response: AxiosResponse) => response.data

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axios.interceptors.response.use(
  async function (response) {
    const pagination = response.headers["pagination"]
    if (pagination) {
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination))
      return response
    }
    return response
  },
  function (error) {
    if (error.response) {
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
    } else {
      // Handle cases where error.response is undefined
      toast.error("An unexpected error occurred")
      return Promise.reject(error)
    }
  },
)

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
  list: (params: URLSearchParams) => requests.get(`products`, params),
  details: (id: number) => requests.get(`products/${id}`),
  filters: () => requests.get("products/filters"),
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

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
}

const agent = {
  Catalog,
  TestErrors,
  Basket,
  Account,
}

export default agent
