var Voting = artifacts.require("../contracts/Voting.sol")

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(Voting)
}
