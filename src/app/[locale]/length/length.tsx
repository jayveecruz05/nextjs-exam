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

  // Get the shortest, longest and average length
  const commentLength = useMemo(() => (response?.data?.data?.reduce((previousData: any, currentData: any, currentIndex: number) => {
    const shortest = ((String(currentData.body).length < previousData?.shortest) ? (String(currentData.body).length) : previousData?.shortest)
    const longest = ((String(currentData.body).length > previousData?.longest) ? (String(currentData.body).length) : previousData?.longest)
    return {
      shortest,
      longest,
      average: ((shortest + longest) / 2),
      // average: Math.round((previousData?.average + currentData.body.length) / ((currentIndex === (response?.data?.data.length - 1)) ? response?.data?.data.length : 1))
    }
  }, { shortest: String(response?.data?.data?.[0]?.body).length, longest: String(response?.data?.data?.[0]?.body).length, average: 0 })), [response?.data?.data])

  // Find the shortest, longest body length
  const comment = useMemo(() => response?.data?.data?.reduce((previousData: any, currentData: any) => ({
    shortest: ((String(currentData.body).length <= commentLength?.shortest) ? { ...currentData, length: (String(currentData.body).length), type: 'Shortest', } : previousData?.shortest),
    longest: ((String(currentData.body).length >= commentLength?.longest) ? { ...currentData, length: (String(currentData.body).length), type: 'Longest', } : previousData?.longest)
  }), { shortest: response?.data?.data?.[0], longest: response?.data?.data?.[0] }), [response?.data?.data, commentLength]);
  
  // Find the object with the closest body length to the average body length
  const averageComment = useMemo(() => (response?.data?.data?.reduce((previousData: any, currentData: any) => {
      const itemLengthDifference = Math.abs(currentData.body.length - commentLength?.average);
      const closestLengthDifference = Math.abs(previousData.body.length - commentLength?.average);
      return itemLengthDifference < closestLengthDifference ? { ...currentData, length: (String(currentData.body).length), type: 'Average', } : previousData;
    }, response?.data?.data?.[0])
  ), [response?.data?.data, commentLength])
  
  return (
    (response?.isLoading) ? <p>{langTrans('data/loading')}</p> :
    (response?.isError && <p>{langTrans('data/error')}</p>) ||
    <>
      <h3 className="title">{langTrans('title/graph/bar')}</h3>
      <BarGraph data={[ { type: 'shortest', length: commentLength?.shortest }, { type: 'average', length: commentLength?.average }, { type: 'longest', length: commentLength?.longest } ]}/>
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