# Javascript Sample lib

Are you ready to fork and start coding? Good!

## Here's what you need:

- node >= 0.8 (try nvm)
- [grunt](http://gruntjs.com/ "GruntJS")

## How to write and publish
- edit **package.json** (module name, your name/email, git repo...)
- run `npm install` to download grunt and some plugins
- write the module source into **/src/.../**
- edit the file banner > **/src/banner.txt**
- write some tests > **/test/.../**
- edit **index.js** (to expose the right things)
- edit **README.md** as well
- run `grunt build`

Also, check the code in **/src/$suffix.js** to expose your module stuff 
into exports variable
