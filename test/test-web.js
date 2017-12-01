// var cheerio=require('cheerio');
// var fs = require('fs'),
//     request = require('request');
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// var oldjsdom = require("jsdom/lib/old-api.js");

// var skeleton = require('skeleton.js');
assert = chai.assert;
chai.config.includeStack = false;
// var $ = jQuery;
var index;
var caLink='';
var profileRE = new RegExp( "/https://wwww.codecademy.com/([A-Za-z]*)/i" ) ;
var pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements')

describe('Part 1: HTML and CSS', function() {
  var links = window.links;
  $("body").append('<div id="index-holder"></div>');

  describe('Problem 1: Codecademy.com', function () {
    before(function() {
      $.ajaxSetup({async:false});
      // $.ajax({
      //   url: 'Part3/index.html',
      //   type: 'GET',
      //   async: false,
      //   dataType:"html",
      //   success: function(data, textStatus, jqXHR) {
      //     index=data;
      //     console.log($(data));
      //     links=$.parseHTML($(data.responseText));
      //     console.log("Links is: " +  links);
      //   }
      // });
      // $( "#index-holder" ).load( "Part3/index.html", function(response,status,xhr) {
      //   //$("store-index").hide();
      //   links=$("#index-holder")
      //   console.log("ḦERE IS MY LINK!!!!"+ links[0].href);
      // });
      $( "#result" ).load( "Part3/index.html", function(response,status,xhr) {
        //$("store-index").hide();
        links=window.links=$("#result a")
        console.log(links[0].href);
      });

      //done();
    });

    

   
    it('First check to make sure there\s a link element', function() {
      assert.isAbove(links.length,0);

    });
    it('Next see if the link points to https://codeacademy.com/', function() {
      // capgure href in a variable
      for (i=0; i< links.length; i++) {
        console.log(links[i]);
        hr=links[i].getAttribute("href");
        if (hr.startsWith('https://www.codecademy.com/') ) {
          caLink=hr;
        }
        console.log ("setting calink in loop on test 1. calink is: " + caLink);
      }
      assert.equal(caLink.substring(0,27), "https://www.codecademy.com/");
    });
    // var profileName = profileRE.exec(caLink)[1];
    console.log (" calink is as follows: " + caLink);
    // var myMS = "this name!! ";
    // var pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements');
    // var myName = pr.exec(caLink)[1];

    it('Check to confirm that' + caLink  + ' is pointing to your codecademy profile.' +
       ' I will check all these profiles against each other and if there\'s a duplicate...'
       , function() {
         pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements')
         console.log("caLink is " + caLink + "in test 4")
         assert.isNotNull(pr.exec(caLink)[1],  'Your profile name is ' + pr.exec(caLink)[1])
    });
    it('Unfortunately I can\'t test from here whether you have completed all the necessary badges.\
We\'ll do that when you push to Github.');
  });
  describe('Problem 2: Blog Post Content', function() {
    it('The blog post should contain at least xx words ', function() {
      
    });
    it('CSS color should be...  ', function() {
      
    });
    it('CSS other attribute should be... ', function() {
      
    });
  });

});

// part 2
describe('Part 2: Javascript inside the console', function () {

  describe('Proble 1, Drawing ASCII art', function() {
    it('"makeV should draw a 5-story 5 when you load it', function() {
      
    });
  });

  describe('Problem 2, \"longest\" function', function () {
    it('should return the longer of two strings', function() {
      assert.equal(skeleton.longest('short', 'very long'), 'very long',
                   "Sorry, this test failed.");
    });
  });

  describe('Problem 3, Computing the reign. The computeReign function should produce exactly one sentence per input prime minister', function() {
    var testPM = {
      "PM": "Michelle Murphy",
      "Party": "NDP",
      "From": 2023,
      "To": 2033
    };
    it('Let\'s try it with wilfred Laurier',function() {
      assert.equal(skeleton.computeReign(skeleton.wl),"Wilfred Laurier\'s reign was 15 years long.");
    });
    it('This time let\'s try William Lyon Mackenzie King',function() {
      assert.equal(skeleton.computeReign(skeleton.wlmk),"William Lyon Mackenzie King's reign was 5 years long.");
    });
    it('One last time with a made-up PM',function() {
      assert.equal(skeleton.computeReign(testPM),"Michelle Murphy\'s reign was 10 years long.");
    });

  });

  describe('Problem 4, sentences', function() {

    it('The sentences function should produce a series of sentences, one line per sentence',
       function() {
         assert.equal(skeleton.sentences(skeleton.ministers),
                      "Wilfred Laurier was prime minister from 1896 to 1911.\n\
Robert L. Borden was prime minister from 1911 to 1920.\n\
Arthur Meighen was prime minister from 1920 to 1921.\n\
William Lyon Mackenzie King was prime minister from 1921 to 1926\n");
       });
  });

});

describe('Part 3: Javascript in the browser', function() {
  describe('Each of the functions in link-minister should do what it\'s supposed to', function() {
    it('addLink should take three paraeters node, text,url, clear the node, \
           create a new link node with the url as href and text as content, \
           and append the new node to the html');
    it('"wikify" should replace spaces (" ") with underscores ("_") ');
    it('"linkifyClass" should take one parameter "c ( a class name), \
        identify all elements having class "c", and linkify each of those elements.');
  });
  describe('Does this actually work in the browser?', function() {
    it('This is hard to test here; It will only be tested when you push changes to github.');
  });

});
