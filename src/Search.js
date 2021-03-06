import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { searchText, showType, showStatus } from "./actions/searchActions"

class Search extends Component {
	constructor(props) {
		super(props)
		this.handleText = this.handleText.bind(this)
	}

	handleText(e) {
		this.props.dispatch(searchText(this.refs.searchText.value))
	}

	render() {
		// let nodeSelection = this.props.Props.nodeSelection
		// let formMethods = this.props.Props.formMethods
		return (
			<form>
				<div className="filter">
					<div className="formRow">
						<div className="radio">
							<span>Lost</span>
							<input
								type="radio"
								id="statusLost"
								value="lost"
								onClick={() => this.props.dispatch(showStatus())}
								checked={this.props.searchFields.showLost}
							/>
							<label htmlFor="statusLost" />
						</div>
						<div className="radio">
							<span>Found</span>
							<input
								type="radio"
								id="statusFound"
								value="found"
								onClick={() => this.props.dispatch(showStatus())}
								checked={this.props.searchFields.showFound}
							/>
							<label htmlFor="statusFound" />
						</div>
					</div>
					<div className="formRow">
						<div className="radio">
							<span>Dog</span>
							<input
								type="radio"
								id="typeDog"
								value="dog"
								onClick={() => this.props.dispatch(showType())}
								checked={this.props.searchFields.showDog}
							/>
							<label htmlFor="typeDog" />
						</div>
						<div className="radio">
							<span>Cat</span>
							<input
								type="radio"
								id="typeCat"
								value="cat"
								onClick={() => this.props.dispatch(showType())}
								checked={this.props.searchFields.showCat}
							/>
							<label htmlFor="typeCat" />
						</div>
					</div>
					<div className="formRow">
						<label>Search</label>
						<input
							id="search"
							type="text"
							ref="searchText"
							onChange={this.handleText}
						/>
					</div>
				</div>
			</form>
		)
	}
}

Search.propTypes = {
	searchFields: PropTypes.object.isRequired,
	searchFields: PropTypes.shape({
		showCat: PropTypes.bool.isRequired,
		showDog: PropTypes.bool.isRequired,
		showLost: PropTypes.bool.isRequired,
		showFound: PropTypes.bool.isRequired,
		searchText: PropTypes.string.isRequired
	})
}

export default connect(state => {
	return {
		searchFields: state.searchFields
	}
})(Search)
