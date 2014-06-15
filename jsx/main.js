/** @jsx React.DOM */

var reactColorBlue = '#61dafb';
var reactColorBlack = '#222222';

var Container = React.createClass({
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
			<div ref='surface' style={style}>
				<Titelbar seite={this.state.seite} setSeite={this.setSeite}/>
				{aktuelleSeite({seite:this.state.seite})}
			</div>
		);
	}
});

var Titelbar = React.createClass({
	style: {
		background: reactColorBlue,
		padding: 10,
		borderBottom: '3px solid Blue',
		textAlign: 'center'
	},
	render: function() {
		return (
			<div style={this.style}>
				Seite {this.props.seite} von {seiten.length}
				<span style={{margin: 10}} />
				<Input setSeite={this.props.setSeite} />
			</div>
		);
	}
});

var Input = React.createClass({
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
			<input value={this.state.value} onChange={this.onChange} />
		);
	}
});

var SeiteStart = React.createClass({
	url: 'img/logo_og.png',
	statics: { background: reactColorBlack },
	render: function () {
		return (
			<div>
				<img style={{position:'absolute', width:200, left:0}} src={this.url} />
				<img style={{position:'absolute', width:200, right:0}} src={this.url} />
				<img style={{position:'absolute', width:200, right:0, bottom:0}} src={this.url} />
				<img style={{position:'absolute', width:200, left:0, bottom:0}} src={this.url} />
				<div style={{paddingTop:265, fontSize:24, color:reactColorBlue, textAlign:'center'}}>
					<b>Die kleine React Show</b>
				</div>
			</div>
		);
	}
});

var SeiteFriendface = React.createClass({
	render: function () {
		return (
			<img style={{width:800}} src='img/friendface.png' />
		);
	}
});

var SeiteRoot = React.createClass({
	statics: { background: reactColorBlack },
	render: function () {
		return (
			<div style={{fontSize: 40, color:'White'}} className='mittig'>
				Data changing over time is the<br/>
				<span style={{color:reactColorBlue}}>root of all evil</span>.
			</div>
		);
	}
});

var SeiteVirtualDOM = React.createClass({
	// statics: { background: reactColorBlue },
	render: function () {
		return (
			<div style={{fontSize: 30, padding: 30}}>
				<h2>When the data changes, re-render.</h2>
			</div>
		);
	}
});

var SeiteVirtualDOM2 = React.createClass({
	// statics: { background: reactColorBlue },
	render: function () {
		return (
			<div style={{fontSize: 30, padding: 30}}>
				<h2>When the data changes, re-render.</h2>
				<ul>
					<li>Build a virtual DOM.</li>
					<li>Diff that virtual DOM with the previous one.</li>
					<li>Only update the real DOM with what actually changed.</li>
				</ul>
			</div>
		);
	}
});

var Beispiel = React.createClass({
	render: function () {
		return (
			<div className='beispiel'>
				{this.props.text}
			</div>
		);
	}
});

var SeiteCode = React.createClass({
	//statics: { background: reactColorBlue },
	style: {},
	render: function () {
		if (this.props.seite === 6)
			this.style.visibility = 'hidden';
		else
			delete this.style.visibility;
		var fontSize = (this.props.seite === 6) ? 30 : 16;
		return (
			<div>
				<Beispiel text='Hallo Q4U!' />
				<pre style={{fontSize: fontSize, margin: 10}}>
					var Beispiel = React.createClass({'\u007b'}<br/>
					{'   '}render: function () {'\u007b'}<br/>
					{'      '}return (<br/>
					{'         '}{'\u003c'}div className='beispiel'{'\u003e'}<br/>
					{'            '}{'\u007b'}this.props.text{'\u007d'}<br/>
					{'         '}{'\u003c'}/div{'\u003e'}<br/>
					{'      '});<br/>
					{'   '}{'\u007d'}<br/>
					{'\u007d'});<br/><br/>
					React.renderComponent(<br/>
					{'   '}{'\u003c'}Beispiel text='Hallo Q4U!' /{'\u003e'},<br/>
					{'   '}document.getElementById('myId')<br/>
					);<br/><br/>
					<div style={this.style}>
					<div style={{background:'Bisque'}}>
					var Beispiel = React.createClass({'\u007b'}<br/>
					{'   '}render: function () {'\u007b'}<br/>
					{'      '}return (<br/>
					{'         '}<span style={{color:'Red'}}>React.DOM.div( {'\u007b'}className: 'beispiel'{'\u007d'},<br/>
					{'            '}this.props.text<br/>
					{'         '})<br/></span>
					{'      '});<br/>
					{'   '}{'\u007d'}<br/>
					{'\u007d'});<br/><br/>
					React.renderComponent(<br/>
					{'   '}<span style={{color:'Red'}}>Beispiel({'\u007b'}text:"Hallo Q4U!"{'\u007d'}),</span><br/>
					{'   '}document.getElementById('myId')<br/>
					);
					</div></div>

				</pre>
			</div>
		);
	}
});

var SeiteFlux = React.createClass({
	render: function () {
		return (
			<img style={{width:800}} src='img/dataevents.png' />
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
	<Container />,
	document.getElementById('content')
);
