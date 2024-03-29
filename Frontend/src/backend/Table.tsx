// @ts-nocheck
import React, {useState} from "react";
import {usePagination, useRowSelect, useTable} from "react-table";
import {Alert, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import styled from "styled-components";
import convertToDienst from "./convertToDienstFormat";
import {convertArrayToCSV} from "convert-array-to-csv";

const exportCSV = (data) => {
	const csvString = convertArrayToCSV(convertToDienst(data))
	const element = document.createElement("a");
	const file = new Blob([csvString], {type: 'text/plain'});
	element.href = URL.createObjectURL(file);
	element.download = "ledenExport.csv";
	document.body.appendChild(element); // Required for this to work in FireFox
	element.click();
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
function Table({columns, data, addToDienst, setMember}) {
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
	const [showAlert, setShowAlert] = useState(false)

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
			<Toolbar>
				<InlineBlock>
					<ButtonGroup>
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
					</ButtonGroup>
					</InlineBlock>
					<InlineBlock>
          Page{' '}
						<strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
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
						</InlineBlock>
					<StyledSelect
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
					</StyledSelect>
					<ButtonGroup>
						<Button onClick={() => exportCSV(selectedFlatRows.map(
							d => d.original
						))}>Export selection to CSV</Button>
						<Button onClick={() => setShowAlert(true)}>Add selection to LDB</Button>
						<Button onClick={() => {
							if (selectedFlatRows.length === 1) {
								setMember(selectedFlatRows[0].original)
							}
						}}>Edit selected member</Button>
					</ButtonGroup>
			</Toolbar>
			{showAlert ? (<Alert bsStyle="danger" onDismiss={() => setShowAlert(false)}>
				<h4>Check your selection!</h4>
				<p>
					You are about to add the selected members to the leden database are you sure you want to
					continue?
					Please double check your selection it takes manual work to reverse this action!
				</p>
				<p>
					<ButtonToolbar>
						<ButtonGroup>
							<Button className="btn-danger" onClick={() => {
								setShowAlert(false)
								addToDienst(selectedFlatRows.map(
									d => d.original.netid
								))
							}}>I read this message and double checked my selection</Button>
						</ButtonGroup>
						<ButtonGroup>
							<span> or </span>
						</ButtonGroup>
						<ButtonGroup>
							<Button onClick={() => setShowAlert(false)}>Cancel</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</p>
			</Alert>) : ""}
		</>
	)
}

const Toolbar = styled.div`
  width:100%;
  padding-top: 1rem;
`

const InlineBlock = styled.div`
display: inline-block;
width: 33%;
`

const StyledSelect = styled("select")`
display: inline-flex;
max-width: 33%;
width: 33%;
float: right;
`

export default Table;
