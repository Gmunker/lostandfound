import React, {	Component } from "react"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom"
import "./App.css"
import Add from "./Add/"
import Detail from "./Detail/"
import Landing from "./Landing"
import List from "./List"
import Update from "./Update/"
import ScrollToTop from "./ScrollToTop"
import Login from "./Login/"
import RegionGmap from "./GoogleMap/RegionGmap"
import { connect } from "react-redux"
import { checkAuth } from "./actions/userActions"
import firebase from "./firebase"

let views = false

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			uid: null
		}
		this.incrementViews = this.incrementViews.bind(this)
		this.authTest = this.authTest.bind(this)
	}

	componentWillMount() {
		this.props.dispatch(checkAuth())
	}

	authTest() {
		const authUserTest = Object.keys(window.localStorage)
		.filter(item => item.startsWith('firebase:authUser'))[0]

		if (authUserTest) {
			return true
		} else {
			return false
		}
	}

	incrementViews() {
		views = true
	}


	render() { 
		const PrivateRoute = ({ component: Component, ...rest, auth }) => ( 
			<Route { ...rest }
				render={ props => 
				this.authTest() ? < Component { ...props } /> 
				: 
				<Redirect to="/login" /> } 
			/>
		)

	const LoginRoute = ({ component: Component, ...rest, auth }) => (
		<Route { ...rest } render={ props =>
			this.authTest() ? <Redirect to="/list" /> 
			: 
			< Component { ...props} /> }
		/>
	)

		return (
			<Router>
				<ScrollToTop>
					<Switch>
						<Route path="/regions" component={RegionGmap} />
						<Route path="/list" component={List} />
						<Route path="/dog/details/:id" component={Detail} />
						<Route path="/cat/details/:id" component={Detail} />
						<PrivateRoute 
							path="/add" component={Add} 
						/>
						<PrivateRoute
							path="/dog/update/:id"
							component={Update}
						/>
						<PrivateRoute
							path="/cat/update/:id"
							component={Update}
						/>
						<LoginRoute
							path="/login"
							component={Login}
						/>>
						<Route
							path="/"
							component={() => (
								<Landing views={views} incrementViews={this.incrementViews} />
							)}
						/>
					</Switch>
				</ScrollToTop>
			</Router>
		)
	}
}

export default connect((state) => {
	return {
		user: state.user
	}
})(App)