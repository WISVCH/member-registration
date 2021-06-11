import {Alert, Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React, {FormEvent, Fragment} from "react";
import {Redirect} from "react-router-dom";
import {getNames, getCodes} from "country-list";
import axios from "axios";
import {ServerDomain} from "../App";

interface FormTypes {
	[index: string]: string | boolean,

	initials: string,
	firstname: string,
	preposition: string,
	surname: string,
	gender: string,
	birthdate: string,
	streetName: string,
	houseNumber: string,
	postCode: string,
	city: string,
	country: string,
	email: string,
	phoneMobile: string,
	study: string,
	studentNumber: string,
	netid: string,
	emergencyName: string,
	emergencyPhone: string,
	mailActivity: boolean,
	mailCareer: boolean,
	mailEducation: boolean,
	machazine: boolean,
}

function validateEmail(email: string)
{
	var re = /\S+@\S+\.\S+/;
	return re.test(email);
}

class FormCH extends React.Component<{}, { formValues: FormTypes, sendStatus?: boolean, isChangeStarted: Map<String, boolean>, redirect: boolean}> {
	constructor(props: any, context: any) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);
		this.createFormGroup = this.createFormGroup.bind(this)
		this.submit = this.submit.bind(this)

		this.state = {
			isChangeStarted: new Map<String, boolean>(),
			redirect: false,
			formValues: {
				initials: "",
				firstname: "",
				preposition: "",
				surname: "",
				gender: "",
				birthdate: "",
				streetName: "",
				houseNumber: "",
				postCode: "",
				city: "",
				country: "",
				email: "",
				phoneMobile: "",
				study: "BACHELOR_COMPUTER_SCIENCE",
				studentNumber: "",
				netid: "",
				emergencyName: "",
				emergencyPhone: "",
				mailActivity: true,
				mailCareer: true,
				mailEducation: true,
				machazine: true
			}
		};
	}

	getValidationState(value: string) {
		const checkPresent = ["initials", "firstname", "preposition", "surname", "birthdate", "streetName", "houseNumber", "postCode", "city", "email", "phoneMobile", "studentNumber", "netid", "emergencyName", "emergencyPhone"]
		if (this.state.isChangeStarted.get(value)) {
			// @ts-ignore
			if (checkPresent.includes(value) && this.state.formValues[value].length === 0) {
				return "error"
			}
			if (value === "email" && !validateEmail(this.state.formValues[value])) {
				return "error"
			}
		}
		return null;
	}

	async handleChange(e: FormEvent<FormControl>, formName: string) {
		let newFormValues = this.state.formValues;
		if (["mailActivity", "mailCareer", "mailEducation", "machazine"].includes(formName)) {
			// @ts-ignore
			newFormValues[formName] = e.target.checked;
			await this.setState({formValues: newFormValues});
		} else {
			// @ts-ignore
			newFormValues[formName] = e.currentTarget.value;
			await this.setState({formValues: newFormValues});
		}
		let newMap = this.state.isChangeStarted;
		newMap.set(formName,true);
		this.setState({isChangeStarted: newMap})
	}

	createFormGroup(formValue: string, title: string, helpBlock?: string, customType?: string) {
		return (<FormGroup
			controlId={`${formValue}`}
			validationState={this.getValidationState(formValue)}
		>
			<ControlLabel>{title}</ControlLabel>
			<FormControl
				type={customType ? customType : "text"}
				value={`${this.state.formValues[formValue]}`}
				placeholder={`Type ${title} here`}
				onChange={(e) => this.handleChange(e, formValue)}
				required
			/>
			<FormControl.Feedback/>
			{helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : ''}
		</FormGroup>)
	}

	createFormGroupDropDown(formValue: string, title: string, options: string[][]) {
		return (<FormGroup controlId="formValue">
			<ControlLabel>{title}</ControlLabel>
			<FormControl componentClass="select" value={`${this.state.formValues[formValue]}`}
						 onChange={(e) => this.handleChange(e, formValue)} placeholder="select">
				{options.map((opt) => (<option value={opt[0]}>{opt[1]}</option>))}
			</FormControl>
		</FormGroup>)
	}

	createFormGroupCheckBox(formValue: string, title: string) {
		// @ts-ignore
		let ch: boolean = this.state.formValues[formValue];

		return (<FormGroup controlId="formValue">
			<ControlLabel>{title}</ControlLabel>
			<Checkbox inline checked={ch}
					  onChange={(e) => this.handleChange(e, formValue)}/>
		</FormGroup>)
	}

	async submit() {
		let answer;
		try {
			answer = await axios.post(`${ServerDomain}/api/members`, this.state.formValues);
		} catch (e: any) {
			this.setState({sendStatus: answer?.status === 200});
			this.setState({redirect: answer?.status === 200});
			return;
		}
		this.setState({redirect: answer?.status === 200});
		this.setState({sendStatus: answer?.status === 200});
	}


	render() {
		const zip = (a: any[], b: { [x: string]: any; }) => a.map((k, i) => [k, b[i]]);
		const buttonStyle = this.state.sendStatus === undefined ? "" : (this.state.sendStatus ? "btn-success" : "btn-danger");
		return (
			!this.state.redirect ?
			<Fragment>
				<form>
					{this.createFormGroup("initials", "Initials", "All the first letters of your first names separated by points.")}
					{this.createFormGroup("firstname", "First name")}
					{this.createFormGroup("preposition", "Preposition")}
					{this.createFormGroup("surname", "surname")}
					{this.createFormGroupDropDown("gender", "gender", [['F', "Female"], ['M', "Male"]])}
					{this.createFormGroup("birthdate", "Date of birth", undefined, "date")}
					{this.createFormGroup("streetName", "Street name")}
					{this.createFormGroup("houseNumber", "House number")}
					{this.createFormGroup("postCode", "postal Code")}
					{this.createFormGroup("city", "City")}
					{this.createFormGroupDropDown("country", "Country", zip(getCodes(), getNames()))}
					{this.createFormGroup("email", "Email", undefined, "email")}
					{this.createFormGroup("phoneMobile", "Mobile phone number")}
					{this.createFormGroupDropDown("study", "Study", zip(["BACHELOR_MATHEMATICS", "BACHELOR_COMPUTER_SCIENCE", "MASTER_MATHEMATICS", "MASTER_EMBEDDED_SYSTEMS", "MASTER_COMPUTER_SCIENCE"], ["Bachelor Applied Mathematics", "Bachelor Computer Science and Engineering", "Master Applied Mathematics", "Master Embedded Systems", "Master Computer Science and Engineering"]))}
					{this.createFormGroup("studentNumber", "Student Number")}
					{this.createFormGroup("netid", "Netid")}
					{this.createFormGroup("emergencyName", "Emergency contact name")}
					{this.createFormGroup("emergencyPhone", "Emergency contact phone number")}
					{this.createFormGroupCheckBox("mailActivity", "I want to subscribe to the CH activity mail")}
					{this.createFormGroupCheckBox("mailCareer", "I want to subscribe to the CH career mail")}
					{this.createFormGroupCheckBox("mailEducation", "I want to subscribe to the CH education mail")}
					{this.createFormGroupCheckBox("machazine", "I want to receive the quarterly CH maCHazine")}
					{buttonStyle === "btn-danger" ? <Alert bsStyle="danger">
						<strong>Error!</strong> Not everything is filled in correctly.
					</Alert> : ""}
					<Button onClick={this.submit} className={`${buttonStyle}`}>Submit</Button>
				</form>
			</Fragment>
				:
				<Redirect to={{
					pathname: "/pay",
					state: {
						name: `${this.state.formValues.firstname} ${this.state.formValues.preposition} ${this.state.formValues.surname}`,
						email: this.state.formValues.email
							}

				}}/>
		);
	}
}


export default FormCH;
