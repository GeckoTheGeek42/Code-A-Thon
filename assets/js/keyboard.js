var tokens = [];

$(function() {
    var $write = $('#write'),
        shift = false,
        capslock = false;

    $('#keyboard li').click(function() {
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        console.log(character)

        // Delete
        // if ($this.hasClass('delete')) {
        //     var html = $write.html();

        //     $write.html(html.substr(0, html.length - 1));
        //     return false;
        // }

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
        if ($this.hasClass('return')) character = "\n";

        if ($this.hasClass('digit') && isNumeric(tokens[tokens.length - 1])) {
            tokens[tokens.length - 1] += character;
        } else {
            tokens.push(character);
            character = " " + character;
        }

        console.log(tokens);

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
            if (elem == "\n" || elem == "\t") return acc + elem;
            return acc + " " + elem;
        })
    }
}