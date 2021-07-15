// @ts-nocheck
import React, {useState} from 'react'
import styled from 'styled-components'
import {usePagination, useRowSelect, useTable} from 'react-table'
import axios from "axios";
import {ServerDomain} from "../App";
import {Button, ButtonToolbar, Dropdown, DropdownButton, MenuItem} from "react-bootstrap";


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const requestData = async () => {
	try {
		const req = await axios.get(`${ServerDomain}/api/admin/members`);
		return req.data
	} catch (e) {
		console.error(e)
	}
	let list = []
	for(var i = 0; i < 10000; i++) {
		list.push({name:`name ${i}`})
	}
	return list
}

const IndeterminateCheckbox = React.forwardRef(
		// @ts-ignore
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef()
		const resolvedRef = ref || defaultRef

		React.useEffect(() => {
			// @ts-ignore
			resolvedRef.current.indeterminate = indeterminate
		}, [resolvedRef, indeterminate])

		return (
			<>
				<input type="checkbox" ref={resolvedRef} {...rest} />
			</>
		)
	}
)

// @ts-ignore
function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		selectedFlatRows,
		state: { pageIndex, pageSize, selectedRowIds },
	} = useTable( {
			columns,
			data,
		},
		usePagination,
		useRowSelect,
		hooks => {
			hooks.visibleColumns.push(columns => [
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllPageRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			])
		})

	// Render the UI for your table
	return (
		<>
		<table {...getTableProps()}>
			<thead>
			{headerGroups.map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map(column => (
						<th {...column.getHeaderProps()}>{column.render('Header')}</th>
					))}
				</tr>
			))}
			</thead>
			<tbody {...getTableBodyProps()}>
			{page.map((row, i) => {
				prepareRow(row)
				return (
					<tr {...row.getRowProps()}>
						{row.cells.map(cell => {
							return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
						})}
					</tr>
				)
			})}
			</tbody>
		</table>
	<div className="pagination">
		<ButtonToolbar>
			<Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
				{'<<'}
			</Button>
			<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
				{'<'}
			</Button>
			<Button onClick={() => nextPage()} disabled={!canNextPage}>
				{'>'}
			</Button>
			<Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
				{'>>'}
			</Button>
		<span>
          Page{' '}
			<strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
		<span>
          | Go to page:{' '}
			<input
				type="number"
				defaultValue={pageIndex + 1}
				onChange={e => {
					const page = e.target.value ? Number(e.target.value) - 1 : 0
					gotoPage(page)
				}}
				style={{ width: '100px' }}
			/>
        </span>
		<select
			value={pageSize}
			onChange={e => {
				setPageSize(Number(e.target.value))
			}}
		>
			{[10, 20, 30, 40, 50, 100, 1000].map(pageSize => (
				<option key={pageSize} value={pageSize}>
					Show {pageSize}
				</option>
			))}
		</select>
		</ButtonToolbar>
		{/*<pre>*/}
        {/*  <code>*/}
        {/*    {JSON.stringify(*/}
		{/*		{*/}
		{/*			selectedRowIds: selectedRowIds,*/}
		{/*			'selectedFlatRows[].original': selectedFlatRows.map(*/}
		{/*				d => d.original*/}
		{/*			),*/}
		{/*		},*/}
		{/*		null,*/}
		{/*		2*/}
		{/*	)}*/}
        {/*  </code>*/}
        {/*</pre>*/}
	</div>
	</>
	)
}

function App() {

	const [data, setData] = useState([{name: ""}]);
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				columns: [
					{
						Header: 'First Name',
						accessor: 'name',
					},
				],
			},
		],
		[]
	)

	// @ts-ignore
	React.useEffect(async () => {
		const requestedData = await requestData();
		setData(requestedData ? requestedData : [])
	}, [])

	return (
		<Styles>
			<Table columns={columns} data={data} />
		</Styles>
	)
}

export default App
