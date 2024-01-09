'use client';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'

import { useApiContext } from '@/assets/script/api/context/global'

const Domains = () => {
  const langTrans = useTranslations('lang');

  // Column Definitions: Defines & controls grid columns.
  const colDefs: object[] = useMemo(() => ([
    { headerName: langTrans('data-name/domain'), field: 'domain', flex: 1 }
  ]), [langTrans])

  const { getComments } = useApiContext().useComments()
  // Queries
  const response: any = getComments()
  const domainList = useMemo(() => response?.data?.data?.reduce((previousData: any, currentData: any) => ((previousData.length === 0 || previousData.find((details: any) => (details.domain !== String(currentData.email).split('@')[1]))) ? [ ...previousData, { domain: String(currentData.email).split('@')[1] } ] : previousData), []), [response?.data?.data]);
  return (
    (response?.isLoading && <p>{langTrans('loading/data')}</p>) ||
    <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '50vh' }}>
      <AgGridReact columnDefs={colDefs} rowData={domainList} pagination={true} paginationPageSize={20} localeText={{ pageSizeSelectorLabel: langTrans('table-parts/page-size'), page: langTrans('table-parts/page'), of: langTrans('table-parts/of'), to: langTrans('table-parts/to') }}/>
    </div>
  )
}

export default Domains;