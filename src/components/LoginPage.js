import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }
  componentDidMount(){
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }
  handleSubmit = async (submit) => {
    submit.preventDefault()
    const userToLog = {
      "username": this.state.username,
    }
   await this.props.logIn(userToLog)
   
    if(this.props.isLoggedIn) {
      this.props.history.push("/home");
    }
  }
  
  render() {
    return (
      <div className="LogInPage">
        <form onSubmit={this.handleSubmit} className="form">
          <table className='LogInTable'>
            <thead>
              <tr><td colSpan={2}><h1 className="LogInTitle">Welcome</h1></td></tr>
            </thead>
            {this.props.isLoggedIn ? 
            <tbody>
              <tr><td>Successfully Logged in!</td></tr>
              <tr><td><Link to ="/home">Go to Home</Link></td></tr>
            </tbody>
            :
            <tbody >
              <tr><td className="TextField">Username:</td><td className="inputField"><input type="text" className="Username" onChange={this.handleChangeUsername} /></td></tr>
              <tr><td colSpan={2} className="ErrorDisplay">{this.props.error ? this.props.error.data : ""}</td></tr>
              <tr><td colSpan={2}><button className="LoginButton">Login</button></td></tr>
              <tr><td colSpan={2} className="RegisterLink">Don't have an account? <Link to="/register">Register</Link></td></tr>
            </tbody>
            }
          </table>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginPage);