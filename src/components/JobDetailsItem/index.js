import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobDetailsItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = job

  return (
    <li>
      <Link to={`/jobs/${job.id}`} className="link">
        <div className="job-item">
          <div className="logo-title-container">
            <div className="company-logo-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
            </div>
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">
                <FaStar className="rating-icon" /> {rating}
              </p>
            </div>
          </div>

          <div className="job-details">
            <div className="job-annum-location-type">
              <div className="location-type-container">
                <p className="job-location">
                  <MdLocationOn className="location-icon" /> {location}
                </p>
                <p className="job-employment-type">
                  <BsBriefcaseFill className="employment-type-icon" />{' '}
                  {employmentType}
                </p>
              </div>
              <p className="job-package">{packagePerAnnum}</p>
            </div>
            <hr className="line" />
            <h2>Description</h2>
            <p className="job-description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobDetailsItem
