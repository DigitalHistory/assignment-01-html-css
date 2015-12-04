# Web Skills Assignment: Goal

You do not have to become a coder to do well in this course.  However, you *will* have to be willing to explore technical skills that you might not otherwise develop as a humanities scholar.  In this assignment, you will learn *very basic* web coding skills and apply them to a simple problem. The goal of the assignment is to provide you with basic technical knowledge that you will need for later assignments.  

# Expectations

Like all assignments in this class, this one is graded pass/fail. You will only get credit if your code runs as required. To pass the assignment, you must:

-   submit all materials in a zipped directory via the course Blackboard site AND via Dropbox upload to the link that has been mailed to you
-   complete the HTML & CSS course at codeacademy, and include a link to your profile at the top of the index.html file in the directory
-   complete the code for the Javascript questions in skeleton.js so that the output of your functions is precisely as requested
-   modify link-minsters.js according to the instructions below, so that the appropriate changes appear when index.html is loaded in a browser

# Details

First, download all the files in this repository to your computer by clicking the &ldquo;Download Zip&rdquo; button in the top right of this web page. You will need to &ldquo;unzip&rdquo; the files and edit them directly. [Ask Google how to do this if you don't already know how](https://www.google.ca/search?q=unzipping+files+mac+windows&ie=utf-8&oe=utf-8&gws_rd=cr&ei=EIJgVueMGYHq-QGPt6_YCQ). 

Web pages are composed of three components:  HTML, CSS, and Javascript.  HTML provides the *structure and content* of a web page; CSS controls the *style of presentation*; and Javascript permits *dynamic modification* of both.  To explore the web from the inside, you need to be a little bit comfortable in all three. 

## Part 1 - HTML and CSS

Codeacademy.com is a platform that focusses on teaching web skills; [head over there and set up an account](http://www.codecademy.com/). Once you&rsquo;ve done that, simply complete the [HTML & CSS](http://www.codecademy.com/tracks/web) course.

When you have finished this course, embed a link to your *profile page* (click &ldquo;view my Profile&rdquo; under the top right menu item with your picture on it) in your copy of `index.html` (right next to this file).  That&rsquo;s all! But feel free to continue exploring on Codeacademy &#x2013; there&rsquo;s lots to learn and much of it will be helpful to this course, or to your further explorations in this field.

## Part 2 - Javascript

For Javascript, we will use the excellent online book [Eloquent Javascript](http://eloquentjavascript.net/) as a textbook. Read Chapters 1-4 and, importantly, **do all the exercises** using [the code sandbox](http://eloquentjavascript.net/code/). Some of the discussion, especially in chapter 13, may be hard to follow. The exercises may also be quite hard. It is fair to give up and look at the solutions; but be sure you understand the solutions once you&rsquo;ve looked at them.

Let me stress this strongly: you almost certainly will not be able to do the exercises without doing the reading.  

Once you have read the textbook and done the exercises, you should find this part of the assignment very straightforward. Complete the code in &ldquo;skeleton.js&rdquo; according to instructions.  Check your code by testing it in the [EJ code sandbox](http://eloquentjavascript.net/code/), [Firefox Scratchpad](https://developer.mozilla.org/en/docs/Tools/Scratchpad), or the [Chrome console](https://developers.google.com/web/tools/chrome-devtools/debug/console/).  I have written tests for you which will produce the appropriate output when your code is correct.  

## Part 3 - Javascript in the Browser

We will continue to read *Eloquent Javascript*, this time chapters [12](http://www.eloquentjavascript.net/12_browser.html) and [13](http://eloquentjavascript.net/13_dom.html). Again, read the chapters and do the exercises; if the exercises are too hard, look at the answers but **be sure you understand them**.  

<./index.html> is a very simple html file that contains a table of prime ministers.  Your task is write one or more functions that will **add links to the Wikipedia pages of all the prime ministers**.  

Look at the structure of the table. Each row looks like this:

    <tr>
      <td class="PM">John Sparrow David Thompson</td>
      <td class="Party">Conservative</td>
      <td class="From">1892</td>
      <td class="To">1894</td>
    </tr>

Your code should change that to this:

    <tr>
      <td class="PM"><a href="https://en.wikipedia.org/wiki/John_Sparrow_David_Thompson">John Sparrow David Thompson</a></td>
      <td class="Party">Conservative</td>
      <td class="From">1892</td>
      <td class="To">1894</td>
    </tr>

Rather than asking you to include your code directly in `index.html`, I have provided a script tag at the end of the file which loads the file `ministers.js`.  There is some template code in that file already; complete the template and test your code by (re)loading index.html in your browser.

I myself will test your code by loading the page and clicking on the links.  They should all point to Wikipedia pages.

**Hints:** In this exercise we are beginning to actually do a form of digital history. Notice that we are treating *text* as *data*: transforming names into &ldquo;pointers&rdquo; that give us access to further information.  

This is made possible because the webpage itself is already well-structured.  Notice the class attribute on each `<td>` element:

    <td class="PM">John Sparrow David Thompson</td>

Now, consider the structure of Wikipedia links:

    https://en.wikipedia.org/wiki/John_Sparrow_David_Thompson

Note they always consist of &ldquo;<https://en.Wikipedia.org/wiki/>&rdquo; + A\_Name\_With\_Spaces\_Replaced\_By\_Underscores.  But, lucky you, *Wikipedia will rewrite spaces as underscores for you!* If you would like to try to do that part yourself, take a look at [the Javascript string replace method](http://www.w3schools.com/jsref/jsref_replace.asp).  

We will use skills developed in the exercises from chapter 13. Your function will have to:

-   *find and collect* all the elements with the class &ldquo;PM&rdquo;. The method you will need to use is mentioned only once in chapter 13, under &ldquo;Finding Elements.&rdquo;
-   *clear* the existing text node.
-   *add a child node* of type &ldquo;a&rdquo; with text content that comes from the original content, and a link that is constructed of the Wikipedia address prefix + the original content.

If you find this is too easy: wikify **all** the fields in each row.  Now click on the &ldquo;party&rdquo; links. What could you do to fix them? Also, can you change the background color of one or more classes? 

P.S. &#x2013; you may find it useful to look at the script I used to generate the table. You will find it in make-minister-table.js

# Handing in

As mentioned above: when you are finished &#x2013; when your code passes all the tests &#x2013; submit your answer as a zipped directory using the upload link I will email to you. Don&rsquo;t forget to include a link to your codeacademy profile page in `index.html`.
