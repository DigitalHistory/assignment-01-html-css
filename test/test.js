
var chai=require('chai'),
    
var assert = chai.assert,
    expect=chai.expect;
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});



require('mocha-jshint')({
  git: {
    modified: true,
    commits: 2,
    masterDiff:true
  }
});


var skeleton = require('../skeleton-solution.js');

describe('test longest function', function () {
  it('should return the longer of two strings', function() {
    assert.equal(skeleton.longest('short', 'very long'), 'very long');
  })
})

describe("DOM Tests", function () {
  var el = document.createElement("div");
  el.id = "myDiv";
  el.innerHTML = "Hi there!";
  el.style.background = "#ccc";
  document.body.appendChild(el);
  
  var myEl = document.getElementById('myDiv');
  it("is in the DOM", function () {
    expect(myEl).not.toBeNull();
  });
  
  it("is a child of the body", function () {
    expect(myEl.parentElement).toBe(document.body);
  });
  
  it("has the right text", function () {
    expect(myEl.innerHTML).toEqual("Hi there!");
  });
  
  it("has the right background", function () {
    expect(myEl.style.background).toEqual("rgb(204, 204, 204)");
  });
});
