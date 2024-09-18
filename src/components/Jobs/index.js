import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import JobDetailsItem from '../JobDetailsItem'
import FilterGroup from '../FiltersGroup'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  noProducts: 'NO_PRODUCTS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusList.initial,
    jobs: [],
    salaryRangeId: '',
    employmentTypeIds: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {employmentTypeIds, salaryRangeId, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusList.loading})

    // Join the employment type IDs with commas
    const employmentType = employmentTypeIds.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      updatedData.length > 0
        ? this.setState({
            jobs: updatedData,
            apiStatus: apiStatusList.success,
          })
        : this.setState({apiStatus: apiStatusList.noProducts})
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  changeEmploymentType = (id, checked) => {
    this.setState(prevState => {
      const {employmentTypeIds} = prevState
      let updatedEmploymentTypeIds = employmentTypeIds
      if (checked) {
        updatedEmploymentTypeIds = [...employmentTypeIds, id]
      } else {
        updatedEmploymentTypeIds = employmentTypeIds.filter(type => type !== id)
      }
      return {employmentTypeIds: updatedEmploymentTypeIds}
    }, this.getJobs)
  }

  changeSalary = id => {
    this.setState({salaryRangeId: id}, this.getJobs)
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => {
    this.setState(
      {searchInput: '', employmentTypeIds: [], salaryRangeId: ''},
      this.getJobs,
    )
  }

  onSearch = () => {
    this.getJobs()
  }

  renderNoProductsView = () => (
    <div className="data-not-found-bg-container">
      <div>
        <img
          className="noJobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
      </div>
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsList = () => {
    const {jobs} = this.state

    return (
      <ul className="jobs-list">
        {jobs.map(job => (
          <JobDetailsItem key={job.id} job={job} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="error-msg">Oops! Something Went Wrong</h1>
      <p className="error-text">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    return (
      <div className="job-bg-container">
        <Header />
        <div className="jobs-container">
          <div className="filters-container">
            <FilterGroup
              changeEmploymentType={this.changeEmploymentType}
              changeSalary={this.changeSalary}
            />
          </div>
          <div className="jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="search"
                onChange={this.onChangeInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                className="search-btn"
              >
                <FaSearch className="search-icon" onClick={this.onSearch} />
              </button>
            </div>
            {apiStatus === apiStatusList.loading && this.renderLoadingView()}
            {apiStatus === apiStatusList.success && this.renderJobsList()}
            {apiStatus === apiStatusList.failure && this.renderFailureView()}
            {apiStatus === apiStatusList.noProducts &&
              this.renderNoProductsView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
