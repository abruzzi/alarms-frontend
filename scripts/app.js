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

var LegendComponent = React.createClass({
	render: function() {
		return (
			<div className={"count " + this.props.legend.proiority}>
				<i className="alarm"></i>
				<span>{this.props.legend.proiority} : {this.props.legend.count} </span>
			</div>
		);
	}
});

var EventWrapperComponent = React.createClass({
	getInitialState: function() {
		return {
			events: [],
			legends: []
		}
	},

	prepare: function(alarms) {
		return {
			events: _(alarms)
				.sortBy("occurrence")
				.reverse(),
			legends: _.chain(alarms)
				.groupBy("proiority")
				.map(function(value, key) {
					return {proiority: key, count: value.length};
				})
				.value()
		};
	},

	componentDidMount: function() {
		var that = this;
		$.get(this.props.url).done(function(alarms) {
			that.setState(that.prepare(alarms));
		});
	},

	render: function() {
	    return (
	    	<div>
		      <ul className="events">
		        {this.state.events.map(function(event) {
		        	return <li><EventComponent data={event} /></li>;
		        })}
		      </ul>

		      <ul className="legend">
				{this.state.legends.map(function(legend) {
					return <li><LegendComponent legend={legend} /></li>
				})}
			  </ul>
			</div>
	    );
	}
});

var ResultComponent = React.createClass({
	render: function() {
		var legends = [];
		return (
			<div>
				<h1>Active Event List in transmission</h1>
				<EventWrapperComponent url="/alarms.json"/>
			</div>
		)
	}
});

React.render(new ResultComponent(), document.getElementById("container"));
