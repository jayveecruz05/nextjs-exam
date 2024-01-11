'use client';

import styles from './length.module.scss';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from 'react'
import { useApiContext } from '@/assets/script/api/context/global'
import BarGraph from './bar-graph';

const Values = (langTrans: any, object: any) => {
  const list: any[] = []
  for (const property in object) {
    list.push(
      <p key={property} className={styles.property}>
        <span className={styles.name}>{langTrans(`data-name/${property}`)}:</span>
        <span className={styles.value}>{object[property]}</span>
      </p>
    );
  }
  return list;
}

const Length = () => {
  const langTrans = useTranslations('lang');
  const { getComments } = useApiContext()
  // Queries
  const response: any = getComments()

  // Find the shortest and longest body
  const comment = useMemo(() => response?.data?.data?.reduce((previousData: any, currentData: any) => ({
    shortest: ((String(currentData.body).length < String(previousData?.shortest?.body).length) ? { ...currentData, length: (String(currentData.body).length), type: 'Shortest', } : previousData?.shortest),
    longest: ((String(currentData.body).length > String(previousData?.longest?.body).length) ? { ...currentData, length: (String(currentData.body).length), type: 'Longest', } : previousData?.longest),
  }), { shortest: response?.data?.data?.[0], longest: response?.data?.data?.[0] }), [response?.data?.data]);
  
  // Find the object with the closest length to the average
  const averageComment = useMemo(() => {
    return response?.data?.data?.reduce((closest: any, item: any) => {
      const itemLengthDifference = Math.abs(item.body.length - (comment.longest.length / 2));
      const closestLengthDifference = Math.abs(closest.body.length - (comment.longest.length / 2));
      return itemLengthDifference < closestLengthDifference ? { ...item, length: (String(item.body).length), type: 'Average', } : closest;
    }, response?.data?.data?.[0])
  }, [response?.data?.data, comment])
  
  return (
    (response?.isLoading) ? <p>{langTrans('data/loading')}</p> :
    (response?.isError && <p>{langTrans('data/error')}</p>) ||
    <>
      <h3 className="title">{langTrans('title/graph/bar')}</h3>
      <BarGraph data={[ comment?.shortest, averageComment, comment?.longest ]}/>
      <h3 className="title">{langTrans('title/comment/shortest')}</h3>
      <div className={styles['properties-holder']}>{Values(langTrans, comment?.shortest)}</div>
      <h3 className="title">{langTrans('title/comment/average')}</h3>
      <div className={styles['properties-holder']}>{Values(langTrans, averageComment)}</div>
      <h3 className="title">{langTrans('title/comment/longest')}</h3>
      <div className={styles['properties-holder']}>{Values(langTrans, comment?.longest)}</div>
    </>
  )
}

export default Length;