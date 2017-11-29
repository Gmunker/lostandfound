import React, { Component } from "react"
import { connect } from "react-redux"
import validator from "validator"
import Navigation from "../Navigation"
import LoginForm from "./Login"
import { login, logout } from "../actions/userActions"
import Footer from "../Footer"
import { Redirect } from "react-router-dom"

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: "",
			password: ""
		}
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleUsername(e) {
		let email = validator.isEmail(e.target.value) ? e.target.value : null
		this.setState((state, props) => {
			return {
				...state,
				email
			}
		})
	}

	handlePassword(e) {
		let password = e.target.value.length > 5 ? e.target.value : null
		this.setState((state, props) => {
			return {
				...state,
				password
			}
		})
	}

	handleLogin(e) {
		e.preventDefault()
		this.props.dispatch(login(this.state.email, this.state.password))
	}

	handleLogout() {
		this.props.dispatch(logout())
	}

	render() {
		let Props = {
			Username: {
				label: "Username",
				name: "email",
				ref: "email",
				id: "email",
				minLength: "7",
				onChange: this.handleUsername,
				value: this.state.email
			},
			Password: {
				label: "Password",
				name: "password",
				id: "password",
				ref: "password",
				minLength: "7",
				type: "password",
				onChange: this.handlePassword,
				value: this.state.password
			},
			Methods: {
				handleLogin: this.handleLogin,
				handleLogout: this.handleLogout
			}
		}
		return (
			<div className="content">
				<Navigation />
				{/* {this.props.user.uid ? <Redirect to="/list" /> : null} */}
				<LoginForm Props={Props} />
				<Footer />
			</div>
		)
	}
}

export default connect(state => {
	return {
		user: state.user
	}
})(Login)
