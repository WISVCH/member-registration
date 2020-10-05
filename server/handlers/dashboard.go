package handlers

import (
	"bytes"
	"fmt"
	"github.com/WISVCH/member-registration/config"
	"github.com/WISVCH/member-registration/entities"
	"github.com/biter777/countries"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"strconv"
)

func Formlist(i entities.HandlerInteractor) func(c *gin.Context) {
	return func(c *gin.Context) {
		var forms, err = i.DB.ListForms()
		if err != nil {
			fmt.Print(err)
		}

		c.IndentedJSON(http.StatusOK, gin.H{"formdata": forms})
	}
}

func getFormJson(f entities.FormEntity) string {
	var countryCode = countries.ByName(f.Country)
	var	preposition = ""
	if f.Preposition != nil {
		preposition = *f.Preposition
	}
	return fmt.Sprintf(`{
		"revision_comment": "init",
		"member": {
        "person": "3",
        "date_from": null,
        "date_to": null,
        "date_paid": null,
        "amount_paid": null,
        "merit_date_from": null,
        "merit_invitations": false,
        "honorary_date_from": null
    },
		"student": {
			"person": "3",
			"enrolled": "t",
			"study": "%s",
			"first_year": "0",
			"student_number": "%s",
			"emergency_name": "%s",
			"emergency_phone": "%s",
			"yearbook_permission": "%s",
			"date_verified": null
	},"alumnus": {
        "person": "3",
        "study": "",
        "study_first_year": null,
        "study_last_year": null,
        "study_research_group": "",
        "study_paper": "",
        "study_professor": "",
        "work_company": "",
        "work_position": "",
        "work_sector": "",
        "contact_method": "m"
    },
    "employee": {
        "person": "3",
        "faculty": "EEMCS",
        "department": "t",
        "function": "t",
        "phone_internal": "12345"
    },
		"street_name": "%s",
		"house_number": "%s",
		"address_2": "",
		"address_3": "",
		"postcode": "%s",
		"city": "%s",
		"country": "%s",
		"email": "%s",
		"phone_fixed": "",
		"machazine": "%s",
		"board_invites": "f",
		"constitution_card": "f",
		"christmas_card": "t",
		"yearbook": "%s",
		"titles": "",
		"initials": "%s",
		"firstname": "%s",
		"preposition": "%s",
		"surname": "%s",
		"postfix_titles": "",
		"phone_mobile": "%s",
		"gender": "%s",
		"birthdate": "%s",
		"deceased": "f",
		"mail_announcements": "%s",
		"mail_company": "%s",
		"mail_education": "%s",
		"ldap_username": "",
		"email_forward": "f",
		"netid": "%s",
		"linkedin_id": "",
		"facebook_id": ""
	}`,
		f.Study, f.StudentNumber, f.EmergencyName, f.EmergencyPhone, translateBool(f.YearBookPer),
		f.StreetName, f.HouseNumber, f.PostCode, f.City,
		countryCode.Alpha2(), f.Email, translateBool(f.Machazine), translateBool(f.YearBookPer), f.Initials, f.FirstName,
		preposition, f.LastName, f.PhoneMobile, f.Gender, f.BirthDate,
		translateBool(f.ActivityMail), translateBool(f.EducationMail), translateBool(f.YearBookPer), f.NetID)
}

func translateBool(b bool) (str string) {
	if b {
		return "t"
	} else {
		return "f"
	}
}

func SubmitForm(i entities.HandlerInteractor, config config.Config) func(c *gin.Context) {
	return func(c *gin.Context) {
		var idStr = c.Param("id")
		var id, _ = strconv.Atoi(idStr)
		var form, err = i.DB.GetFormEntity(id)
		if err != nil {
			fmt.Println(err)
		}

		var jsonStr = getFormJson(form)
		var req, error = http.NewRequest("POST", config.DienstApiUrl, bytes.NewBuffer([]byte(jsonStr)))
		req.Header.Set("Authorization", "Token "+config.DienstToken)
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Content-Language", "en")

		if error != nil {
			fmt.Print(err)
		}
		client := http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Print(err)
		}

		fmt.Println("response Status:", resp.Status)
		fmt.Println("response Headers:", resp.Header)
		body, _ := ioutil.ReadAll(resp.Body)
		fmt.Println("response Body:", string(body))

		c.IndentedJSON(http.StatusOK, gin.H{"body": body})
	}
}
