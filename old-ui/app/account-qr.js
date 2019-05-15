const PropTypes = require('prop-types')
const {PureComponent} = require('react')
const h = require('react-hyperscript')
const {qrcode: qrCode} = require('qrcode-npm')
const {connect} = require('react-redux')
const {isHexPrefixed} = require('ethereumjs-util')
const CopyButton = require('./components/copy/copy-button')

class AccountQrScreen extends PureComponent {
  static defaultProps = {
    warning: null,
  }

  static propTypes = {
    Qr: PropTypes.object.isRequired,
    warning: PropTypes.node,
  }

  render () {
    const {Qr, warning} = this.props
    const address = `${isHexPrefixed(Qr.data) ? 'ethereum:' : ''}${Qr.data}`
    const qrImage = qrCode(4, 'M')

    qrImage.addData(address)
    qrImage.make()

    return h('.main-container.flex-column', {
      key: 'qr',
      style: {
          justifyContent: 'center',
          paddingBottom: '45px',
          paddingLeft: '45px',
          paddingRight: '45px',
          alignItems: 'center',
          width: '88%',
          position: 'relative',
          minWidth: '298px',
          boxSizing: 'border-box',
          color: 'black',
          backgroundColor: 'rgb(255, 255, 255)',
          backgroundImage: 'radial-gradient(farthest-side at 10% 0px, #d0d7eb 0%, #fafafd 300px)',
          boxShadow: 'rgba(60, 29, 13, 0.3) 0px 8px 16px 0px',
          margin: '-8px 22px 12px',
          padding: '20px',
          borderRadius: '10px'
      },
    }, [

      warning ? h('span.error.flex-center', warning) : null,

      h('#qr-container.flex-column', {
        style: {
          marginTop: '15px',
        },
        dangerouslySetInnerHTML: {
          __html: qrImage.createTableTag(4),
        },
      }),
      h('.qr-header', Qr.message),
      h('.flex-row', [
        h('h3.ellip-address', {
          style: {
            width: '247px',
          },
        }, Qr.data),
        h(CopyButton, {
          value: Qr.data,
        }),
      ]),
    ])
  }
}

function mapStateToProps (state) {
  return {
    Qr: state.appState.Qr,
    warning: state.appState.warning,
  }
}

module.exports = connect(mapStateToProps)(AccountQrScreen)
