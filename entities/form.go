package entities

import (
	"time"
)

type FormEntity struct {
	Id              int `db:"id"`
	Gender          string `db:"gender" form:"gender"`
	FirstName       string `db:"first_name" form:"first_name"`
	Preposition     *string `db:"preposition" form:"preposition"`
	LastName        string `db:"last_name" form:"last_name"`
	Email           string `db:"email" form:"email"`
	PhoneMobile     string `db:"phone_number" form:"phone_number"`
	Study           string `db:"study" form:"study"`
	StartYear       string `db:"start_year" form:"start_year"`
	StudentNumber   string `db:"student_number" form:"student_number"`
	EmergencyName   string `db:"emergency_name" form:"emergency_name"`
	EmergencyPhone  string `db:"emergency_phone" form:"emergency_phone"`
	FullName        string `db:"full_name" form:"full_name"`
	StreetName      string `db:"street" form:"street_name"`
	HouseNumber     string `db:"street_number" form:"street_number"`
	PostCode        string `db:"postal_code" form:"postal_code"`
	City            string	`db:"place" form:"place"`
	Country         string    `db:"country" form:"country"`
	Initials        string    `db:"letters" form:"first_letters"`
	NetID           string    `db:"netid" form:"netid"`
	BirthDate		string    `db:"birth_date" form:"birth_date"`
	YearBookPer     bool      `db:"yearbook_permission" form:"yearbook_permission"`
	ActivityMail    bool      `db:"activity_mailing" form:"activity_mail"`
	CareerMail      bool      `db:"career_mailing" form:"career_mail"`
	EducationMail   bool      `db:"education_mailing" form:"education_mail"`
	Machazine       bool      `db:"machazine" form:"machazine"`
	Added           bool      `db:"added_to_ldb"`
	FreshMenWeekend bool      `db:"freshmen_weekend" form:"freshmen_weekend"`
	PaidStatus     *string    `db:"paid_status"`
	AmountPaid     float64    `db:"amount_paid"`
	CreatedAt       time.Time `db:"created_at"`
}
