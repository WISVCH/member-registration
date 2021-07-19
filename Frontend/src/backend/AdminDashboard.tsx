import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from "axios";
import {Button, ButtonGroup, Panel} from "react-bootstrap";
import Table from "./Table";
import MemberEdit from "./MemberEdit";
import PanelBody from "react-bootstrap/lib/PanelBody";
import {contextPath} from "../App";

function AdminDashboard() {
	const [data, setData] = useState([{}]);
	const [unhandled, setUnhandled] = useState(false)
	const [report, setReport] = useState("")
	const [focussedMember, setFocussedMember] = useState(undefined)
	const [message, setMessage] = useState({style: "", context: "", message: ""})

	const changeMessage = (style: string, context: string, message: string) => {
		setMessage({style, context, message})
		setTimeout(() => {
			setMessage({style: "", context: "", message: ""})
		}, 10000);
	}

	const requestData = async (unhandled) => {
		let req;
		try {
			req = await axios.get(`${contextPath}/api/admin/members/${unhandled ? "unhandled" : "all"}`);
		} catch (reason) {
			window.location.href = `${contextPath}/api/admin/members/login`
		}
		return req?.data
	}

	const addToDienst = (setReport) => async (data) => {
		let report = ""
		for (const netid of data) {
			await axios.get(`${contextPath}/api/admin/members/dienst/${netid}`)
				// eslint-disable-next-line no-loop-func
				.then(response => {
					report = `${report}${netid}: "${response?.data.message}" successfull! \n`
					// eslint-disable-next-line no-loop-func
				}).catch(error => {
					report = `${report}${netid}: "${error.response?.data.message}" error occurred! \n`
				})
		}
		setReport(report)
	}

	const updateMember = async (member) => {
		await axios.put(`${contextPath}/api/admin/members/put/${member.netid}`, member)
			.then(response => {
				changeMessage("success", `Editing ${member.netid}'s user information`, response?.data.message)

			})
			.catch(error => {
				changeMessage("danger", `Editing ${member.netid}'s user information`, error.response?.data.message)
			})
	}

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
	useEffect(() => {
		const func = async () => {
			const requestedData = await requestData(unhandled);
			setData(requestedData ? requestedData : [])
		}
		func()
	}, [unhandled, message, report])

	return (
		<Box>
			<ButtonGroup>
				<Button
					onClick={() => setUnhandled(!unhandled)}>{unhandled ? "Show All" : "Show unhandled entries"}</Button>
			</ButtonGroup>
			{`currently showing all ${unhandled ? "unhandled" : ""} entries`}
			<Styles>
				<Table columns={columns} data={data} addToDienst={addToDienst(setReport)}
					   setMember={setFocussedMember}/>
			</Styles>
			{focussedMember ? (
				<MemberEdit member={focussedMember} setMember={setFocussedMember} updateMember={updateMember}/>
			) : ""}
			{message.style ? (
				<Panel bsStyle={message.style}>
					<Panel.Body>{message.message}</Panel.Body>
				</Panel>
			) : ""}
			{report ? (
				<Panel>
					<PanelLineBreak>{report}</PanelLineBreak>
				</Panel>
			) : ""}
		</Box>
	)
}

const PanelLineBreak = styled(PanelBody)`
	white-space: pre-line;
`

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

export default AdminDashboard;
