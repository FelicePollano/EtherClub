var club = artifacts.require("Club");

module.exports = function(deployer) {
  deployer.deploy(club,2000000,{ gas: 5000000 });
};
