import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLoginSuccess: null,
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    this.setState({isLoginSuccess: true})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({isLoginSuccess: false, errorMessage: error})
  }

  getData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => (
    <div className='name-container'>
      <label htmlFor='name' className='label-ele'>
        USERNAME
      </label>
      <input
        type='text'
        className='inp-ele'
        id='name'
        placeholder='Username'
        onChange={this.onChangeName}
      />
    </div>
  )

  renderPassword = () => (
    <div className='password-container'>
      <label htmlFor='password' className='label-ele'>
        PASSWORD
      </label>
      <input
        type='password'
        className='inp-ele'
        id='password'
        placeholder='Password'
        onChange={this.onChangePassword}
      />
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }
    const {isLoginSuccess, errorMessage} = this.state
    return (
      <div className='login-bg-container'>
        <div className='card-container'>
          <div className='logo-container'>
            <img
              src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
              alt='website logo'
              className='logo-img'
            />
          </div>
          <form className='form-container' onSubmit={this.getData}>
            {this.renderUserName()}
            {this.renderPassword()}
            {isLoginSuccess === false && (
              <p className='error-msg'>* {errorMessage}</p>
            )}
            <button type='submit' className='login-btn'>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
