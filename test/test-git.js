'use strict';

const path = require('path');
const gitCommits = require('git-commits'), fs=require('fs'), 
      gitConfig = require('git-config'),  gitState = require('git-state');
      
var repoPath = path.resolve(process.env.REPO || (__dirname + '/../.git'));
var ignoreCommitEmails = "matt.price@utoronto.ca";
const matchesProfEmail = function (email, profEmails) {
  return (profEmails.indexOf(email) > -1);
};

var studentCommits = 0,
    minCommits = 4;
var chai=require('chai'),
    expect=chai.expect;
chai.use(require('chai-fs'));


var name,email,githubid;

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
var name,email,githubid;

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

  it('You should have made at least ' + minCommits + " git commits ", function() {
    expect(studentCommits).to.be.at.least(minCommits);
  });

  it('Git should be configured with username and email information', function() {
      expect(name, "your Git user name has not been set").not.to.be.undefined;
      expect(email, "your Git email has not been set").not.to.be.undefined;
      expect(githubid, "your Github user name has not been set").not.to.be.undefined;
  });

  it('All changes in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
    expect(gitCheck.dirty, "looks like you have changed some files and not committed the changes yet").to.equal(0);
  });

  it('All files in current directory should be committed to Git (OK for this to fail while you are still working)', function() {
    expect(gitCheck.untracked, "looks like you have some files in the directory which have not been added to the repository. \n      Make sure your answers do not rely on them, or tests will fail on the server.").to.equal(0);

  });
});

