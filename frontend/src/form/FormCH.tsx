import {Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React, {FormEvent} from "react";
import {getNames, getCodes} from "country-list";

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


class FormCH extends React.Component<{}, FormTypes> {
	constructor(props: {}, context: any) {
		super(props, context);

		this.handleChange = this.handleChange.bind(this);
		this.createFormGroup = this.createFormGroup.bind(this)

		this.state = {
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
			study: "",
			studentNumber: "",
			netid: "",
			emergencyName: "",
			emergencyPhone: "",
			mailActivity: true,
			mailCareer: true,
			mailEducation: true,
			machazine: true
		};
	}

	getValidationState(value: string) {
		return null;
	}

	async handleChange(e: FormEvent<FormControl>, formName: string) {
		if (["mailActivity", "mailCareer", "mailEducation", "machazine"].includes(formName)) {
			// @ts-ignore
			await this.setState({[formName]: e.target.checked});
		} else {
			// @ts-ignore
			this.setState({[formName]: e.currentTarget.value});
		}
	}

	createFormGroup(formValue: string, title: string, helpBlock?: string, customType?: string) {
		return (<FormGroup
			controlId={`${formValue}`}
			validationState={this.getValidationState(formValue)}
		>
			<ControlLabel>{title}</ControlLabel>
			<FormControl
				type={customType ? customType : "text"}
				value={`${this.state[formValue]}`}
				placeholder={`Type ${title} here`}
				onChange={(e) => this.handleChange(e, formValue)}
			/>
			<FormControl.Feedback/>
			{helpBlock ? <HelpBlock>{helpBlock}</HelpBlock> : ''}
		</FormGroup>)
	}

	createFormGroupDropDown(formValue: string, title: string, options: string[][]) {
		return (<FormGroup controlId="formValue">
			<ControlLabel>{title}</ControlLabel>
			<FormControl componentClass="select" value={`${this.state[formValue]}`}
						 onChange={(e) => this.handleChange(e, formValue)} placeholder="select">
				{options.map((opt) => (<option value={opt[0]}>{opt[1]}</option>))}
			</FormControl>
		</FormGroup>)
	}

	createFormGroupCheckBox(formValue: string, title: string) {
		// @ts-ignore
		let ch:boolean = this.state[formValue];

		return (<FormGroup controlId="formValue">
			<ControlLabel>{title}</ControlLabel>
				<Checkbox inline checked={ch}
						  onChange={(e) => this.handleChange(e, formValue)}/>
				</FormGroup>)
		}

				render() {
				const zip = (a: any[], b: {[x: string]: any;}) => a.map((k, i) => [k, b[i]])
				return (
				<form>
			{this.createFormGroup("initials", "Initials", "All the first letters of your first names separated by points.")}
			{this.createFormGroup("firstname", "First name")}
			{this.createFormGroup("preposition", "Preposition")}
			{this.createFormGroup("surname", "surname")}
			{this.createFormGroupDropDown("gender", "gender", [['F', "Female"],['M', "Male"]])}
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
				</form>
				);
			}
				}



				export default FormCH;
