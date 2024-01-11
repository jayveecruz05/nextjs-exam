import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation";
import { Link, usePathname, useRouter } from '@/navigation'

const Navigation = () => {
  const locale = useLocale()
  const pathName = usePathname()
  const params: { id: string } = useParams()
  const router = useRouter()
  const langTrans = useTranslations('lang')
  return (
    <>
      <div className="navigation">
        <Link className={(/^\/$/.test(pathName)) ? 'active' : ''} href="/">{langTrans('comments/title')}</Link>
        <span className="break">|</span>
        <Link className={(/^\/domains$/.test(pathName)) ? 'active' : ''} href="/domains">{langTrans('domains/title')}</Link>
        <span className="break">|</span>
        <Link className={(/^\/length$/.test(pathName)) ? 'active' : ''} href="/length">{langTrans('length/title')}</Link>
        <span className="break">|</span>
        <Link className={(/^\/posted$/.test(pathName)) ? 'active' : ''} href="/posted">{langTrans('posted/title')}</Link>
      </div>

      <div className="translation">
        <span className={`lang${(/^en$/.test(locale)) ? ' active' : ''}`} onClick={() => router.replace({ pathname: pathName, params }, { locale: 'en' })}>English</span>
        <span className="break">|</span>
        <span className={`lang${(/^cn$/.test(locale)) ? ' active' : ''}`} onClick={() => router.replace({ pathname: pathName, params }, { locale: 'cn' })}>Chinese</span>
      </div>
    </>
  )
}

export default Navigation