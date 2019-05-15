import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import actions from '../../../../ui/app/actions'

class SendHeader extends Component {
	static propTypes = {
		back: PropTypes.func,
		dispatch: PropTypes.func,
		address: PropTypes.string,
		title: PropTypes.string,
	}

	render () {
		return (
			<h3
				className="flex-center send-header"
				style={{
					
            width: '322px',
            boxSizing: 'border-box',
            color: 'black',
            backgroundColor: 'rgb(255, 255, 255)',
            backgroundImage: 'radial-gradient(farthest-side at 10% 0px, #d0d7eb 0%, #fafafd 300px)',
            boxShadow: 'rgba(60, 29, 13, 0.3) 0px 8px 16px 0px',
            margin: '39px 12px 12px',
            padding: '10px',
            borderRadius: '10px'
				}}
			>
				<i
					className="fa fa-arrow-left fa-lg cursor-pointer"
					style={{
						position: 'absolute',
						left: '30px',
					}}
					onClick={() => { this.props.back ? this.props.back() : this.back() }}
				/>
				{ this.props.title }
			</h3>
		)
	}

	back () {
		const address = this.props.address
		this.props.dispatch(actions.backToAccountDetail(address))
	}
}

function mapStateToProps (state) {
	const result = {
		address: state.metamask.selectedAddress,
	}

	return result
}

module.exports = connect(mapStateToProps)(SendHeader)
