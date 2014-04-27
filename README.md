# lifecycle [![Build Status](https://travis-ci.org/chuckbjones/lifecycle.svg?branch=master)](https://travis-ci.org/chuckbjones/lifecycle) [![Code Climate](https://codeclimate.com/github/chuckbjones/lifecycle.png)](https://codeclimate.com/github/chuckbjones/lifecycle)

This is going to be a node.js app with an ember.js frontend. Currently using mongodb for the database, but this may change to couch in the future.

TODO: add description, install, usage, and test details.

## Install ##
I'm using OSX for development, so let's start with that. I'll add linux instructions when it comes time to put this thing on a production server.

### node ###
Install [node](http://nodejs.org/) through [homebrew](http://brew.sh/) or any other [method](http://nodejs.org/download/):

`brew install node`

### mongo ###
Install [mongodb](https://www.mongodb.org/) through [homebrew](http://brew.sh/) or any other [method](https://www.mongodb.org/downloads):

`brew install mongodb`

Homebrew will print out instructions for launching mongodb now or at login. Here they are for when I forget:

    To have launchd start mongodb at login:
        ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
    Then to load mongodb now:
        launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
    Or, if you don't want/need launchctl, you can just run:
        mongod --config /usr/local/etc/mongod.conf

## Import data ##
If you have existing data that you want to import into the mongodb instance, you can run these commands:

    mongo lifecycle --eval "db.dropDatabase()"
    mongoimport --jsonArray --stopOnError --db lifecycle --collection sites --file sites.json
    mongoimport --jsonArray --stopOnError --db lifecycle --collection customers --file customers.json
    mongoimport --jsonArray --stopOnError --db lifecycle --collection users --file users.json

See `test/fixtures/` for the expected format.

## Run ##
On your development machine:

`npm start`

This will start the `express` server on the default port and connect to the mongodb instance running on localhost at its default port.

Lifecycle should now be accessible at [http://localhost:3000/](http://localhost:3000/).

TODO: production environment


## Dependencies ##
TODO: list node dependencies, bower dependencies, etc., and what they are used for.

## Code layout ##
TODO: explain the contents of each directory, etc.

## Test ##

`npm test --coverage`

## MIT License ##

The MIT License (MIT)

Copyright (c) 2014 Charles Jones

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
