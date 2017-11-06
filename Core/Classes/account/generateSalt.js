var m = function (){

	var min = 1000;
	var max = 9999;

	return parseInt(Math.random() * (max - min) + min);
}


module.exports = m;