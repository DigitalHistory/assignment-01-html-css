/*
Problem 1:
*/

/*
BACKGROUND:
In chapter 2 of Eloquent Javascript, you learned how to make a simple ASCII-art
triangle (exercise 2.1) and how to combine multiple loops for complex effects
(exercise 2.3).

let's put these skills to use.  first, remember that you made that first triangle with a simple loop:

*
**
***
****
*****

There are at least two ways to do this. The author does it by
MODIFYING A VARIABLE WHILE LOOPING. THis is quite elegant:

for (var line = "*"; line.length < 6; line += "*") {
console.log(line);
}

This is a sophisticated use of of the loop condition -- study it until you understand it!

Another way is to use the built-in Javascript string method "repeat":

var height = 5
var dot = "*"
for (var y = 1; y<height; y++) {
console.log(dot.repeat(y));
}

Again, study this until you understand it.
*/

/*
PART A:

First, turn the code above into a FUNCTION called "makeTriangle". It
should take one parameter, "height", and produce a triangle of
asterisks of that height.
*/

//uncomment and fix:

var makeTriangle = function (height) {

  // build the for loop here.
  // remember to use the parameter that is being passed.
  // for (?;?;?) {
  //   console.log("??");
  // }
};

//tests
makeTriangle(5);
makeTriangle(8);

/*
PART B:

Now, instead of a simple triangle:
*
**
***
****
*****

Write a similar function that produces an OFFSET triangle:

    *
   **
  ***
 ****
*****

You will have to do a tiny bit of math. What's the relationship
between the spaces and the asterisks?
*/

var offsetTriangle = function (height) {
  // for (?;?;?) {
  //   console.log(something + something else);
};


//tests. Uncomment before submitting.
// offsetTriangle(5);
// offsetTriangle(8);

/*

PART C:

Now, write a function that will produce a perfect ASCII-art PYRAMID:
    *
   ***
  *****
 *******
*********

This is very similar to the last part, but the math is a tiny bit trickier.
 */

var makeTriangle = function (height) {
  // let's do this a slightly different way that
  // we did the last ones -- we'll build a multi-line string,
  // and then send the whole string to the console at the end
  // This is a good way to get i n the habit of RETURNING VALUES
  // rather than just printing directly.
  var v = "";
  // Loop -- we'll need "height" number of lines
  for (h = height; h>0; h--){
    // The line itself is composed of two parts:
    // an offset, and then at least one *.  In fact, there's
    // a very straightforward pattern to the number of *'s you need.

    // Now you need to build the offset.  You can do this with a loop, or with
    // the "repeat" method.

    //v+= something;

    // now add the asterisks.  Again, decide whether to use a loop or "repeat"

    //v+= somethingelse;

    // now and an end-of-line character
    v += "\n";
  }
  // output v  to the console
  console.log(v);
};

makeTriangle(13); // test your code by running it in the console

/*
EXTRA CREDIT:

Now, try to make a hollow, upside down V instead:
    *
   * *
  *   *
 *     *
*       *

Can you do it?
*/

var makeV = function (height) {
    // we'll need to create a string
    // to log to the console later
    var v = "";
    // Outer loop -- we'll need "height" number of lines
    for (h=height; h>0; h--){
        // The line itself is composed of several parts:
        // an offset, a *, and generally some spacing after the *
        // and a second *. There's one case when this isn't true --
        // when is it?
        // in any case you will need some inner loops here.
        // each loop should add some characters to v using v += ...
        // remember end-of-line is added to a string as "\n"

    }
    // output to the console
    console.log(v);
};

makeV(13); // test your code by running it in the console


/*
   2. Write a simple function "longest" to return the longest of two strings passed as parameters.

   Hint: This is really easy.

   First, remember that an "if" construct has the following form:

   if (test) {
   // do some stuff
   } else {
   //do some other thing instead
   }

  s1.length
   Also, remember that every string has a method "length" that returns its length,
   and that functions are defined using one of two forms:

   var NAME = function (parameter1, parameter2) {...body...}

   or

   function NAME (parameter1,parameter2) {...body...}

  Let's get in the habit of RETURNING values, rather than just logging directly to the console.
  so, be sure to do that.
*/

function longest (s1,s2) {
  // if (s1.length > s2.length) {
  //   return s1;
  // } else {
  //   return s2;
  // }
    // check which string is longer
    // if... then ...
    // otherwise something else
}

// check your code using these tests.
console.log(longest("Stephen Harper", "William Lyon Mackenzie King"));
console.log(longest("Pierre Elliott 2 Trudeau", "Justin Trudeau"));

/*
  3. Compute the length of a prime minster's reign. Given an object
  with attributes "PM", "From", and "To", return the string
  "PM's reign was N years long.", substituting the value of PM and the
  difference between To and From, in the appropriate places.

  This is also not that hard, but you have to remember what an "object" is in
  Javascript.  Remember, an object has the form:

var myObject = {
  "att1": "a string can go here",
  "att2": 23464, // or an integer
  "att3": ["or", "even", "an", "array"],
  "att4": {a1:"Wow!", a2:"objects can be attribute values too!"}
};

  You access the values with one of two syntaxes,

  myObject["att1"] or myObject.att1

  Either one of those will return "a string can go here", which is the
  VALUE of myObject's "att1" ATTRIBUTE.

  Now you just have to do some simple subtraction using the object's attributes.

*/

// complete this function
function computeReign (pm) {
  // declare a variable, let's call it "r", seting it equal to the
  // length of reign. Now declare another variable, let's call it "s",
  // and construct the desired sentence using the appropriate
  // attributes and variables.
  // finally, makre sure you return the sentence as the value of the function
  //return s;
  return;
}

// test with the following examples
var wl = {
    "PM": "Wilfred Laurier",
    "Party": "Liberal",
    "From": "1896",
    "To": "1911"
};

var wlmk = {
    "PM": "William Lyon Mackenzie King",
    "Party": "Liberal",
    "From": "1921",
    "To": "1926"
};

console.log(computeReign(wl));
console.log(computeReign(wlmk));



/*
  4. Write a function that takes the variable "ministers" as input
  and prints a set of sentences to the console:

  Wilfred Laurier was prime minister from 1896 to 1911.
  Robert L. Borden was prime minister from 1911 to 1920.
  Arthur Meighen was prime minister from 1920 to 1921.
  William Lyon Mackenzie King was prime minister from 1921 to 1926.

  Hint: "ministers" is an ARRAY of OBJECTS. The simplest way to solve this problem
  is to use the "for...of" loop syntax to loop through the array,
  and the object[attribute] or object.attribute reference format to access
  the internal components of the objects.

*/

var ministers = [ {
    "PM": "Wilfred Laurier",
    "Party": "Liberal",
    "From": "1896",
    "To": "1911"
}, {
    "PM": "Robert L. Borden",
    "Party": "Conservative/Unionist",
    "From": "1911",
    "To": "1920"
}, {
    "PM": "Arthur Meighen",
    "Party": "Conservative",
    "From": "1920",
    "To": "1921"
}, {
    "PM": "William Lyon Mackenzie King",
    "Party": "Liberal",
    "From": "1921",
    "To": "1926"
}];

function sentences(list) {
  // declare a variable
  // add name to the variable
  // add some text
  // add initial year
  // add some more text
  // add final year
  //what's left now?
}

//test -- retain when submitting.
console.log(sentences(ministers));

// DO NOT MODIFY -- FOR AUTOMATED TESTING ONLY
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  var exports = module.exports = {};
}
else {
  var exports = window.skeleton = {};
}

exports.ministers = ministers;
exports.wl = wl;
exports.wlmk = wlmk;
exports.sentences = sentences;
exports.makeV = makeV;
exports.longest = longest;
exports.computeReign=computeReign;
