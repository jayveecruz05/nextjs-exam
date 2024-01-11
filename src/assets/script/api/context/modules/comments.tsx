import { useQuery } from 'react-query'
import { getComments, getComment } from '../../modules/comments'

export const GetComments = () => {
  // Queries
  return useQuery({ queryKey: ['comments'], queryFn: getComments })
}

export const GetComment = (id: string) => {
  // Queries
  return useQuery({ queryKey: ['comment'], queryFn: () => getComment(id), staleTime: Infinity, cacheTime: 0 })
}