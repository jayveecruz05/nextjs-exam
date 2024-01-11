'use client';

import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiProvider } from '@/assets/script/api/context/global'
import { ReactNode } from 'react';
import Navigation from './navigation';

interface LocaleLayoutProps {
  children: ReactNode
  params: { locale: string }
}

const Layout = async ({ children, params: { locale } }: LocaleLayoutProps) => {
  let messages
  try {
    messages = (await import(`@/locale/${locale}.json`)).default
  } catch (error) {
    // console.error('Failed to load messages:', error);
    notFound()
  }

  // Create a client
  const mainQueryClient = new QueryClient()

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={'Asia/Singapore'}>
      <QueryClientProvider client={mainQueryClient}>
        <ApiProvider>
          <main className="main">
            <Navigation/>
            {children}
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </ApiProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  )
}

const ClientLayout = (props: LocaleLayoutProps) => {
  return (<Layout { ...props }>{props.children}</Layout>)
}

export default ClientLayout