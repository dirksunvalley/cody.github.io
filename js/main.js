/** @jsx React.DOM */

var reactColorBlue = '#61dafb';
var reactColorBlack = '#222222';

var Container = React.createClass({displayName: 'Container',
	getInitialState: function() {
		return {seite: 1};
	},
	setSeite: function(neueSeite) {
		this.setState({seite: neueSeite});
	},
	render: function() {
		var aktuelleSeite = seiten[this.state.seite - 1];
		var style = {
			position: 'absolute',
			width: 800,
			height: 600
		};
		if (aktuelleSeite.background)
			style.background = aktuelleSeite.background;
		return (
			React.DOM.div( {ref:"surface", style:style},
				Titelbar( {seite:this.state.seite, setSeite:this.setSeite}),
				aktuelleSeite({seite:this.state.seite})
			)
		);
	}
});

var Titelbar = React.createClass({displayName: 'Titelbar',
	style: {
		background: reactColorBlue,
		padding: 10,
		borderBottom: '3px solid Blue',
		textAlign: 'center'
	},
	render: function() {
		return (
			React.DOM.div( {style:this.style},
				"Seite ", this.props.seite, " von ", seiten.length,
				React.DOM.span( {style:{margin: 10}} ),
				Input( {setSeite:this.props.setSeite} )
			)
		);
	}
});

var Input = React.createClass({displayName: 'Input',
	getInitialState: function() {
		return {value: ''};
	},
	onChange: function (event) {
		console.log(event.target.value);
		function imInverval(v) {return (v < seiten.length && v >= 0)}
		var inp = event.target.value;
		var out = '';
		var count = 0;
		for (var i=0; i<inp.length; i++) {
			if (inp[i]==='+' && imInverval(count+1)) {
				out += '+';
				count++;
			} else if (inp[i] === '-' && imInverval(count-1)) {
				out += '-';
				count--;
			}
		}
		this.setState({value: out});
		this.props.setSeite(count + 1);
	},
	render: function() {
		return (
			React.DOM.input( {value:this.state.value, onChange:this.onChange} )
		);
	}
});

var SeiteStart = React.createClass({displayName: 'SeiteStart',
	url: 'img/logo_og.png',
	statics: { background: reactColorBlack },
	render: function () {
		return (
			React.DOM.div(null,
				React.DOM.img( {style:{position:'absolute', width:200, left:0}, src:this.url} ),
				React.DOM.img( {style:{position:'absolute', width:200, right:0}, src:this.url} ),
				React.DOM.img( {style:{position:'absolute', width:200, right:0, bottom:0}, src:this.url} ),
				React.DOM.img( {style:{position:'absolute', width:200, left:0, bottom:0}, src:this.url} ),
				React.DOM.div( {style:{paddingTop:265, fontSize:24, color:reactColorBlue, textAlign:'center'}},
					React.DOM.b(null, "Die kleine React Show")
				)
			)
		);
	}
});

var SeiteFriendface = React.createClass({displayName: 'SeiteFriendface',
	render: function () {
		return (
			React.DOM.img( {style:{width:800}, src:"img/friendface.png"} )
		);
	}
});

var SeiteRoot = React.createClass({displayName: 'SeiteRoot',
	statics: { background: reactColorBlack },
	render: function () {
		return (
			React.DOM.div( {style:{fontSize: 40, color:'White'}, className:"mittig"},
				"Data changing over time is the",React.DOM.br(null),
				React.DOM.span( {style:{color:reactColorBlue}}, "root of all evil"),"."
			)
		);
	}
});

var SeiteVirtualDOM = React.createClass({displayName: 'SeiteVirtualDOM',
	// statics: { background: reactColorBlue },
	render: function () {
		return (
			React.DOM.div( {style:{fontSize: 30, padding: 30}},
				React.DOM.h2(null, "When the data changes, re-render.")
			)
		);
	}
});

var SeiteVirtualDOM2 = React.createClass({displayName: 'SeiteVirtualDOM2',
	// statics: { background: reactColorBlue },
	render: function () {
		return (
			React.DOM.div( {style:{fontSize: 30, padding: 30}},
				React.DOM.h2(null, "When the data changes, re-render."),
				React.DOM.ul(null,
					React.DOM.li(null, "Build a virtual DOM."),
					React.DOM.li(null, "Diff that virtual DOM with the previous one."),
					React.DOM.li(null, "Only update the real DOM with what actually changed.")
				)
			)
		);
	}
});

var Beispiel = React.createClass({displayName: 'Beispiel',
	render: function () {
		return (
			React.DOM.div( {className:"beispiel"},
				this.props.text
			)
		);
	}
});

var SeiteCode = React.createClass({displayName: 'SeiteCode',
	//statics: { background: reactColorBlue },
	style: {},
	render: function () {
		if (this.props.seite === 6)
			this.style.visibility = 'hidden';
		else
			delete this.style.visibility;
		var fontSize = (this.props.seite === 6) ? 30 : 16;
		return (
			React.DOM.div(null,
				Beispiel( {text:"Hallo Q4U!"} ),
				React.DOM.pre( {style:{fontSize: fontSize, margin: 10}},
					"var Beispiel = React.createClass(",'\u007b',React.DOM.br(null),
					'   ',"render: function () ", '\u007b',React.DOM.br(null),
					'      ',"return (",React.DOM.br(null),
					'         ','\u003c',"div className='beispiel'",'\u003e',React.DOM.br(null),
					'            ','\u007b',"this.props.text",'\u007d',React.DOM.br(null),
					'         ','\u003c',"/div",'\u003e',React.DOM.br(null),
					'      ',");",React.DOM.br(null),
					'   ','\u007d',React.DOM.br(null),
					'\u007d',");",React.DOM.br(null),React.DOM.br(null),
					"React.renderComponent(",React.DOM.br(null),
					'   ','\u003c',"Beispiel text='Hallo Q4U!' /",'\u003e',",",React.DOM.br(null),
					'   ',"document.getElementById('myId')",React.DOM.br(null),
					");",React.DOM.br(null),React.DOM.br(null),
					React.DOM.div( {style:this.style},
					React.DOM.div( {style:{background:'Bisque'}},
					"var Beispiel = React.createClass(",'\u007b',React.DOM.br(null),
					'   ',"render: function () ", '\u007b',React.DOM.br(null),
					'      ',"return (",React.DOM.br(null),
					'         ',React.DOM.span( {style:{color:'Red'}}, "React.DOM.div( ", '\u007b',"className: 'beispiel'",'\u007d',",",React.DOM.br(null),
					'            ',"this.props.text",React.DOM.br(null),
					'         ',")",React.DOM.br(null)),
					'      ',");",React.DOM.br(null),
					'   ','\u007d',React.DOM.br(null),
					'\u007d',");",React.DOM.br(null),React.DOM.br(null),
					"React.renderComponent(",React.DOM.br(null),
					'   ',React.DOM.span( {style:{color:'Red'}}, "Beispiel(",'\u007b',"text:\"Hallo Q4U!\"",'\u007d',"),"),React.DOM.br(null),
					'   ',"document.getElementById('myId')",React.DOM.br(null),
					");"
					))

				)
			)
		);
	}
});

var SeiteFlux = React.createClass({displayName: 'SeiteFlux',
	render: function () {
		return (
			React.DOM.img( {style:{width:800}, src:"img/dataevents.png"} )
		);
	}
});

var seiten = [
	SeiteStart,
	SeiteFriendface,
	SeiteRoot,
	SeiteVirtualDOM,
	SeiteVirtualDOM2,
	SeiteCode,
	SeiteCode,
	SeiteFlux
];

React.renderComponent(
	Container(null ),
	document.getElementById('content')
);
