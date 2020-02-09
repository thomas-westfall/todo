import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';
class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
      }
    }


    handleChangeUsername = (event) => {
      this.setState({username: event.target.value})
    }

    handleSubmit = async (submit) => {
      submit.preventDefault()
      axios.post(`https://cors-anywhere.herokuapp.com/https://hunter-todo-api.herokuapp.com/user`, {
        withCredentials: true,
      username: this.state.username
    })
      .then(response => {
        console.log(response)
        if(response.status  === 201) {
          this.props.history.push("/login");
        }
      })
    }
    render() {
    return (
        <div className='registerPage'>
          <form onSubmit={this.handleSubmit} className="form">
          <table className='LogInTable'>
            <thead>
              <tr><td colSpan={2}><h1 className="registerTitle">Sign Up</h1></td></tr>
            </thead>
            <tbody >
              <tr><td className="TextField">Username:</td><td className="inputField"><input type="text" className="Username" onChange={this.handleChangeUsername} /></td></tr>
              <tr><td colSpan={2}><button className="registerButton">Register</button></td></tr>
              <tr><td colSpan={2}><Link className="cancelButton"to ="/">Cancel</Link></td></tr>
              <tr></tr>
            </tbody>
          </table>
        </form>
        </div>
    )
  }
  }
    
export default withRouter(Register);