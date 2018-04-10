# Prerequisite
[Nodejs](https://nodejs.org/en/)

# Install
Download the repositry, go to repositry and run
```npm install```

# Commands List
```node app.js --help```
```
setFile             >Set CSV file url
subscribers         >Get total gain/lost subscriptions
active-subscribers  >Get division breakdown for active ubscriptions
```
```node app.js <command> --help```

# Usage
```
node app.js setFile --help
node app.js setFile --url="url where file is hosted"

node app.js subscribers --month=jun
node app.js active-subscribers --month=mar

```

# Node packages
### [yargs](https://www.npmjs.com/package/yargs) - to setup command line interface config
### [request](https://www.npmjs.com/package/request) - to GET file from url
### [fast-csv](https://www.npmjs.com/package/fast-csv) - to process csv line by line
