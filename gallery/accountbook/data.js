var common_month = 2;

var outgoing_types = [
	"Food",
	"Mobile",
	"Provision",
	"Clothing",
	"Culture",
	"Education",
	"Car",
	"Event",
	"Tax",
	"ETC"
];

var income_types = [
	"Salary",
	"Bonus"
];

var outgoing_data = [{
	date: "2016/03/04",
	memo: "Mcdonald - lunch",
	cash: 0,
	card: 8900,
	type: 0
}, {
	date: "2016/03/04",
	memo: "7 eleven - buy snack",
	cash: 0,
	card: 6250,
	type: 0
}, {
	date: "2016/03/07",
	memo: "7 eleven - buy snack",
	cash: 5360,
	card: 0,
	type: 0
}, {
	date: "2016/03/07",
	memo: "Homeplus - month's purchase food",
	cash: 0,
	card: 50530,
	type: 0
}, {
	date: "2016/03/07",
	memo: "Holly Beer - old boy network",
	cash: 0,
	card: 47500,
	type: 0
}, {
	date: "2016/03/19",
	memo: "Coupang - buy jeans",
	cash: 0,
	card: 33340,
	type: 3
}, {
	date: "2016/03/19",
	memo: "Coupang - buy SD card adapter",
	cash: 0,
	card: 10500,
	type: 5
}, {
	date: "2016/03/19",
	memo: "CGV - Movies",
	cash: 0,
	card: 18000,
	type: 4
}, {
	date: "2016/03/22",
	memo: "GS Caltex - transportation",
	cash: 50000,
	card: 0,
	type: 6
}, {
	date: "2016/03/24",
	memo: "KT - mobile phone charges",
	cash: 79000,
	card: 0,
	type: 1
}];

var income_data = [{
	date: "2016/03/24",
	memo: "Apple Corporation - salary",
	cash: 10000000,
	type: 0
}];

function addDefaultData(data, count) {
	for(var i = 0; i < count; i++) {
		data.push({
			date: "",
			memo: "",
			cash: "",
			card: "",
			type: ""
		});
	}
}

function getOutgoingDataForChart(data) {
	var newData = [];

	for(var i = 0; i < data.length; i++) {
		var d = data[i];

		if(d.date != "") {
			if (!newData[d.type]) {
				newData[d.type] = {
					cash: 0,
					card: 0
				}
			}

			newData[d.type].cash += d.cash;
			newData[d.type].card += d.card;
		}
	}

	for(var i = 0; i < outgoing_types.length; i++) {
		if(!newData[i]) {
			newData[i] = { cash: 0, card: 0 };
		}
	}

	return newData;
}

function getOutgoingTypes() {
	var types = [];

	for(var i = 0; i < outgoing_types.length; i++) {
		types.push({
			value: i,
			text: outgoing_types[i]
		});
	}

	return types;
}

function getOutgoingAndIncomeData(date) {
	var _ = jui.include("util.base"),
		date = _.dateFormat(new Date(2016, common_month, date), "yyyy/MM/dd"),
		obj = {
			outgoing: { count: 0, total: 0, list: [] },
			income: { count: 0, total: 0, list: [] }
		};

	for(var i = 0; i < outgoing_data.length; i++) {
		var d = outgoing_data[i];

		if(d.date == date) {
			obj.outgoing.count += 1;
			obj.outgoing.total += (d.card + d.cash);
			obj.outgoing.list.push(d);
		}
	}

	for(var i = 0; i < income_data.length; i++) {
		var d = income_data[i];

		if(d.date == date) {
			obj.income.count += 1;
			obj.income.total += d.cash;
			obj.income.list.push(d);
		}
	}

	return (obj.outgoing.count == 0 && obj.income.count == 0) ? null : obj;
}

addDefaultData(outgoing_data, 1);
addDefaultData(income_data, 25);