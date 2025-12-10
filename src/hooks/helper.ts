import { AxiosError } from 'axios'

export const errorHandler = (error: unknown) => {
  console.log(error)
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data.error)
  }
  throw new Error('Something went wrong')
}
