package dbRepo

import (
	"fmt"
	"github.com/WISVCH/member-registration/entities"
	"reflect"
	"strings"
)

func (repo DBRepo) AddFormEntry(f entities.FormEntity) error {
	repo.logInfo("form", "adding form entry")
	var columnNames = dbFields(f)
	var columnNamesAsArg = strings.Join(columnNames, ",")
	var columnNamesAsVal = ":" + strings.Join(columnNames, ",:")
	var queryString = fmt.Sprintf(`INSERT INTO form_content (%s) VALUES (%s)`, columnNamesAsArg, columnNamesAsVal)
	_, err := repo.db.NamedExec(queryString, f)
	fmt.Print(err)
	return err
}

func (repo DBRepo) ListForms() ([]entities.FormEntity, error) {
	repo.logInfo("form", "listing forms")
	var formList []entities.FormEntity
	err := repo.db.Select(&formList,"SELECT * FROM form_content")
	if err != nil {
		fmt.Print(err)
	}
	return formList, err
}

func (repo DBRepo) GetFormEntity(id int) (entities.FormEntity, error) {
	repo.logInfo("form", "getting form")

	var form []entities.FormEntity
	//err := repo.db.Select(&form,"SELECT * FROM form_content LIMIT 1;")
	err := repo.db.Select(&form,`SELECT * FROM form_content WHERE id=$1 LIMIT 1`, id)
	fmt.Println(form)
	if err != nil {
		fmt.Print(err)
	}
	return form[0], err
}

func dbFields(values interface{}) []string {
	v := reflect.ValueOf(values)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	fields := []string{}
	if v.Kind() == reflect.Struct {
		for i := 0; i < v.NumField(); i++ {
			var field = v.Type().Field(i).Tag.Get("db")
			if field != "" && field != "id"{
				fields = append(fields, field)
			}
		}
		return fields
	}
	if v.Kind() == reflect.Map {
		for _, keyv := range v.MapKeys() {
			fields = append(fields, keyv.String())
		}
		return fields
	}
	panic(fmt.Errorf("DBFields requires a struct or a map, found: %s", v.Kind().String()))
}
