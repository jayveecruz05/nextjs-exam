'use client';

// import styles from './posted.module.scss';
import { useTranslations } from 'next-intl';
import { useGetComments } from '@/assets/script/api/state/comments';
import BubbleGraph from './bubble-graph';
import ZoomableIcicleGraph from './zoomable-icicle-graph';

const Posted = () => {
  const langTrans = useTranslations('lang');
  // Queries
  const response: any = useGetComments()
  return (
    (response?.isLoading) ? <p>{langTrans('data/loading')}</p> :
    (response?.isError && <p>{langTrans('data/error')}</p>) ||
    <>
      <h3 className="title">{langTrans('title/graph/bubble')}</h3>
      <BubbleGraph data={response?.data?.data}/>
      <br/><br/>
      <h3 className="title">{langTrans('title/graph/zoomable-icicle')}</h3>
      <ZoomableIcicleGraph data={response?.data?.data}/>
    </>
  )
}

export default Posted;