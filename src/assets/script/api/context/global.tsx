import { createContext, useContext } from 'react'
import { useQuery } from 'react-query'
import { getComments, getComment } from '../modules/comments'

const ApiContext = createContext({
  useComments: () => ({
    getComments: () => {},
    getComment: (id: string) => {}
  })
})

// Comments API
const GetComments = () => {
  // Queries
  return useQuery({ queryKey: ['comments'], queryFn: getComments })
}

const GetComment = (id: string) => {
  // Queries
  return useQuery({ queryKey: ['comment'], queryFn: () => getComment(id), staleTime: Infinity, cacheTime: 0 })
}
// Comments API

export const ApiProvider = (props: any) => {
  const contextValue = {
    useComments: () => ({
      getComments: GetComments,
      getComment: GetComment
    })
  }
  return (<ApiContext.Provider value={contextValue}>{props.children} </ApiContext.Provider>)
}

export const useApiContext = () => { return useContext(ApiContext); }

export default ApiContext