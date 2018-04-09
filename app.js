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
  var lost = csv.getLost(argv.month);
  var gained = csv.getGained(argv.month);

  console.log('==Month== ', argv.month);
  console.log('G: ', gained);
  console.log('L: ', lost);
}
else if (command === 'active-subscribers'){
  var disruptor = csv.getDivision(argv.month, 'Disruptor');
  var liberator = csv.getDivision(argv.month, 'Liberator');
  var GameChanger = csv.getDivision(argv.month, 'GameChanger');

  console.log('==Month== ', argv.month);
  console.log('Disruptor: ', disruptor);
  console.log('Liberator: ', liberator);
  console.log('GameChanger: ', GameChanger);
}
else {
  console.log('Command not recognized');
}
