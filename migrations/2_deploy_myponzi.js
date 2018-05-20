var club = artifacts.require("Club");

module.exports = function(deployer) {
  deployer.deploy(club,{ gas: 5000000 });
};
