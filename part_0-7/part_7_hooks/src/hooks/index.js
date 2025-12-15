import { useState, useEffect} from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {

  const [resources, setResources] = useState([])

    useEffect(() => {
      if (!baseUrl) {
        setResources(null)
        return
      }
  
      const request = axios.get(baseUrl)
      request.then(response => {
        console.log('Retrieved resources: ', response)
        setResources(response.data)
      })
    
    }, [baseUrl])


  const create = (resource) => {
    const request = axios.post(baseUrl, resource)
    request.then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const update = (resource) => {
    const request = axios.put(`${baseUrl}/${resource.id}`, resource)
    request.then(response => {
      setResources(resources.map( r => r.id===response.data.id ? response.data : r))
    })
  }

  const service = {
    create, update
  }

  return [
    resources, service
  ]

}