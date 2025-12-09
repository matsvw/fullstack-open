import axios from 'axios'
import tokenStore from '../helpers/tokenStore'
const baseUrl = '/api/blogs'

const getAll = async (expand = false) => {
  const response = await axios.get(`${baseUrl}?expand=${expand}`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: tokenStore.token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const config = {
    headers: { Authorization: tokenStore.token },
  }
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config,
  )
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: tokenStore.token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove }
