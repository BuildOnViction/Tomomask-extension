const inherits = require('util').inherits
const PersistentForm = require('../../../lib/persistent-form')
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')

module.exports = connect(mapStateToProps)(RestoreVaultScreen)

inherits(RestoreVaultScreen, PersistentForm)
function RestoreVaultScreen () {
  PersistentForm.call(this)
}

function mapStateToProps (state) {
  return {
    warning: state.appState.warning,
    forgottenPassword: state.appState.forgottenPassword,
  }
}

RestoreVaultScreen.prototype.render = function () {
  var state = this.props
  this.persistentFormParentId = 'restore-vault-form'

  return (

    h('div', {
      style: {
        width: '100%',
      },
    }, [
      h('.section-title2', { style: {
        height: '1px',
        width: '100%',
      }}),
      h('.initialize-screen.flex-column.flex-center.flex-grow', {
        style: {
          paddingLeft: '30px',
          paddingRight: '30px',
        },
      }, [
        h('h3.flex-center', {
          style: {
	    fontFamily: 'Nunito SemiBold',
	    background: 'rgb(255, 255, 255)',
	    fontSize: '16px',
	    width: '106%',
	    boxSizing: 'border-box',
	    color: 'white',
	    backgroundColor: 'rgb(255, 249, 162)',
	    backgroundImage: 'radial-gradient(farthest-side at 30% 0px, #00b8ff 0%, #061a2b 300px)',
	    boxShadow: 'rgb(8, 25, 51) 0px 8px 16px 0px',
	    height: '64px',
	    margin: '3px 11px 15px',
	    padding: '20px',
	    borderRadius: '10px'
          },
        }, [
          h('.page-subtitle', 'Restore Vault'),
        ]),

        // wallet seed entry
        h('h3.flex-left', {
          style: {
            width: '100%',
            marginBottom: '8px',
            fontFamily: 'Nunito SemiBold',
			  color: '#fff'
          },
        }, 'Wallet Seed'),
        h('textarea.twelve-word-phrase', {
          placeholder: 'Enter your secret twelve word phrase here to restore your vault.',
        }),

        // password
        h('input.large-input', {
          type: 'password',
          id: 'password-box',
          placeholder: 'New Password (min 8 chars)',
          dataset: {
            persistentFormId: 'password',
          },
          style: {
            width: '100%',
            marginTop: 20,
            border: '1px solid #e2e2e2',
			backgroundColor: '#e3e3ff'
          },
        }),

        // confirm password
        h('input.large-input', {
          type: 'password',
          id: 'password-box-confirm',
          placeholder: 'Confirm Password',
          onKeyPress: this.createOnEnter.bind(this),
          dataset: {
            persistentFormId: 'password-confirmation',
          },
          style: {
            width: '100%',
            marginTop: 20,
            border: '1px solid #e2e2e2',
			  backgroundColor: '#e3e3ff'
          },
        }),

        (state.warning) && (
          h('div', {
            style: {
              padding: '20px 0 0',
              width: '100%',
            },
          }, [
            h('div.error.in-progress-notification', state.warning),
          ])
        ),

        // submit

        h('.flex-row.flex-space-between.flex-right', {
          style: {
            marginTop: 20,
            width: '70%',
          },
        }, [

          // cancel
          h('button.btn-violet', {
            onClick: this.showInitializeMenu.bind(this),
          }, 'Cancel'),

          // submit
          h('button', {
            onClick: this.createNewVaultAndRestore.bind(this),
          }, 'Ok'),

        ]),
      ]),
    ])
  )
}

RestoreVaultScreen.prototype.showInitializeMenu = function () {
  if (this.props.forgottenPassword) {
    this.props.dispatch(actions.backToUnlockView())
  } else {
    this.props.dispatch(actions.showInitializeMenu())
  }
}

RestoreVaultScreen.prototype.createOnEnter = function (event) {
  if (event.key === 'Enter') {
    this.createNewVaultAndRestore()
  }
}

RestoreVaultScreen.prototype.createNewVaultAndRestore = function () {
  // check password
  var passwordBox = document.getElementById('password-box')
  var password = passwordBox.value
  var passwordConfirmBox = document.getElementById('password-box-confirm')
  var passwordConfirm = passwordConfirmBox.value
  if (password.length < 8) {
    this.warning = 'Password not long enough'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (password !== passwordConfirm) {
    this.warning = 'Passwords don\'t match'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // check seed
  var seedBox = document.querySelector('textarea.twelve-word-phrase')
  var seed = seedBox.value.trim()

  // true if the string has more than a space between words.
  if (seed.split('  ').length > 1) {
    this.warning = 'there can only be a space between words'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // true if seed contains a character that is not between a-z or a space
  if (!seed.match(/^[a-z ]+$/)) {
    this.warning = 'seed words only have lowercase characters'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (seed.split(' ').length !== 12) {
    this.warning = 'seed phrases are 12 words long'
    this.props.dispatch(actions.displayWarning(this.warning))
    return
  }
  // submit
  this.warning = null
  this.props.dispatch(actions.displayWarning(this.warning))
  this.props.dispatch(actions.createNewVaultAndRestore(password, seed))
}
