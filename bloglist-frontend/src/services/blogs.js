import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject,
    config
  )
  return response.data
}

const remove = async (removeObjectID) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${removeObjectID}`, config)
  return response.data
}

const comment = async (commentObject, blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObject, config)
  return response.data
}

export default { getAll, create, update, remove, comment, setToken }
