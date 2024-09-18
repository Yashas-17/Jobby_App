import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterGroup extends Component {
  state = {profileDetails: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(updatedData)
      this.setState({profileDetails: updatedData})
    }
  }

  handleEmploymentTypeChange = event => {
    const {changeEmploymentType} = this.props
    changeEmploymentType(event.target.id, event.target.checked)
  }

  handleSalaryRangeChange = event => {
    const {changeSalary} = this.props
    changeSalary(event.target.id)
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, shortBio, profileImageUrl} = profileDetails
    console.log(name)
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt={name} className="profile-icon" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderEmploymentTypeView = () => (
    <div className="checkbox-container">
      <h2>Type of Employment</h2>
      <ul className="ul-container">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <input
              type="checkbox"
              className="input-ele"
              id={each.employmentTypeId}
              onChange={this.handleEmploymentTypeChange}
            />
            <label className="label-ele" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRangeView = () => (
    <div className="salary-filter-container">
      <h2>Salary Range</h2>
      <ul className="ul-container">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId}>
            <input
              type="radio"
              className="input-ele"
              id={each.salaryRangeId}
              name="salary"
              onChange={this.handleSalaryRangeChange}
            />
            <label className="label-ele" htmlFor={each.salaryRangeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  render() {
    return (
      <div>
        {this.renderProfileView()}
        {this.renderEmploymentTypeView()}
        {this.renderSalaryRangeView()}
      </div>
    )
  }
}

export default FilterGroup
