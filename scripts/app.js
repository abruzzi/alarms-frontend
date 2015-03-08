var HeadingComponet = React.createClass({
	render: function() {
		return (
			<h1>{this.props.title}</h1>
		)
	}
});

var EventComponent = React.createClass({
	render: function() {
		return (
			<div className={"event " + this.props.data.proiority}>
				<h3>{this.props.data.summary} @ {this.props.data.node}</h3>
				<span className="date">{this.props.data.occurrence}</span>
			</div>		
		);
	}
});

var EventsComponent = React.createClass({
	getInitialState: function() {
		return {
			events: []
		}
	},

	componentDidMount: function() {
		$.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      success: function(alarms) {
	      	this.setState({events: alarms});
	      }.bind(this),
	      error: function(xhr, status, err) {
	      	console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},

	render: function() {
	    return (
	      <ul className="events">
	        {this.state.events.map(function(event) {
	          return <li><EventComponent data={event} /></li>;
	        })}
	      </ul>
	    );
	}
});

var LegendComponent = React.createClass({
	render: function() {
		return (
			<div className={"count " + this.props.legend.proiority}>
				<i className="alarm"></i>
				<span>{this.props.legend.proiority} : {this.props.legend.count} ></span>
			</div>
		);
	}
});

var LegendWrapperComponent = React.createClass({
	render: function() {
		var legends = this.props.legends;
		return (
			<ul className="legend">
			{
				legends.map(function(legend) {
					return <li><LegendComponent legend={legend} /></li>
				})
			}
			</ul>
		);
	}
});

var ResultComponent = React.createClass({
	render: function() {
		var legends = []
		return (
			<div>
				<HeadingComponet title="Active Event List in transmission"/>
				<EventsComponent url="/alarms.json"/>
				<LegendWrapperComponent legends={legends}/>
			</div>
		)
	}
});

React.render(new ResultComponent(), document.getElementById("container"));