var tokens = [];

$(function() {
    var $write = $('#write'),
        shift = false,
        capslock = false;

    $('#keyboard li').click(function() {
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        console.log("Char: " + character);

        var tokens_string = stringify(tokens);
        console.log($write.html() + " == " + tokens_string);
        if ($write.html() != tokens_string) {
            tokens.push( $write.html().replace(tokens_string, "") );
        }

        if ($this.hasClass('delete')) {
            tokens.pop();
            var text = stringify(tokens);
            $write.html(text);
            return false;
        }

        // Special characters
        // if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "<br>";

        if ((($this.hasClass('digit') || $this.hasClass('period')) && isNumeric(tokens[tokens.length - 1]))) {
            tokens[tokens.length - 1] += character;
        } else if ($this.hasClass('semicolon') || $this.hasClass('quote') || $this.hasClass('space') || $this.hasClass('tab') || $this.hasClass('return')
            || ($this.hasClass('paren') && (tokens[tokens.length - 1] == "println" || tokens[tokens.length - 1] == "print" || tokens[tokens.length - 1] == "pow" || tokens[tokens.length - 1] == "push" || tokens[tokens.length - 1] == "\""))) {
            tokens.push(character);
        } else if (tokens.length == 0 || tokens[tokens.length - 1] == "<br>" || tokens[tokens.length - 1] == "\t" || tokens[tokens.length - 1] == " ") {
            tokens.push(character);
        } else {
            tokens.push(character);
            character = " " + character;
        }

        console.log(tokens);
        console.log("newtokens: " + stringify(tokens));

        var ch = $write.html() + character;
        $write.html(ch);
    });
});

function isNumeric(num) {
    return !isNaN(num);
}

function stringify(arr) {
    if (arr.length == 0) {
        console.log("empty")
        return "";
    } else {
        return arr.reduce(function(acc, elem, idx, arr) {
            if (elem == "<br>" || elem == "\t" || elem == ";" || elem == "\"" || elem == "'" || elem == " " || elem == "println" || elem == "print")
                return acc + elem;
            else if ((elem == "(" || elem == ")") && (arr[idx-1] == "println" || arr[idx-1] == "print" || arr[idx-1] == "pow" || arr[idx-1] == "push" || arr[idx-1] == "\""))
                return acc + elem;
            else if (arr[idx - 1] == "<br>" || arr[idx - 1] == "\t" || arr[idx - 1] == " ")
                return acc + elem
            else if (arr[idx-1] == "\"")
                return acc + elem;

            return acc + " " + elem;
        })
    }
}

function eqAny(a, b) {

}