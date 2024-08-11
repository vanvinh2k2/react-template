import AxiosClient from '../../utils/axios'

const LOGIN_ENDPOINT = '/signin'

export const loginService = data => AxiosClient.post(LOGIN_ENDPOINT, data)