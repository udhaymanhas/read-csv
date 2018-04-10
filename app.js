const yargs = require('yargs');

const csv = require('./csv.js');

const monthOptions = {
  describe: 'query by month',
  demand: true,
  alias: 'm'
}

const argv = yargs
      .command('subscribers',' >Get total gain/lost subscriptions',{
        month: monthOptions
      })
      .command('active-subscribers',' >Get division breakdown for active subscriptions',{
        month: monthOptions
      })
      .help()
      .argv;

var command = process.argv[2];

if(command === 'subscribers'){
  argv.month = argv.month.toLowerCase();
  console.log('>Month: ', argv.month);
  csv.getLost(argv.month).then((lost)=>{
    console.log('Subscribers Lost: ', lost);
  });
  csv.getGained(argv.month).then((gained)=>{
    console.log('Subscribers Gained: ', gained);
  });
}
else if (command === 'active-subscribers'){
  argv.month = argv.month.toLowerCase();
  console.log('>Month: ', argv.month);
  csv.getDivision(argv.month, 'Disruptor').then((active) => {
    console.log('Disruptor: ', active);
  });
  csv.getDivision(argv.month, 'Liberator').then((active) => {
    console.log('Liberator: ', active);
  });
  csv.getDivision(argv.month, 'GameChanger').then((active) => {
    console.log('GameChanger: ', active);
  });
}
else {
  console.log('Command not recognized');
}
