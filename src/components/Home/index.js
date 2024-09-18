import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-component-container">
        <div className="card-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="text">
            Millions of people are searching for jobs,salary,infomation,company
            reviews.Find the job that fits tour abilities and potential
          </p>
          <Link to="/jobs">
            <button className="jobs-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
