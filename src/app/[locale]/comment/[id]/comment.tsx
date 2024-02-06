'use client';

import styles from './comment.module.scss';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useParams } from "next/navigation";
import { useGetComment } from '@/assets/script/api/state/comments';

const Values = (langTrans: any, object: any) => {
  const list: any[] = []
  for (const property in object) {
    list.push(
      <p key={property} className={styles.property}>
        <span className={styles.name}>{langTrans(`data-name/${property}`)}:</span>
        <span aria-label={property} className={styles.value}>{object[property]}</span>
      </p>
    );
  }
  return list;
}

const Comment = () => {
  const langTrans = useTranslations('lang');
  const params = useParams<{ id: string }>()
  // Queries
  const response: any = useGetComment(params.id)
  return (
    <>
      <h1 className="title">{langTrans('comment/title')} {params.id}</h1>
      <Link aria-label="back-button" className={styles['back-button']} href="/">&#8678; {langTrans('button/back')}</Link>
      {(response?.isLoading) ? <p>{langTrans('data/loading')}</p> : (response?.isError && <p>{langTrans('data/error')}</p>) || (<div aria-label="properties-holder" className={styles['properties-holder']}>{Values(langTrans, response?.data?.data)}</div>)}
    </>
  )
}

export default Comment;