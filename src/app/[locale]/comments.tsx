'use client';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme

import { useTranslations } from 'next-intl';
import { useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'
import { Link } from '@/navigation'

import { useApiContext } from '@/assets/script/api/context/global'

const LinkRenderer = (langTrans: any, props: any) => {
  return (
    <Link href={{ pathname: '/comment/[id]', params: { id: props.data.id } }}>{langTrans('data-name/view')}</Link>
  );
};

const Comments = () => {
  const langTrans = useTranslations('lang');
  const searchRef: any = useRef()
  const tableRef: any = useRef()

  // Column Definitions: Defines & controls grid columns.
  const colDefs: object[] = useMemo(() => ([
    { headerName: langTrans('data-name/postId'), field: 'postId', width: 100 },
    { headerName: langTrans('data-name/name'), field: 'name', width: 300 },
    { headerName: langTrans('data-name/email'), field: 'email', width: 300 },
    { headerName: langTrans('data-name/body'), field: 'body', width: 500 },
    { headerName: langTrans('data-name/action'), pinned: 'right', suppressMenu: true, maxWidth: 90, cellRenderer: (props: any) => LinkRenderer(langTrans, props) },
  ]), [langTrans])

  const { getComments } = useApiContext()
  // Queries
  const response: any = getComments()
  const onFilterTextBoxChanged = useCallback(() => { tableRef.current.api.setGridOption('quickFilterText', searchRef?.current?.value); }, [searchRef])
  return (
    (response?.isLoading && <p>{langTrans('data/loading')}</p>) ||
    (response?.isError && <p>{langTrans('data/error')}</p>) ||
    <>
      <div className="search-header">
        <span className="label">{langTrans('label/search')}</span>
        <input ref={searchRef} type="text" className="filter-text-box" placeholder={langTrans('label/placeholder')} onInput={onFilterTextBoxChanged}/>
      </div>
      <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '50vh' }}>
        <AgGridReact ref={tableRef} columnDefs={colDefs} rowData={response?.data?.data} pagination={true} paginationPageSize={20} localeText={{ pageSizeSelectorLabel: langTrans('table-parts/page-size'), page: langTrans('table-parts/page'), of: langTrans('table-parts/of'), to: langTrans('table-parts/to') }}/>
      </div>
    </>
  );
}

export default Comments;