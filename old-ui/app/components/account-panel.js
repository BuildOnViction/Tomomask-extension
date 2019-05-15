const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const Identicon = require('./identicon')
const formatBalance = require('../util').formatBalance
const addressSummary = require('../util').addressSummary

module.exports = AccountPanel


inherits(AccountPanel, Component)
function AccountPanel () {
  Component.call(this)
}

AccountPanel.prototype.render = function () {
  var state = this.props
  var identity = state.identity || {}
  var account = state.account || {}
  var isFauceting = state.isFauceting

  var panelState = {
    key: `accountPanel${identity.address}`,
    identiconKey: identity.address,
    identiconLabel: identity.name || '',
    attributes: [
      {
        key: 'Address',
        value: addressSummary(identity.address),
      },
      balanceOrFaucetingIndication(account, isFauceting, state.network),
    ],
  }

  return (

    h('.identity-panel.flex-row.flex-space-between', {
      style: {
      width: '91%',
      boxSizing: 'border-box',
      color: 'white',
      backgroundColor: 'rgb(255, 249, 162)',
      backgroundImage: 'radial-gradient(farthest-side at 30% 0px, #00b8ff 0%, #061a2b 300px)',
      boxShadow: 'rgb(8, 25, 51) 0px 8px 16px 0px',
      height: '135px',
      margin: '3px 11px 15px',
      padding: '20px',
      borderRadius: '10px'
      },
      onClick: panelState.onClick,
    }, [

      // account identicon
      h('.identicon-wrapper.flex-column.select-none', [
        h(Identicon, {
          address: panelState.identiconKey,
          imageify: state.imageifyIdenticons,
          diameter: 60,
        }),
      ]),

      // account address, balance
      h('.identity-data.flex-column.flex-justify-center.flex-grow.select-none', [
        h('h2.font-medium', {
          style: {
            color: '#ffffff',
            marginBottom: '20px',
            lineHeight: '16px',
          },
        }, panelState.identiconLabel),
        panelState.attributes.map((attr, i) => {
          return h('.flex-row.flex-space-between', {
            key: '' + Math.round(Math.random() * 1000000),
          }, [
            h('label.font-pre-medium.no-select', {
              style: {
                color: '#ffffff',
                marginBottom: i === 0 ? '10px' : '0px',
                lineHeight: '14px',
              },
            }, attr.key),
            h('span.font-pre-medium', {
              style: {
                color: '#ffffff',
                lineHeight: '14px',
              },
            }, attr.value),
          ])
        }),
      ]),

    ])

  )
}

function balanceOrFaucetingIndication (account, isFauceting, network) {
  // Temporarily deactivating isFauceting indication
  // because it shows fauceting for empty restored accounts.
  if (/* isFauceting*/ false) {
    return {
      key: 'Account is auto-funding.',
      value: 'Please wait.',
    }
  } else {
    return {
      key: 'Balance',
      value: formatBalance(account.balance, undefined, undefined, network),
    }
  }
}
