package dbConnector

import (
	"data-graph-backend/pkg/dataStructers"
	"data-graph-backend/pkg/utils"
	"database/sql"
	"errors"
	_ "github.com/lib/pq"
	"strconv"
	"strings"
)

type Company struct {
	id                   sql.NullInt32
	name                 sql.NullString
	namesimilarity       sql.NullInt32
	description          sql.NullString
	descsimilarity       sql.NullInt32
	employeeNum          sql.NullInt32
	foundationyear       sql.NullString
	companytypeenum      []uint8
	companytypename      sql.NullString
	ownerid              sql.NullInt32
	ownername            sql.NullString
	ownernamessimilarity sql.NullInt32
	address              sql.NullString
	iconpath             sql.NullString
	posX                 sql.NullInt32
	posY                 sql.NullInt32
}

func (c *Company) Transform() dataStructers.Company {
	c_ := dataStructers.Company{}
	c_.SetId(int(c.id.Int32))
	c_.SetName(c.name.String)
	c_.SetDescription(c.description.String)
	c_.SetEmployeeNum(int(c.employeeNum.Int32))
	str_ := c.companytypename.String
	str_ = strings.ReplaceAll(str_, ",", "\t")
	str_ = strings.ReplaceAll(str_, "{", "\t")
	str_ = strings.ReplaceAll(str_, "}", "\t")
	str_ = strings.ReplaceAll(str_, "\n", "\t")
	str_ = strings.ReplaceAll(str_, "\"", "")
	str := strings.Split(str_, "\t")
	c_.SetCompanyTypeName(utils.DeleteEmpty(str))
	c_.SetAddress(c.address.String)
	c_.SetFoundationYear(c.foundationyear.String)
	c_.SetIconPath(c.iconpath.String)
	c_.SetOwnerName(c.ownername.String)
	c_.PosX = int(c.posX.Int32)
	c_.PosY = int(c.posY.Int32)
	return c_
}

func (c *Company) GetName() string {
	return c.name.String
}

type Project struct {
	nodeId            sql.NullInt32
	projectId         sql.NullInt32
	name              sql.NullString
	nameSimilarity    sql.NullFloat64
	description       sql.NullString
	version           sql.NullString
	companyId         sql.NullInt32
	projectTypesId    []uint8
	projectTypesNames sql.NullString
	date              sql.NullString
	url               sql.NullString
	previousVersions  sql.NullString
	pressURL          sql.NullString
	posX              sql.NullInt32
	posY              sql.NullInt32
}

func (p *Project) GetName() string {
	return p.name.String
}

func (p *Project) Transform() (*dataStructers.Project, error) {
	p_ := dataStructers.Project{}
	p_.Id = int(p.nodeId.Int32)
	p_.ProjectId = int(p.projectId.Int32)
	p_.Name = p.name.String
	p_.Description = p.description.String
	p_.Version = p.version.String
	p_.Date = p.date.String
	p_.CompanyId = int(p.companyId.Int32)
	str_ := p.projectTypesNames.String
	str_ = strings.ReplaceAll(str_, ",", "\t")
	str_ = strings.ReplaceAll(str_, "{", "\t")
	str_ = strings.ReplaceAll(str_, "}", "\t")
	str_ = strings.ReplaceAll(str_, "\n", "\t")
	str_ = strings.ReplaceAll(str_, "\"", "")
	str := strings.Split(str_, "\t")
	p_.ProjectTypes = utils.DeleteEmpty(str)
	p_.Url = p.url.String
	p_.PressURL = p.pressURL.String
	str_ = p.previousVersions.String
	str_ = strings.ReplaceAll(str_, ",", " ")
	str_ = strings.ReplaceAll(str_, "{", " ")
	str_ = strings.ReplaceAll(str_, "}", " ")
	str_ = strings.ReplaceAll(str_, "\n", " ")
	str_ = strings.ReplaceAll(str_, "\"", "")
	str = strings.Fields(str_)
	lastNodes := make([]int, 0)
	for i := 0; i < len(str); i++ {
		num, err := strconv.Atoi(str[i])
		if err != nil {
			return nil, errors.New("Not number: " + str[i] + "\nERROR: " + err.Error())
		}
		lastNodes = append(lastNodes, num)
	}
	p_.PreviousNodeIds = lastNodes
	p_.PosX = int(p.posX.Int32)
	p_.PosY = int(p.posY.Int32)
	return &p_, nil
}

type Department struct {
	id   sql.NullInt32
	name sql.NullString
}

func (d *Department) Transform() dataStructers.Department {
	d_ := dataStructers.Department{}
	d_.Id = int(d.id.Int32)
	str_ := d.name.String
	str_ = strings.ReplaceAll(str_, "\n", "")
	str_ = strings.ReplaceAll(str_, "\"", "")
	d_.Name = str_
	return d_
}
