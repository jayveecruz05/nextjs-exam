'use client';

// import styles from './posted.module.scss';
import { useTranslations } from 'next-intl';
import { useApiContext } from '@/assets/script/api/context/global'
import Graph from './zoomable-icicle-graph';

const Posted = () => {
  const langTrans = useTranslations('lang');
  const { getComments } = useApiContext()
  // Queries
  const response: any = getComments()
  return (
    (response?.isLoading) ? <p>{langTrans('data/loading')}</p> :
    (response?.isError && <p>{langTrans('data/error')}</p>) ||
    <>
      <h3 className="title">{langTrans('title/graph/zoomable-icicle')}</h3>
      <Graph data={response?.data?.data}/>
    </>
  )
}

export default Posted;