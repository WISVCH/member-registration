// @ts-nocheck
import React, {useState} from 'react'
import styled from 'styled-components'
import {usePagination, useRowSelect, useTable} from 'react-table'
import axios from "axios";
import {convertArrayToCSV} from 'convert-array-to-csv';
import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import convertToDienst from "./convertToDienstFormat";


const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  margin-top: 2%;
  margin-left: 6%;
  max-width: 88%;


  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

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

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const Box = styled.div`
	background-color: rgba(255, 255, 255, 0.5);
	margin-left: 4%;
	margin-top: 1%;
	width: 90%;
	height: auto;
	padding: 1% 1%;
	border-radius: 10px;
	@media screen and (max-width: 768px) {
		width: 100%;
		margin: 0;
	}
	
`

const exportCSV = (data) => {
	const csvString = convertArrayToCSV(convertToDienst(data))
	const element = document.createElement("a");
	const file = new Blob([csvString], {type: 'text/plain'});
	element.href = URL.createObjectURL(file);
	element.download = "ledenExport.csv";
	document.body.appendChild(element); // Required for this to work in FireFox
	element.click();
}

const addToDienst = (data) => { // TODO proper error handling
	data.forEach(netid => {
		try {
			axios.get(`/api/admin/members/dienst/${netid}`);
		} catch (e) {
			console.error(e)
		}
	})

}

const IndeterminateCheckbox = React.forwardRef(
	// @ts-ignore
	({indeterminate, ...rest}, ref) => {
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
function Table({columns, data}) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		selectedFlatRows,
		state: {pageIndex, pageSize},
	} = useTable({
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
					Header: ({getToggleAllPageRowsSelectedProps}) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({row}) => (
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
			<div className="tableWrap">
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
			</div>
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
							style={{width: '100px'}}
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
					<Button onClick={() => exportCSV(selectedFlatRows.map(
						d => d.original
					))}>Export selection to CSV</Button>
					<Button onClick={() => addToDienst(selectedFlatRows.map(
						d => d.original.netid
					))}>Add selection to LDB</Button>

				</ButtonToolbar>
			</div>
		</>
	)
}

function App() {

	const requestData = async (unhandled) => {
		let req;
		try {
			req = await axios.get(`/api/admin/members/${unhandled ? "unhandled" : "all"}`);
		} catch (reason) {
			if (reason.response!.status === 401) {
				window.location.href = `http://connect.ch.tudelft.nl/login?redirect_uri=${window.location.href}`
			}
		}
		return req.data
	}

	const [data, setData] = useState([{}]);
	const [unhandled, setUnhandled] = useState(false)
	const columns = React.useMemo(
		() => {
			const shownValues = ["firstname", "preposition", "surname", "streetName", "houseNumber", "postCode", "city", "country", "email", "netid", "studentNumber"]
			return shownValues.map(x => {
				return {
					Header: x,
					accessor: x,
				}
			})
		},
		[]
	)

	// @ts-ignore
	React.useEffect(() => {
		const func = async () => {
			const requestedData = await requestData(unhandled);
			setData(requestedData ? requestedData : [])
		}
		func()
	}, [unhandled])

	return (
		<Box>
			<ButtonGroup>
				<Button onClick={() => setUnhandled(!unhandled)}>{unhandled ? "All" : "Unhandled"}</Button>
			</ButtonGroup>
			{`currently showing all ${unhandled ? "" : "unhandled"} entries`}
			<Styles>
				<Table columns={columns} data={data}/>
			</Styles>
		</Box>
	)
}

export default App
