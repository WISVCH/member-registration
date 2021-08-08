const convertToDienst = (data) => data.map(convertMemberToDienst)


const convertMemberToDienst = (member) => {
	const bday = new Date(member["birthdate"]);
	let newMemberObject = {
		initials: member["initials"],
		firstname: member["firstname"],
		preposition: member["preposition"],
		surname: member["surname"],
		gender: member["gender"].charAt(0),
		birthdate:  (bday.getMonth()+1) + "/" + bday.getDate()+ "/" + bday.getFullYear(),
		street_name: member["street_name"],
		house_number: member["houseNumber"],
		postcode: member["postCode"],
		city: member["city"],
		country: member["country"],
		email: member["email"],
		phone_mobile: member["phoneMobile"],
		student__study: member["study"],
		student__student_number: member["studentNumber"],
		netid: member["netid"],
		student__emergency_name: member["emergencyName"],
		student__emergency_phone: member["emergencyPhone"],
		mail_announcements: member["mailActivity"] ? 1 : 0,
		mail_company: member["mailCareer"] ? 1 : 0,
		mail_education: member["mailEducation"] ? 1 : 0,
		machazine: member["machazine"] ? 1 : 0,
		member__amount_paid: 10
	}
	return newMemberObject

}

export default convertToDienst;
