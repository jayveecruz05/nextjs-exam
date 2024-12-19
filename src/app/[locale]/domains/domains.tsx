'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, memo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic

import { useGetComments } from '@/assets/script/api/state/comments';

let isFirstLoad: boolean = true;

const Domains = () => {
  const langTrans = useTranslations('lang');
  const searchRef: any = useRef()
  const tableRef: any = useRef()

  // Column Definitions: Defines & controls grid columns.
  const colDefs: object[] = useMemo(() => ([
    { headerName: langTrans('data-name/domain'), field: 'domain', flex: 1 }
  ]), [langTrans])
  
  // Queries
  const response: any = useGetComments()
  const domainList = useMemo(() => response?.data?.data?.reduce((previousData: any, currentData: any) => ((previousData.length === 0 || previousData.find((details: any) => (details.domain !== String(currentData.email).split('@')[1]))) ? [ ...previousData, { domain: String(currentData.email).split('@')[1] } ] : previousData), []), [response?.data?.data]);
  const onFilterTextBoxChanged = useCallback(() => { tableRef.current.api.setGridOption('quickFilterText', searchRef?.current?.value); }, [searchRef])
  useEffect(() => { isFirstLoad = !(isFirstLoad && (response?.isSuccess || response?.isError)); }, [response]);
  return (
    (response?.isLoading && isFirstLoad && <p>{langTrans('data/loading')}</p>) ||
    (response?.isError && <p>{langTrans('data/error')}</p>) ||
    <>
      <div className="search-header">
        <span className="label">{langTrans('label/search')}</span>
        <input ref={searchRef} type="text" className="filter-text-box" placeholder={langTrans('label/placeholder')} onInput={onFilterTextBoxChanged}/>
      </div>
      <div className={"ag-theme-quartz"} style={{ width: '100%', height: '50vh' }}>
        <AgGridReact ref={tableRef} columnDefs={colDefs} rowData={domainList} pagination={true} paginationPageSize={20} localeText={{ pageSizeSelectorLabel: langTrans('table-parts/page-size'), page: langTrans('table-parts/page'), of: langTrans('table-parts/of'), to: langTrans('table-parts/to') }}/>
      </div>
    </>
  )
}

export default memo(Domains);