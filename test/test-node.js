// initial set up
// currently doing nothin in web page
// common variables for both environments
var //indexPath = 'dev/index-tester.html',
     indexPath = 'index.html',
    caLink='';

var pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements');
const inlineCss = require('inline-css'); //for css testing


var chai=require('chai'),
    fs = require('fs'),
    request = require('request'),
    cheerio=require('cheerio'),
    path = require('path'),
    gitConfig = require('git-config'),
    hwc = require('html-word-count');

// more variables to be used later
var links = [];
const index = fs.readFileSync(indexPath, 'utf8');
const baseDir = 'file://'+path.dirname(path.resolve(indexPath))+'/';

var testhtml = `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <table>
      <tr>
        <td class = "PM">Some Name</td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </body>
</html>
`;
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
//var { window } = new JSDOM(`<!DOCTYPE html>`);
var { window } = new JSDOM(testhtml);
var jq = require('jquery')(window);


// abortive code placed here vain hope of unifying web + node tests
  var local$ = cheerio.load(index);
  links = local$('a');
console.log ("word count is " + hwc(local$('section.main').html())); 

// set up assertion statements. not using expect b/c want more messaging
var assert=chai.assert,
    expect=chai.expect;


// gitconfig

var name,email,githubid;

gitConfig(function (err, config) {
  if (err) return done(err);
  if (config.user.name) {name = config.user.name;}
  if (config.user.email) {email = config.user.email;}
  if (config.github.user) {githubid = config.github.user;}
  
});



//////////////////////////////////////
///
///   tests start here
///
//////////////////////////////////////

describe('Problem 1: Codeacademy Profile', function() {
  before(function(done) {
    done();
  });

  it('First check to make sure there\'s a link element', function(done) {
    console.log(links[0].attribs.href);
    expect(links.length,'there don\'t appear to be any links in the file').to.be.above(0);
    done();
  });
  it('Next see if any link points to a Codeacademy achievements page', function() {
    // capture href in a variable
    var hr,
        fullMatch=null,
        match=null,
        pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements');
    
    for (var i=0; i< links.length; i++) {
      hr=links[i].attribs.href;
      fullMatch = pr.exec(hr);
      console.log(hr + fullMatch)
      if (fullMatch) {
        match = fullMatch[1];
        break;
      }
    }

    expect(match,'None of the links on the page match the pattern "https://www.codecademy.com/user/userid/achievements"')
      .to.not.be.null;
  });

  it('Unfortunately I can\'t test from here whether you have completed all the necessary badges, but plesae be aware that I will check them when you hand in!');

});

describe('Problem 2: Blog Post Content', function() {
  before(function() {
    // load index and set up tests
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
    expect(local$('section.main img').length, "No img tags found in section.main")
      .to.be.at.least(1);
    local$('section.main img').each(function(i, image){
      console.log(image.attribs.src);
      expect(image.attribs.src, "image tag without src attribute for image number " + i)
        .to.be.a('string').that.is.not.empty;
    }); 
  });

  it('Main section of the blog post should contain at least 175 words ', function() {
    expect(
      hwc(local$('section.main').html()), "the main section is too short!").to.be.at.least(175);
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
    let items = local$('section.sources ul li');
    expect (items.length, "Fewer than two list items in the source section").to.be.at.least(2);
    items.each( function(i, item) {
      assert.isAtLeast(local$('a', this).length,1,"No a tag in list item number " + i);

    } );
  });
});


describe('Problem 3: Blog Post Style', function () {

  before(function (done)  {
    // set up tests, as above
    inlineCss(index, {url:"file://" + __dirname + "/../",
                      removeLinkTags:false})
      .then(function(inlined ){
        local$ = cheerio.load(inlined);
      });
    done(); 
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
    console.log(local$("header").css("width"));
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
    console.log(local$("section.main").css("margin-left"));
    assert.exists(local$("section.main").css("margin-left"), "margin-left property is not defined");
    assert.exists(local$("section.main").css("margin-right"), "margin-right property is not defined");
    assert.exists(local$("section.sources").css("margin-left"), "margin-left property is not defined");
    assert.exists(local$("section.sources").css("margin-right"), "margin-right property is not defined");

  });
  it('section.sources should have a border', function() {
    assert.exists(local$("section.sources").css("border"), "border property is not set");    
    
  });
  it('images should float and text should wrap around them', function() {
    assert.exists(local$('img').css('float'), "float property not set on images");
  });
});


describe('Reflection Checks (not required unless you are attempting an "A" grade!)', function() {
  it('Reflection file should exist', function() {
    let r = `Reflection/reflection.md`;
    expect(r, `I can't find the file ${r}`).to.be.a.file();
  });
  it('The total word count for your reflection should be at least 478 (after the question text, that leaves about 125 words minimum per question)', function() {
    let content=fs.readFileSync(`Reflection/reflection.md`, 'utf-8');
    expect(hwc(content), "").to.be.at.least(478);
  });
});

