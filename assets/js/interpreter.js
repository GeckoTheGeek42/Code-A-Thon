var printout = [];

// document.domain = "codeathonapp";

function submit() {
    var submit = $('.shell-submit');
    try {
        var code = $('#write').html().replace("<br>", "\n");
        console.log(code);
        var res = checker(code);
    } catch(e) {
        console.log("e" + e);
        if (e instanceof SyntaxError) {
            submit.html("Error &#10060;");
            $("#popup div").html("<h2><img src=\"images/exclamation.png\" alt=\"\" height=\"24\" width=\"24\"> Syntax Error</h2><p>" + e + "</p>");
            location.href = '#popup'
            setTimeout(function() {
                submit.html("Submit");
            }, 1000)
        } else {
            throw(e);
        }
        return false;
    } finally {
        setTimeout(clearPrintout, 1000);
    }
    if (res) {
        submit.html("Done &#10003;");
        if (!parent.finished[lvl - 1]) {
            parent.finished[lvl - 1] = true;
            parent.score += difficulty * 10;
            var thumbnail = parent.$('.thumbnail.level' + lvl + " img");
            var newpicdone = thumbnail.attr("src").slice(0, -4) + "-done.png";
            var nxlvl = lvl + 1;
            var thumbnail2 = parent.$('.thumbnail.level' + nxlvl + " img");
            var newpicunlocked = thumbnail2.attr("src").slice(0, -11) + ".png";
            thumbnail.attr("src", newpicdone);
            thumbnail2.attr("src", newpicunlocked);
            parent.$('#header .score').html("Score: " + parent.score)
        }
    } else {
        submit.html("Wrong &#10060;");
        setTimeout(function() {
            submit.html("Submit");
        }, 1000)
    }
    return res;
}

function check(text) {
    var results = [];
    inputs.forEach(function(e) {
        input1 = e;
        results.push(eval("(function() { " + text + " })()"));
    });
    return arraysEqual(results, outputs);
}

function checkPairs(text) {
    var results = [];
    zip(input1s, input2s).forEach(function(e) {
        input1 = e[0];
        input2 = e[1];
        results.push(eval("(function() { " + text + " })()"));
    });
    return arraysEqual(results, outputs);
}

function checkPrint(text) {
    var results = [];
    inputs.forEach(function(e) {
        input1 = e;
        $('.printout').append("in: " + input1);
        eval("(function() { " + text + " })()");
        results.push(printout);
        clearPrintout();
    });
    return metaArrayEquals(results, outputs);
}

function checkPrintPairs(text) {
    var results = [];
    zip(input1s, input2s).forEach(function(e) {
        input1 = e[0];
        input2 = e[1];
        $('.printout').append("in: " + input1 + ", " + input2);
        eval("(function() { " + text + " })()");
        results.push(printout);
        clearPrintout();
    });
    console.log(results);
    console.log(outputs);
    return metaArrayEquals(results, outputs);
}

function clearPrintout() {
    printout = [];
    setTimeout( function() { $('.printout').html("") }, 1000 );
}

function println(txt) {
    printout.push(txt);
    var text = String(txt)
    if ($('printout').html() != "") {
        $('.printout').append("<br>");
    }
    $('.printout').append(text.replace("\n", "<br>"));
    console.log(printout);
}

function print(text) {
	printout[printout.length - 1] += text;
    $('.printout').append(text);
}

function arraysEqual(a, b) {
    console.log("a: " + a);
    console.log("b: " + b);

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function metaArrayEquals(a, b) {
    console.log("a: " + a);
    console.log("b: " + b);

    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (!arraysEqual(a[i], b[i])) return false;
    }
    return true;
}

function zip(a, b) {
    return a.map(function(e, i) {
        return [a[i], b[i]];
    });
}