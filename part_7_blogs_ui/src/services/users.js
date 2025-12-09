import axios from 'axios'
import tokenStore from '../helpers/tokenStore'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAllExpanded = async () => {
  const response = await axios.get(`${baseUrl}?expand=true`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: tokenStore.token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, getAllExpanded, create }
