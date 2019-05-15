const inherits = require('util').inherits

const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../../ui/app/actions')

module.exports = connect(mapStateToProps)(RevealSeedConfirmation)

inherits(RevealSeedConfirmation, Component)
function RevealSeedConfirmation () {
  Component.call(this)
}

function mapStateToProps (state) {
  return {
    warning: state.appState.warning,
  }
}

RevealSeedConfirmation.prototype.render = function () {
  const props = this.props

  return (

    h('.initialize-screen.flex-column.flex-center.flex-grow', {
      style: { maxWidth: '420px' },
    }, [

      h('h3.flex-center.section-title', {
        style: {
	    fontFamily: 'Nunito Semibold',
	    width: '95%',
	    boxSizing: 'border-box',
	    color: '#afd9ff',
	    backgroundImage: 'radial-gradient(farthest-side at 30% 0px, #265e98f5 0%, #061a2b 300px)',
	    boxShadow: 'rgba(41, 136, 185, 0.3) 0px 8px 16px 0px',
	    height: '49px',
	    margin: '1px 5px 15px',
	    padding: '20px',
	    borderRadius: '10px',
	    fontSize: '20px',
        },
      }, [
        h('.page-subtitle', 'Reveal Seed Words'),
      ]),

      h('div', {
        style: {
	    display: 'flex',
	    flexDirection: 'column',
	    justifyContent: 'center',
	    boxSizing: 'border-box',
	    color: 'black',
	    backgroundColor: 'rgb(255, 255, 255)',
	    backgroundImage: 'radial-gradient(farthest-side at 10% 0px, #d0d7eb 0%, #fafafd 300px)',
	    boxShadow: 'rgba(60, 29, 13, 0.3) 0px 8px 16px 0px',
	    margin: '-5px 4px 12px',
	    padding: '19px',
	    borderRadius: '10px',
	    height: '279px',
	    width: '340px',
        },
      }, [

        h('.error', 'Do not recover your seed words in a public place! These words can be used to steal all your accounts.'),

        // confirmation
        h('input.large-input', {
          type: 'password',
          id: 'password-box',
          placeholder: 'Enter your password to confirm',
          onKeyPress: this.checkConfirmation.bind(this),
          style: {
            marginTop: '20px',
          },
        }),

        (props.warning) && (
          h('span.error', {
            style: {
              margin: '20px 0',
            },
          }, props.warning.split('-'))
        ),

        props.inProgress && (
          h('span.in-progress-notification', 'Generating Seed...')
        ),

        h('.flex-row.flex-start.flex-right', {
          style: {
            marginTop: 20,
            width: '100%',
          },
        }, [
          // cancel
          h('button.btn-violet', {
            onClick: this.goHome.bind(this),
          }, 'Cancel'),

          // submit
          h('button', {
            style: { marginLeft: '50px' , width:'140px' },
            onClick: this.revealSeedWords.bind(this),
          }, 'Ok'),

        ]),
      ]),
    ])
  )
}

RevealSeedConfirmation.prototype.componentDidMount = function () {
  document.getElementById('password-box').focus()
}

RevealSeedConfirmation.prototype.goHome = function () {
  this.props.dispatch(actions.showConfigPage(false))
}

// create vault

RevealSeedConfirmation.prototype.checkConfirmation = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    this.revealSeedWords()
  }
}

RevealSeedConfirmation.prototype.revealSeedWords = function () {
  var password = document.getElementById('password-box').value
  this.props.dispatch(actions.requestRevealSeed(password))
}
