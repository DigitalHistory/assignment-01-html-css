// initial set up
// currently doing nothin in web page

// var mocha=require('mocha');

// test if in browser or node
// cf. https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
var isNode=new Function("try {return this===global;}catch(e){ return false;}");

// common variables for both environments
var //indexPath = 'dev/index-tester.html',
     indexPath = 'Part1/index.html',
    index2Path = 'Part2/index.html',
    caLink='';
// var profileRE = new RegExp( "/https://wwww.codecademy.com/([A-Za-z]*)/i" ) ;
// var pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements');
const inlineCss = require('inline-css'); //for css testing
if (isNode()) {
  var chai=require('chai'),
      fs = require('fs'),
      request = require('request'),
      cheerio=require('cheerio'),
      path = require('path'),
      hwc = require('html-word-count');
  //baseDir = path.dirname(path.resolve(indexPath));
  //  jsdom = require("jsdom");
  // const { JSDOM } = jsdom;
  // var oldjsdom = require("jsdom/lib/old-api.js");
} else {
  // gonna be a little bit screwed in the browser!
}


var links = [];
const index = fs.readFileSync(indexPath, 'utf8');
const baseDir = 'file://'+path.dirname(path.resolve(indexPath))+'/';
if (isNode()) {
  var local$ = cheerio.load(index);
  links = local$('a');
} else {
  local$("body").append('<div id="index-holder"></div>');
  local$.ajaxSetup({async:false});
  local$( "#result" ).load( indexPath, function(response,status,xhr) {
    //local$("store-index").hide();
    links=window.links=local$("#result a");
  });
}


// set up assertion statements
var assert=chai.assert;
//expect=chai.expect;

describe('Problem 1: Codeacademy Profile', function() {
  before(function(done) {
    done();
  });

  it('First check to make sure there\'s a link element', function(done) {
    assert.isAbove(links.length,0,'there don\'t appear to be any links in the file');
    done();
  });
  it('Next see if any link points to a Codeacademy achievements page', function() {
    // capture href in a variable
    var hr;
    for (var i=0; i< links.length; i++) {
      //hr=links[i].getAttribute("href");
      hr=links[i].attribs.href;
      if (hr.startsWith('https://www.codecademy.com/') ) {
        caLink=hr;
      }
    }
    var pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements'),
        fullMatch = pr.exec(caLink),
        match = null;
    if (fullMatch) {
      match = fullMatch[1];
    }
    assert.isNotNull(match,
                     'None of the links on the page match the pattern "https://www.codecademy.com/user/userid/achievements"');
  });

  it('Unfortunately I can\'t test from here whether you have completed all the necessary badges, but plesae be aware that I will check that!');

});

describe('Problem 2: Blog Post Content', function() {
  before(function() {
    // load index and set up tests
  });

  it('Main section of the blog post should contain at least 175 words ', function() {
    assert.isAtLeast(
      hwc(local$('section.main').html()), 175, "the main section is too short!");
  });
  
  it('Post should contain a <header> element', function() {
    assert.isAtLeast(local$('header').length,1,"No header elements found");
  });
  it('Header should contain an <h1> element', function() {
    assert.isAtLeast(local$('header h1').length,1,"No <h1> inside of <header>");
    
  });

  it('Header should contain an <h2> element', function() {
    assert.isAtLeast(local$('header h2').length,1,"No <h2> inside of <header>");
    
  });

  it('h2 should contain a <span> with class "author"', function() {
    assert.isAtLeast(local$('header h2 span.author').length,1,"No span.author inside of <h2>");
    
  });

  it('Post should contain a section.main element', function() {
    assert.isAtLeast(local$('section.main').length,1,"No header elements found");
    
  });

  it('section.main should contain a valid img or figure tag', function() {
    assert.isAtLeast(local$('section.main img').length,1,"No img tags found in section.main");
    local$('section.main img').each(function(i, image){
      assert.isNotEmpty(image.attribs.src, "image tag without src attribute for image number " + i);
    }); 
  });
  it('Post should contain a section.sources element', function() {
    assert.isAtLeast(local$('section.sources').length,1, 'No <section> element found with class "sources"');    
  });

  it('section.sources should contain a ul element with minimum two li elements', function(done) {
    assert.isAtLeast(local$('section.sources ul').length,1,"No <ul> element inside section.sources");    
    assert.isAtLeast(local$('section.sources ul li').length,2,"Did not find 2 <li> elements within <ul> inside section.sources");    

    done();
  });

  it('every li element in section.sources should contain a valid a element pointing to a source', function() {
    local$('section.sources ul li').each( function(i, item) {
      assert.isAtLeast(local$('a', this).length,1,"No a tag in list item number " + i);

    } );
  });
});


describe('Problem 3: Blog Post Style', function () {

  before(function (done)  {
    // set up tests, as above
    inlineCss(index, {url:"file:///home/matt/DH/Assignments/01-web-skills-intro/dev/", 
                      removeLinkTags:false})
      .then(function(inlined ){
        local$ = cheerio.load(inlined);
        done(); 

      });
  });
  
  it('Blog post <head> element should contain a <link> to style.css', function() {
    var pointstostyle = null;
    
    assert.isAtLeast(local$('link').length,1,"did not find any link elements");
    local$('link').each(function(i,link) {
      if (link.attribs.href == 'style.css' || link.attribs.href == './style.css') {
        pointstostyle = true ; 
      }
    });
    assert.isTrue(pointstostyle, "none of the link elements point to style.css");
  });
  it('<header> element should have width of 100%', function (done) {
    assert.equal(local$("header").css("width"),"100%", 
                 "header width should be set to 100%");
    done();
  });
  it('<header> element background should be different from background of <article> element and <section> elements', function(done) {
    assert.notEqual(local$("header").css("background"), local$("article").css("background"), 
                    "header background should not be the same as article background ");
    done();
  });
  it('section.main and section.sources should have right and left margins', function() {
    assert.exists(local$("section.main").css("margin-left"), "margin-left property is not defined");
    assert.exists(local$("section.main").css("margin-right", "margin-right property is not defined"));

  });
  it('section.sources should have a border', function() {
    assert.exists(local$("section.sources").css("border", "border property is not set"));    
    
  });
  it('images should float and text should wrap around them', function() {
    assert.exists(local$('img').css('float'), "float property not set on images");
  });
});


describe('Problem 4: Accessibility', function() {

  it('All images should have `alt` attributes \
     (if using <img>) or <figcaption> attributes (if using figures)', function() {
    
  });

  it('Aria tags for um some things', function() {
    
  });

  it('One other accessibility test', function() {
    
  });
});



