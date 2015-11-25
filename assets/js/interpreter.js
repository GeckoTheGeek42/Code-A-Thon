var printout = [];

function submit() {
	var res = checkPairs($('#write').html(), input1s, input2s, outputs);
	var submit = $('.shell-submit')
	if (res) {
		submit.html("Done &#10003;");
	} else {
		submit.html("Wrong &#10060;");
		setTimeout(function() {
			submit.html("Submit");
		}, 1000)
	}
}

function check(text, inputs, outputs) {
	var results = [];
	inputs.forEach(function(e) {
		input1 = e;	
		results.push( eval(text) );
	});
	return arraysEqual(results, outputs);
}

function checkPairs(text, input1s, input2s, outputs) {
	var results = [];
	zip(input1s, input2s).forEach(function(e) {
		input1 = e[0];	
		input2 = e[1];	
		results.push( eval(text) );
	});
	return arraysEqual(results, outputs);
}

function checkPrint(text, inputs) {
	var results = [];
	inputs.forEach(function(e) {
		input1 = e;	
		results.push( eval(text) );
	});
	return arraysEqual(results, printout);
}

function checkPrintPairs(text, input1s, input2s) {
	var results = [];
	zip(input1s, input2s).forEach(function(e) {
		input1 = e[0];	
		input2 = e[1];	
		results.push( eval(text) );
	});
	return arraysEqual(results, printout);
}

function println(text) {
	printout.push(text);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function zip(a, b) {
	return a.map(function (e, i) {
   		return [a[i], b[i]];
	});
}