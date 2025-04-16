import { instanceAxios } from "./instanceAxios"

const rtkAxiosBaseQuery =
  (configs = {baseUrl: ''}) =>
  async ({url='', method = 'GET', ...restParams}) => {
    try {
      const {data: dataResult} = await instanceAxios.request({
        url: configs.baseUrl + url,
        method,
        ...restParams,
      })
      return {data: dataResult}
    } catch (axiosError:any) {
      const err = axiosError
      return {error: {status: err?.response?.status, data: err?.response?.data}}
    }
  }

export default rtkAxiosBaseQuery
