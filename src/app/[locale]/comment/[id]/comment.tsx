'use client';

import styles from './comment.module.scss';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useParams } from "next/navigation";
import { useApiContext } from '@/assets/script/api/context/global'

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

const Comment = () => {
  const langTrans = useTranslations('lang');
  const params = useParams<{ id: string }>()
  const { getComment } = useApiContext()
  // Queries
  const response: any = getComment(params.id)
  return (
    <>
      <h1 className="title">{langTrans('comment/title')} {params.id}</h1>
      <Link className={styles['back-button']} href="/">&#8678; {langTrans('button/back')}</Link>
      {(response?.isLoading) ? <p>{langTrans('data/loading')}</p> : (response?.isError && <p>{langTrans('data/error')}</p>) || (<div className={styles['properties-holder']}>{Values(langTrans, response?.data?.data)}</div>)}
    </>
  )
}

export default Comment;