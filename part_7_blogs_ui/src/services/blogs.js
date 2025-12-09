import axios from 'axios'
import { tokenStore } from '../helpers/tokenStore'
const baseUrl = '/api/blogs'

const getAll = async (expand = false) => {
  const response = await axios.get(`${baseUrl}?expand=${expand}`)
  return response.data
}

const getOne = async (id, expand = false) => {
  const response = await axios.get(`${baseUrl}/${id}?expand=${expand}`)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: tokenStore.getToken() },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  console.log('Token: ', tokenStore.getToken())
  const config = {
    headers: { Authorization: tokenStore.getToken() },
  }
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    config,
  )
  return response.data
}

const remove = async (id) => {
  console.log('Token: ', tokenStore.token)
  const config = {
    headers: { Authorization: tokenStore.getToken() },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getOne, create, update, remove }
