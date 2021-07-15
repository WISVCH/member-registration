import React, {useState} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import axios from "axios";
import {ServerDomain} from "../App";
import {Dropdown, DropdownButton, MenuItem} from "react-bootstrap";


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

const requestData = async (currentPage: number, resultsPerPage: number): Promise<{ name: string }[] | undefined> => {
	try {
		const req = await axios.get(`${ServerDomain}/api/admin/members/${currentPage}/${resultsPerPage}`);
		return req.data
	} catch (e) {
		console.error(e)
	}
	return [{name: "firstName"},{name: "firstName"}]
}

// @ts-ignore
function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data,
	})

	// Render the UI for your table
	return (
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
			{rows.map((row, i) => {
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
	)
}

function App() {

	const [currentPage, setCurrentPage] = useState(0);
	const [resultsPerPage, setResultsPerPage] = useState(20);
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

	const data = React.useMemo(async () => await requestData(currentPage, resultsPerPage), [currentPage, resultsPerPage])
	const pageSizes = [10, 20, 50, 100, 1000]

	return (
		<Styles>
			<DropdownButton
				title={"result per page"}
				key={"key-dropdown-results-per-page"}
				id={`dropdown-basic-0`}
			>
				{pageSizes.map(size => <MenuItem key={`dropdown-${size}`} eventKey={size} onSelect={(e) => setResultsPerPage(e)} active={size === resultsPerPage}>{size}</MenuItem>)}
			</DropdownButton>
			<Table columns={columns} data={data} />
		</Styles>
	)
}

export default App
