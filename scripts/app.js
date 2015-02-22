$(function() {
	function update(container, key, data) {
		var compiled = _.template($("#"+container).html());
		
		var obj = {};
		obj[key] = data;

		var html = compiled(obj);
		$("."+container).html(html);
	}

	function updateEvents(alarms) {
		var events = _(alarms).sortBy("occurrence").reverse();
		update("events", "alarms", events);
	}

	function updateLegend(alarms) {
		var legends = _.chain(alarms).groupBy("proiority").map(function(value, key) {
			return {proiority: key, count: value.length};
		}).value();

		update("legend", "legends", legends);
	}

	$.get("/alarms.json").done(function(alarms) {
		updateEvents(alarms);
		updateLegend(alarms);
	});
});
