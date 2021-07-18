import React, {useState} from "react";
import {Button, ButtonToolbar, ControlLabel, FormControl, FormGroup, Panel} from "react-bootstrap";
import styled from "styled-components";
import {zip} from "../util/util";

const STUDY_OPTIONS = zip(["BACHELOR_MATHEMATICS", "BACHELOR_COMPUTER_SCIENCE", "MASTER_MATHEMATICS", "MASTER_EMBEDDED_SYSTEMS", "MASTER_COMPUTER_SCIENCE"], ["Bachelor Applied Mathematics", "Bachelor Computer Science and Engineering", "Master Applied Mathematics", "Master Embedded Systems", "Master Computer Science and Engineering"]);
const PAID_STATUSES = ["CREATED", "WAITING", "PAID", "EXPIRED", "CANCELLED"]

const buildDropDown = (formValue, options, handleChange, memberState) => {
	return (<SmallFormGroup controlId={formValue} key={formValue}>
		<ControlLabel>{formValue}</ControlLabel>
		<SmallFormControl componentClass="select" value={`${memberState[formValue]}`}
						  onChange={(e) => handleChange(e, formValue)} placeholder="select">
			{options.map((opt) => (<option value={opt[0]} key={opt[0]}>{opt[1]}</option>))}
		</SmallFormControl>
	</SmallFormGroup>)
}

const buildFormGroup = (formKey: string, handleChange, memberState, customType?: string) => {
	const memberValue = memberState[formKey];
	let date;
	if (customType && customType === "date" && Date.parse(memberValue)){
		date = new Date(Date.parse(memberValue)).toISOString().substr(0, 10)
	}

	return (<SmallFormGroup	controlId={formKey} key={formKey}>
		<ControlLabel>{formKey}</ControlLabel>
		<SmallFormControl
			type={customType ? customType : "text"}
			value={customType === "date" ? date :`${memberValue}`}
			onChange={(e) => handleChange(e, formKey)}
			required
		/>
	</SmallFormGroup>)
}

function MemberEdit({member, setMember, updateMember}) {
	const [memberState, setMemberState] = useState(member)
	const ignore = ["paidDate", "birthdate", "gender", "study", "id", "mailActivity", "mailCareer", "mailEducation", "machazine", "paidStatus", "addedToLdb"]
	const formKeys = Object.keys(member).filter(x => !ignore.includes(x))

	const handleChange = (setMemberState) => (e, formValue) => {
		let newMemberState = {...memberState};
		newMemberState[formValue] = e.currentTarget.value;
		setMemberState(newMemberState);
	}

	return <Panel className="panel-primary">
		<Panel.Heading>
			<Panel.Title componentClass="h3"><strong>{member.netid} edit panel</strong> <Clickable onClick={() => setMember(undefined)}>✖</Clickable></Panel.Title>
		</Panel.Heading>
		<Panel.Body>
			{buildDropDown("gender", [["M", "Male"], ["F", "Female"]], handleChange(setMemberState), memberState)}
			{buildDropDown("study", STUDY_OPTIONS, handleChange(setMemberState), memberState)}
			{buildFormGroup("birthdate", handleChange(setMemberState), memberState, "date")}
			{formKeys.map(key => buildFormGroup(key, handleChange(setMemberState), memberState))}
			{buildFormGroup("paidDate", handleChange(setMemberState), memberState, "date")}
			{buildDropDown("paidStatus", zip(PAID_STATUSES, PAID_STATUSES), handleChange(setMemberState), memberState)}
		</Panel.Body>
		<Panel.Footer>
			<ButtonToolbar>
				<Button className={"btn-primary"} onClick={() => {
					updateMember(memberState);
					setMember(undefined);
				}}>Apply edits</Button>
				<Button className={"bt-info"} onClick={() => setMember(undefined)}>Cancel</Button>
			</ButtonToolbar>
		</Panel.Footer>
	</Panel>
}

const SmallFormGroup = styled(FormGroup)`
  width:49%;
  display:inline-block;
`

const SmallFormControl = styled(FormControl)`
  font-size: 12px;
  padding: 2px 5px;
  width:90%;
  display: inline-block;
  background-color: #e7ebf1;
  border-radius: 0px;
  outline: none;
`

const Clickable = styled.span`
  cursor: pointer;
  display: block;
  float:right;
`

export default MemberEdit
