/*
  Problem 1: 
  In chapter 2 of Eloquent Javascript, you learned how to make a simple ASCII-art
  triangle (exercise 2.1) and how to combine multiple loops for complex effects
  (exercise 2.3). Now, write a function that will produce a perfect ASCII-art V:
      *
     * *
    *   *
   *     *
  *       *

  This is trickier than it looks, so I've given you some starter code below. Fill it in
  until it works.  Test it in your browser console, or in the Eloquent Javascript coding sandbox.  

  Hint: your function will need to create loops inside loops. For each line, there is an initial offset,
  an asterisk, and then more spaces. In all but one cases there is then a final asterisk.  I'll leave 
  the math for you to figure out.  
*/

var makeV = function (height) {
    // we'll need to create a string
    // to log to the console later
    var v = "";
    // Outer loop -- we'll need "height" number of lines
    for (h=??; ??; h??){
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
}

makeV(13); // test your code by running it in the console


/* 
   2. Write a simple function "longest" to return the longest of two strings passed as parameters.

   Hint: This is really easy, remember that every string has a method "length" that returns its length,
   and that functions are defined using the form:

   function NAME (parameter1,parameter2) {...body...}

*/

function longest (s1,s2) {
    // do stuff here
    return something;
}

// check your code using these tests.
console.log(longest("Stephen Harper", "William Lyon Mackenzie King"));
console.log(longest("Pierre Elliott Trudeau", "Justin Trudeau"));

/*
  3. Compute the length of a prime minster's reign. Given an object 
  with attributes "PM", "From", and "To", return the string 
  "PM's reign was N years long.", substituting the value of PM and the
  difference between To and From, in the appropriate places.  

*/

function computeReign (pm) {
    // compute the length of reign
    // generate a string "s"
    // return the string
    return s;
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
    // do stuff here
}

sentences(ministers);

