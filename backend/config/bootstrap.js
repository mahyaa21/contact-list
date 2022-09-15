var fs = require('fs');
var path = require('path');

/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

  const count = await Passenger.count();
  if (await Passenger.count() >= 3000) {
    return;
  }

  var seedPassenger1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seed/passenger_seed_1.json'), 'utf8'));
  var seedPassenger2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seed/passenger_seed_2.json'), 'utf8'));
  var seedPassenger3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seed/passenger_seed_3.json'), 'utf8'));

  await Passenger.createEach(seedPassenger1);
  await Passenger.createEach(seedPassenger2);
  await Passenger.createEach(seedPassenger3);

};
