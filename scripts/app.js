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

var HeadingComponet = React.createClass({
	render: function() {
		return (
			<h1>{this.props.title}</h1>
		)
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

var EventsComponent = React.createClass({
	render: function() {
		var events = this.props.events;
	    return (
	      <ul className="events">
	        {events.map(function(event) {
	          return <li><EventComponent data={event} /></li>;
	        })}
	      </ul>
	    );
	}
});

// var heading = new HeadingComponet({"title": "Active Event List in transmission"});
var events = [
	{
		"node": "VIQ002",
		"summary": "heartbeat failure",
		"occurrence": "2/12/2015 01:23 AM",
		"proiority": "critical"
	},
	{
		"node": "VIQ002",
		"summary": "packages are rejected",
		"occurrence": "2/12/2015 01:22 AM",
		"proiority": "major"
	},
	{
		"node": "VIQ002",
		"summary": "connection cannot be established",
		"occurrence": "2/11/2015 01:23 AM",
		"proiority": "medium"
	},
	{
		"node": "VIQ001",
		"summary": "packages are rejected",
		"occurrence": "2/11/2015 01:23 AM",
		"proiority": "warning"
	},
	{
		"node": "VIQ001",
		"summary": "connection cannot be established",
		"occurrence": "2/09/2015 01:23 AM",
		"proiority": "medium"
	},
	{
		"node": "VIQ001",
		"summary": "packages are rejected",
		"occurrence": "2/10/2015 01:23 AM",
		"proiority": "warning"
	},
		{
		"node": "VIQ002",
		"summary": "packages are rejected",
		"occurrence": "1/12/2015 01:22 AM",
		"proiority": "major"
	},
	{
		"node": "VIQ002",
		"summary": "connection cannot be established",
		"occurrence": "1/11/2015 01:23 AM",
		"proiority": "medium"
	},
	{
		"node": "VIQ001",
		"summary": "packages are rejected",
		"occurrence": "2/01/2015 05:23 AM",
		"proiority": "warning"
	},
	{
		"node": "VIQ001",
		"summary": "health check status unknown",
		"occurrence": "2/02/2015 03:23 AM",
		"proiority": "indeterminate"
	}
];

var ResultComponent = React.createClass({
	render: function() {
		return (
			<div>
				<HeadingComponet title={this.props.title}/>
				<EventsComponent events={this.props.events}/>
			</div>
		)
	}
});

React.render(new ResultComponent({
	"title": "Active Event List in transmission",
	"events": events
}), document.getElementById("container"));

// $(function() {
// 	function update(container, key, data) {
// 		var compiled = _.template($("#"+container).html());
		
// 		var obj = {};
// 		obj[key] = data;

// 		var html = compiled(obj);
// 		$("."+container).html(html);
// 	}

// 	function updateEvents(alarms) {
// 		var events = _(alarms).sortBy("occurrence").reverse();
// 		update("events", "alarms", events);
// 	}

// 	function updateLegend(alarms) {
// 		var legends = _.chain(alarms).groupBy("proiority").map(function(value, key) {
// 			return {proiority: key, count: value.length};
// 		}).value();

// 		update("legend", "legends", legends);
// 	}

// 	$.get("/alarms.json").done(function(alarms) {
// 		updateEvents(alarms);
// 		updateLegend(alarms);
// 	});
// });
