import { createContext, useContext } from 'react'
import { GetComments, GetComment } from './modules/comments'

const ApiContext = createContext({
  getComments: () => {},
  getComment: (id: string) => {}
})

export const ApiProvider = (props: any) => {
  const contextValue = {
    getComments: GetComments,
    getComment: GetComment
  }
  return (<ApiContext.Provider value={contextValue}>{props.children} </ApiContext.Provider>)
}

export const useApiContext = () => { return useContext(ApiContext); }

export default ApiContext