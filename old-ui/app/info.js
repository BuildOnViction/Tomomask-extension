const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')

module.exports = connect(mapStateToProps)(InfoScreen)

function mapStateToProps (state) {
  return {}
}

inherits(InfoScreen, Component)
function InfoScreen () {
  Component.call(this)
}

InfoScreen.prototype.render = function () {
  const state = this.props
  const version = global.platform.getVersion()

  return (
    h('.flex-column.flex-grow', {
      style: {
        maxWidth: '400px',
      },
    }, [

      // subtitle and nav
      h('.section-title.flex-row.flex-center', [
        h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
          onClick: (event) => {
            state.dispatch(actions.goHome())
          },
          style: {
            position: 'absolute',
            left: '30px',
          },
        }),
        h('h2', 'Info'),
      ]),

	  // main view
	  h('.flex-column.flex-justify-center.flex-grow.select-none', [h('.flex-space-around', {
	    style: {
	      padding: '20px',
	      minWidth: '350px',
	boxSizing: 'border-box',
	color: 'black',
	backgroundColor: 'rgb(255, 255, 255)',
	backgroundImage: 'radial-gradient(farthest-side at 10% 0px, #d0d7eb 0%, #fafafd 300px)',
	boxShadow: 'rgba(60, 29, 13, 0.3) 0px 8px 16px 0px',
	margin: '-5px 4px 12px',
	padding: '20px',
	borderRadius: '10px',
	height: '397px'

	    }
	  }, [
	  // current version number

	  h('.info.info-gray', [h('div', 'TomoMask'), h('div', {
	    style: {
	      marginBottom: '10px'
	    }
	  }, 'Version: ' + version)]), h('hr', {
	    style: {
	      margin: '10px 0 ',
	      width: '7em'
	    }
	  }), h('div', {
	    style: {
	      marginBottom: '5px'
	    } }, [h('div', [h('a.info', {
	    href: 'https://tomochain.com/',
	    target: '_blank'
	  }, 'Official Website')]), h('div', [h('a.info', {
	    href: 'https://bitcointalk.org/index.php?topic=2021785.0',
	    target: '_blank'
	  }, 'BTC Thread')]), h('div', [h('a.info', {
	    href: 'https://github.com/tomochain',
	    target: '_blank'
	  }, 'Github')])]), h('hr', {
	    style: {
	      margin: '10px 0 ',
	      width: '7em'
	    }
	  }), h('div', {
	    style: {
	      paddingLeft: '0px'
	    } }, [h('div', [h('a.info', {
	    href: 'https://twitter.com/TomoChainANN',
	    target: '_blank'
	  }, 'Twitter')]), h('div', [h('a.info', {
	    href: 'https://t.me/tomochain',
	    target: '_blank'
	  }, 'Telegram')])]), h('div', [h('a.info', {
	    href: 'https://medium.com/tomochain',
	    target: '_blank'
	  }, 'Medium')
          ]),
        ]),
      ]),
    ])
  )
}

InfoScreen.prototype.navigateTo = function (url) {
  global.platform.openWindow({ url })
}

