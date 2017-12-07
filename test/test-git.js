'use strict';

 const path = require('path');
const gitCommits = require('git-commits');

var repoPath = path.resolve(process.env.REPO || (__dirname + '/../.git'));
var ignoreCommitEmails = "matt.price@utoronto.ca";
const matchesProfEmail = function (email, profEmails) {
  return (profEmails.indexOf(email) > -1);
};

var studentCommits = 0,
    minCommits = 4;
var chai=require('chai'),
    expect=chai.expect;
fdskjal(.,fd,,);
/////////////////////////////
///
///  tests start here
///
////////////////////////////

describe('Git Checks', function() {
  before(function(done) { 
    gitCommits(repoPath)
      .on('data', function (commit) {
        if (!matchesProfEmail(commit.author.email, ignoreCommitEmails))
        {
          studentCommits++;
          //console.log(commit);
        }
      })
      .on('end', function () {
        console.log(studentCommits);
      })
    ;
    done();
  });

  it('There should be at least ' + minCommits + " git commits.", function() {
    expect(studentCommits).to.be.at.least(minCommits);
  });
});

