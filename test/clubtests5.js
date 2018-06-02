const Club = artifacts.require("Club");

contract('testSuite5', async (accounts) => {
  var instance;
  beforeEach('setup contract for each test', async function () {
    await Club.deployed();
    instance = await Club.new(6000)
  })

  


it("give the ability to a user to change his nick name",async () => {
  let balance = await web3.eth.getBalance(instance.address);
  await instance.setNick("test1",{from:accounts[1],value:web3.toWei(10,"finney")});//pay for name change
  var nick = await instance.getNick.call(accounts[1]);
  assert.equal(nick,"test1");
  assert.equal(web3.toWei(10,"finney"),await web3.eth.getBalance(instance.address)-balance);
});

});