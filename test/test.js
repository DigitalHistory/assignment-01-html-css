'use strict';


// start by requiring all relevant modules
const path = require('path'),  // find paths
      fs=require('fs'),  // deal w/ filesystem
      gitCommits = require('git-commits'), // git stuff -- should al lbe updated in 2020
      gitConfig = require('git-config'),
      gitState = require('git-state'),
      // inlineCss = require('inline-css'), //for css testing
      // request = require('request'),  // not used -- remove when safe
      cheerio=require('cheerio'), // should get rid of this is poss in favor of jsdom
      hwc = require('html-word-count'); // important!
      // jsdom = require('jsdom'),
      // barista = require('seed-barista');
      //      jsdom = require('jsdom');  // jquery + dom queries
      
const chai=require('chai'), // testing stuff
      expect=chai.expect, // stupidly using both assert and expect
      assert=chai.assert;

// const { JSDOM } = jsdom;

chai.use(require('chai-fs'));

var repoPath = path.resolve(process.env.REPO || (__dirname + '/../.git'));
var ignoreCommitEmails = 'matt.price@utoronto.ca'; // ignore my own commits



// get repo path
/**
 * check whether a given email matches any of the forbidden emails
 * @param {} git
 * @returns {} 
 */
const matchesProfEmail = function (email, profEmails) {
  return (profEmails.indexOf(email) > -1);
};


// global vars for git tests
let studentCommits = 0,
    minCommits = 4;


// var // indexPath = 'index.html', // this really needs to be updated
//caLink=''; // no idea what this is

// global vars for path tests
// const pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements');

let name,email,githubid; // we'll need these throughout

gitConfig(function (err, config) {
  if (err) return done(err);
  if (config.user.name) {name = config.user.name;}
  if (config.user.email) {email = config.user.email;}
  if (config.github.user) {githubid = config.github.user;}
  
});
/////////////////////////////
///
///  tests start here
///
////////////////////////////

describe('Git Checks', function() {
  var  gitCheck;
  before(function(done) {
    gitCommits(repoPath)
      .on('data', function (commit) {
        if (!matchesProfEmail(commit.author.email, ignoreCommitEmails))
        {
          studentCommits++;
        }
      })
      .on('end', function () {
      })
    ;

    gitCheck  = gitState.checkSync('./', function(r,e) {
      //return [r, e];
    });
    done();
  });

  it('You should have made at least ' + minCommits + ' git commits ', function() {
    expect(studentCommits).to.be.at.least(minCommits);
  });

  it('Git should be configured with username and email information', function() {
    expect(name, 'your Git user name has not been set').not.to.be.undefined;
    expect(email, 'your Git email has not been set').not.to.be.undefined;
    expect(githubid, 'your Github user name has not been set').not.to.be.undefined;
  });

  it('All changes in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
    expect(gitCheck.dirty, 'looks like you have changed some files and not committed the changes yet').to.equal(0);
  });

  it('All files in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
    expect(gitCheck.untracked, 'looks like you have some files in the directory which have not been added to the repository. \n      Make sure your answers do not rely on them, or tests will fail on the server.').to.equal(0);

  });
});

// console.log(__dirname) + '/../';



// more variables to be used later
var links = [];
// const index = fs.readFileSync(indexPath, 'utf8');
const problem1 = fs.readFileSync(path.join('01', 'index.html'), 'utf8'),
      problem2 = fs.readFileSync(path.join('02', 'index.html'), 'utf8');
      // problem3 = fs.readFileSync(path.join('03', 'index.html'), 'utf8'); // don't need .toString();
// problem4 = fs.readFileSync(path.join('04', 'index.html'), 'utf8');

// const baseDir = 'file://'+path.dirname(path.resolve(indexPath))+'/';

// var testhtml = `<!DOCTYPE html>
// <html>
//   <head></head>
//   <body>
//     <table>
//       <tr>
//         <td class = "PM">Some Name</td>
//         <td></td>
//         <td></td>
//       <</tr>
//     </table>
//   </body>
// </html>
// `;

//var { window } = new JSDOM(`<!DOCTYPE html>`);
// var { window } = new JSDOM(testhtml);
// var jq = require('jquery')(window);


// // abortive code placed here vain hope of unifying web + node tests
// let local$ = cheerio.load(index);
// links = local$('a'); 
// console.log ('word count is ' + hwc(local$('section.main').html())); 



// gitconfig
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

describe('Problem 1: Structure a Letter: ', function() {
  before(function(done) {
    done();
  });

  let $ = cheerio.load(problem1);

  describe('Header Tests', function() {
    it('Sender div contains the right info', function() {
      console.log($('header div.senderinfo p a')[0].attribs.href);
      expect($('header div.senderinfo p').length, 'There should be exactly one <p> element inside div.senderinfo').to.equal(1) &&
        expect($('header div.senderinfo p br').length,'there are no <br> elements inside ' ).to.be.above(0) &&
        expect($('header div.senderinfo p a').length, 'There should be one link in the sender div').to.equal(1) &&
        expect($('header div.senderinfo p a')[0].attribs.href, 'href').to.include('mailto:') ;
    });

    it('<time> is not empty', function() {
      expect($('header time').html(),'make sure you add some text to the <time> element').not.to.be.empty;
    });

    it('Recipient div contains the right info', function() {
      expect($('header div.recipient p').length, 'There should be exactly one <p> element inside div.recipient').to.equal(1) &&
        expect($('header div.recipient p br').length,'there are no <br> elements inside ' ).to.be.above(0) &&
        expect($('header div.recipient p a').length, 'There should be one link in the sender div').to.equal(1) &&
        expect($('header div.recipient p a')[0].attribs.href, 'href').to.include('mailto:') ;
    });

    it('Subject exists', function() {
      expect($('header div.subject').html(), 'don\'t forget the subject line!').to.include('enrollment in HIS393');
    });
  });

  
  describe('Letter Body Tests', function() {
    it('Greeting', function() {
      expect($('article div.greeting').html(), 'Add in the `Dear Prof` greeting').to.include('Dear Prof');
    });
    it('Main Text', function() {
      expect($('article div.text p').length, 'There should be at least 3 paragraphs of text').to.be.at.least(3) &&
        expect($('article div.text h1').length, 'There should be 3 h1 headlines').to.equal(3) &&
        expect($('article div.text ul').children().length, 'There should be an unordered list with  three items').to.be.at.least(3) &&
        expect($('article div.text a')[0].attribs.href, 'Make sure you add the My Pretty Pony link').to.equal('https://www.pinterest.ca/pin/840273242953005718/');
    });
    it('Closing', function() {
      expect($('article div.closing').html(), 'Remember to say good-bye (in `div.closing`)!').not.to.be.empty ;
    });
  });

  // it('Next see if any link points to a Codeacademy achievements page', function() {
  //   // capture href in a variable
  //   var hr,
  //       fullMatch=null,
  //       match=null,
  //       pr = new RegExp('https://www.codecademy.com/users/(.*)/achievements');
    
  //   for (var i=0; i< links.length; i++) {
  //     hr=links[i].attribs.href;
  //     fullMatch = pr.exec(hr);
  //     console.log(hr + fullMatch);
  //     if (fullMatch) {
  //       match = fullMatch[1];
  //       break;
  //     }
  //   }

  //   expect(match,'None of the links on the page match the pattern "https://www.codecademy.com/user/userid/achievements"')
  //     .to.not.be.null;
  // });


});

describe('Problem 2: Tables', function() {
  let $ = cheerio.load(problem2);

  before(function() {
    // load index and set up tests
  });
  
  it('Table isn´t empty', function() {
    expect ($('article > table').children().length, 'Do you have a table, and does it have any content?').to.be.at.least(1);
  });

  it('Table body has at least 3 rows', function() {
    expect ($('table > tbody > tr').length, 'Each Prime Minister should get their own "<tr>" element with <td> elements inside').to.equal(3) ;
  });

  it('tr elements have 4 columns each', function() {
    let rows = $('tbody > tr');
    rows.each(function (i) {
      let cells = $(this).children('td').length;
      expect (cells, `Row ${i + 1} has ${cells} <td> elements, when it should have 4`).to.equal(4) ;
    });
  });

  it('table caption exists and has the right content', function() {
    let t = $('table caption');
    expect(t.length, 'There should be a <caption> element *inside* the <table>').to.equal(1) &&
      expect (t.html(), 'Please put the caption textt from the textfile into the <caption> element').to.include('list of prime ministers is');
  });

});

// });
const juice = require('juice');
describe('Problem 3: Basic CSS', function() {

  before(function() {
    
  });
  var css =  fs.readFileSync(path.join('03', 'style.css'), 'utf8').toString();
  var html =  fs.readFileSync(path.join('03', 'index.html'), 'utf8').toString();
  var inline = juice.inlineContent(html, css);
  let $ = cheerio.load(inline);

  it('<main>', function() {
    let m = $('main');
    expect(m.css('max-width'), 'max-width property should be set to 50 rem').to.equal('50rem') &&
      expect(m.css('border-radius'), 'border-radius property should be set to 10px').to.equal('10px')  ;
  });

  it('<header> and <footer>', function() {
    let h = $('header'),
        f = $('footer');
    expect (h.css('background-color'), 'background-color property should be non-null').to.not.be.undefined &&
      expect(h.css('background-color'), 'background-color of header and footer should be the same').to.equal(f.css('background-color')) &&
      expect(h.css('padding-top'), 'padding-top should be set to 5px').to.equal('5px') &&
      expect(f.css('min-height'), 'min-height of footer should be 5rem').to.equal('5rem'); 
  });

  it('<article>', function() {
    let a = $('article');
    expect (a.css('margin-left'), 'margin-left should be set to 10px').to.equal('10px') &&
      expect (a.css('margin-right'), 'margin-right should be set to 10px').to.equal('10px') &&
      expect (a.css('display'), 'display should be set to flow-root').to.equal('flow-root') ;
  });

  it('article img', function() {
    let i = $('article img');
    expect (i.css('max-width'), 'max-width should be set to 15rem').to.equal('15rem') &&
    expect(i.css('border-radius'), 'border-radius property should be set').to.not.be.undefined  &&
    expect (i.css('margin-right'), 'margin-right should be set to 5px').to.not.be.undefined ;
 
  });
});


describe('Problem 4: Layout and Media Queries', function() {
  var css =  fs.readFileSync(path.join('04', 'style.css'), 'utf8').toString();
  var html =  fs.readFileSync(path.join('04', 'index.html'), 'utf8').toString();
  var inline = juice.inlineContent(html, css);
  let $ = cheerio.load(inline);

  it('<main>', function() {
    let m = $('main');
    expect (m.css('grid-template-rows'), 'grid-template-rows should be set to something sensible').to.not.be.undefined &&
      expect (m.css('grid-template-columns'), 'grid-template-columns should be set to something sensible').to.not.be.undefined &&
      expect (m.css('grid-gap'), 'grid-gap should be set to something sensible').to.not.be.undefined;
  });

  it('<aside>', function() {
    let a = $('aside');
    expect (a.css('grid-area'), 'grid-area should be set to the obvious choice form main\'s template areas').to.equal('aside') ;
  });

  it('section.sidebar', function() {
    let s = $('section.sidebar');
    expect (s.css('grid-area'), 'grid-area should be set to the obvious choice form main\'s template areas').to.equal('side') &&
      expect (s.css('flex-direction'), 'flex-direction should be set a value that enforces vertical flow (not horizontal)').to.equal('column') ;
      
  });

  it('<article>', function() {
    let a = $('article');
    expect (a.css('grid-area'), 'grid-area should be set to the obvious choice from main\'s template areas').to.equal('art') ;
  });


  it('#box1', function() {
    let b = $('#box1');
    expect (b.css('grid-row'), 'grid-row should be so that the box spans two rows ,staring at the top').to.equal('1/3') &&
      expect (b.css('grid-column'), 'grid-column should be so that the box spans two columns ,staring at the left').to.equal('1/3'); 
  });

  it('#box2', function() {
    let b = $('#box2');
    expect (b.css('grid-row'), 'grid-row should be so that the box spans two rows, staring one from the top').to.equal('2/4') &&
      expect (b.css('grid-column'), 'grid-column should be so that the box spans two columns, starting one form the left').to.equal('2/4') ;
  });

  it('#box3', function() {
    let b = $('#box3');
    expect (b.css('grid-row'), 'grid-row should be so that the box spans two rows, staring two from the top').to.equal('3/5') &&
      expect (b.css('grid-column'), 'grid-column should be so that the box spans two columns, starting two from the left').to.equal('3/5') ;
  });

  it('#box4', function() {
    let b = $('#box4');
    expect (b.css('grid-row'), 'grid-row should be so that the box spans two rows, staring two from the bottom').to.equal('4/6') &&
      expect (b.css('grid-column'), 'grid-column should be so that the box spans two columns, starting two from the right').to.equal('4/6') ;
  });

  it('#box5', function() {
    let b = $('#box5');
    expect (b.css('grid-row'), 'grid-row should be so that the box sits at the top in a single grid cell' ).to.equal('1/2') &&
      expect (b.css('grid-column'), 'grid-column should be so that the box sits at the right in a single grid box').to.equal('5/6'); 
  });
  
});


describe('Problem 5: Blog Post', function() {

  var css =  fs.readFileSync(path.join('05', 'style.css'), 'utf8').toString();
  var html =  fs.readFileSync(path.join('05', 'index.html'), 'utf8').toString();
  var inline = juice.inlineContent(html, css);
  let $ = cheerio.load(inline);


  describe('HTML structure', function() {
    it('Post should contain a <header> element', function() {
      assert.isAtLeast($('header').length,1,'No header elements found');
    });

    it('Header should be inside <article>', function() {
      let element = $('header');
      expect (element.get(0).parentNode().get(0).tagName, 'the parent of header is not article, is it in the right place?').to.equal('article') ;
    });
  
    it('Header should contain an <h1> element', function() {
      assert.isAtLeast($('header h1').length,1,'No <h1> inside of <header>');
           
    });

    it('Header should contain an <h2> element', function() {
      assert.isAtLeast($('header h2').length,1,'No <h2> inside of <header>');
           
    });

    it('h2 should contain a <span> with class "author"', function() {
      assert.isAtLeast($('header h2 span.author').length,1,'No span.author inside of <h2>');
           
    });

    it('Post should contain a section.main element', function() {
      assert.isAtLeast($('section.main').length,1,'No header elements found');
           
    });


    it('section.main should contain a valid img or figure tag', function() {
      expect($('section.main img').length, 'No img tags found in section.main')
        .to.be.at.least(1);
      $('section.main img').each(function(i, image){
      // console.log(image.attribs.src);
        expect(image.attribs.src, 'image tag without src attribute for image number ' + i)
          .to.be.a('string').that.is.not.empty;
      }); 
    });

    it('Main section of the blog post should contain at least 175 words ', function() {
      expect(
        hwc($('section.main').html()), 'the main section is too short!').to.be.at.least(175);
    });


    it('Post should contain a section.sources element', function() {
      assert.isAtLeast($('section.sources').length,1, 'No <section> element found with class "sources"');    
    });

    it('section.sources should contain a ul element with minimum two li elements', function(done) {
      assert.isAtLeast($('section.sources ul').length,1,'No <ul> element inside section.sources');    
      assert.isAtLeast($('section.sources ul li').length,2,'Did not find 2 <li> elements within <ul> inside section.sources');    

      done();
    });

    it('every li element in section.sources should contain a valid a element pointing to a source', function() {
      let items = $('section.sources ul li');
      expect (items.length, 'Fewer than two list items in the source section').to.be.at.least(2);
      items.each( function(i, item) {
        assert.isAtLeast($('a', this).length,1,'No a tag in list item number ' + i);

      } );
    });

    it('Blog post <head> element should contain a <link> to style.css', function() {
      var pointstostyle = null;
    
      assert.isAtLeast($('link').length,1,'did not find any link elements');
      $('link').each(function(i,link) {
        if (link.attribs.href == 'style.css' || link.attribs.href == './style.css') {
          pointstostyle = true ; 
        }
      });
      assert.isTrue(pointstostyle, 'none of the link elements point to style.css');
    });

  });

  describe('CSS properties', function() {
    it('<article> should use flexbox or grid', function() {
      let element = $('article');
      expect(element.css('display')==='grid' || element.css('display') === 'flex' ,
        'CSS property "display" should be set to "grid" or "flex"').to.be.true;
    });
    
    // it('<header> element should have width of 100%', function (done) {
    //   // console.log($('header').css('width'));
    //   assert.equal($('header').css('width'),'100%', 
    //     'header width should be set to 100%');
    //   done();
    // });
    
    it('<header> element background should be different from background of <article> element and <section> elements', function(done) {
      assert.notEqual($('header').css('background'), $('article').css('background'), 
        'header background should not be the same as article background ');
      done();
    });
    
    it('section.main and section.sources should have right and left margins', function() {
    // console.log($('section.main').css('margin-left'));
      assert.exists($('section.main').css('margin-left'), 'margin-left property is not defined');
      assert.exists($('section.main').css('margin-right'), 'margin-right property is not defined');
      assert.exists($('section.sources').css('margin-left'), 'margin-left property is not defined');
      assert.exists($('section.sources').css('margin-right'), 'margin-right property is not defined');

    });
    it('section.sources should have a border', function() {
      assert.exists($('section.sources').css('border'), 'border property is not set');    
    
    });
    it('images should float and text should wrap around them', function() {
      assert.exists($('img').css('float'), 'float property not set on images');
    });

  });

  
  
  
});



// describe('Problem 3: Blog Post Style', function () {

//   before(function (done)  {
//     // set up tests, as above
//     inlineCss(index, {url:'file://' + __dirname + '/../',
//       removeLinkTags:false})
//       .then(function(inlined ){
//         $ = cheerio.load(inlined);
//       });
//     done(); 
//   });
  

// });


describe('Reflection Checks (not required unless you are attempting an "A" grade!)', function() {
  it('Reflection file should exist', function() {
    let r = 'Reflection/reflection.md';
    expect(r, `I can't find the file ${r}`).to.be.a.file();
  });
  it('The total word count for your reflection should be at least 478 (after the question text, that leaves about 125 words minimum per question)', function() {
    let content=fs.readFileSync('Reflection/reflection.md', 'utf-8');
    expect(hwc(content), '').to.be.at.least(478);
  });
});

