$(function() {
	$.get("/alarms.json").done(function(alarms) {
		var eventCompiled = _.template($("#events").html());

		var events = _(alarms).sortBy("occurrence").reverse();
		var eventHTML = eventCompiled({"alarms": events});

		$(".events").html(eventHTML);

		var legendCompiled = _.template($("#legend").html());
		var legends = _.chain(alarms).groupBy("proiority").map(function(value, key) {
			return {proiority: key, count: value.length};
		}).value();

		var legendHTML = legendCompiled({"legends": legends});
		$(".legend").html(legendHTML);
	});
});
