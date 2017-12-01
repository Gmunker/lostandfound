import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import icon from "./images/icon.png"
import { logout } from "./actions/userActions"
import firebase from "firebase"

class Navigation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			auth: false,
			redirect: false
		}
		this.handleLogout = this.handleLogout.bind(this)
	}

	componentWillMount() {
		this.listener = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState((state, props) => {
					return { auth: true }
				})
			} else {
				this.setState((state, props) => {
					return { auth: false }
				})
			}
		})
	}

	componentWillUnmount() {
		this.listener()
	}

	handleLogout() {
		this.props.dispatch(logout())
		this.setState({ redirect: true })
	}

	render() {
		return (
			<nav className="mainNavigation">
				<ul>
					<Link to="/">
						<img src={icon} alt="Hip Lost and Found Pets Icon" />
					</Link>
					{this.state.auth ? (
						<Link to="/add">
							<li>Add New Animal</li>
						</Link>
					) : null}
					<Link to="/list">
						<li>View List</li>
					</Link>
					{this.state.auth ? (
						<div onClick={this.handleLogout}>
							<li>Logout</li>
						</div>
					) : (
						<Link to="/login">
							<li>Login</li>
						</Link>
					)}
					{this.state.redirect ? <Redirect to="/" /> : null}
				</ul>
			</nav>
		)
	}
}

export default connect(state => {
	return {
		user: state.user
	}
})(Navigation)
