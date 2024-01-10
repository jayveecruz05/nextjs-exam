'use client';

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from '@/navigation'

const Navigation = () => {
  const router = useRouter()
  const langTrans = useTranslations('lang')
  const pathName: any = usePathname()
  const defaultPath = pathName.slice(0, 3)
  return (
    <>
      <div className="navigation">
        <Link className={(/\/en$|\/cn$/.test(pathName)) ? 'active' : ''} href={defaultPath}>{langTrans('comments/title')}</Link>
        <span className="break">|</span>
        <Link className={(/\/domains$|\/domains$/.test(pathName)) ? 'active' : ''} href={`${defaultPath}/domains`}>{langTrans('domains/title')}</Link>
        <span className="break">|</span>
        <Link className={(/\/length$|\/length$/.test(pathName)) ? 'active' : ''} href={`${defaultPath}/length`}>{langTrans('length/title')}</Link>
        <span className="break">|</span>
        <Link className={(/\/posted$|\/posted$/.test(pathName)) ? 'active' : ''} href={`${defaultPath}/posted`}>{langTrans('posted/title')}</Link>
      </div>

      <div className="translation">
        <span className={`lang${(/^\/en/.test(pathName)) ? ' active' : ''}`} onClick={() => router.replace((pathName.slice(3) || '/'), { locale: 'en' })}>English</span>
        <span className="break">|</span>
        <span className={`lang${(/^\/cn/.test(pathName)) ? ' active' : ''}`} onClick={() => router.replace((pathName.slice(3) || '/'), { locale: 'cn' })}>Chinese</span>
      </div>
    </>
  )
}

export default Navigation