const Club = artifacts.require("Club");

contract('testSuite3', async (accounts) => {
  var instance;
  beforeEach('setup contract for each test', async function () {
    await Club.deployed();
    instance = await Club.new(6)
  })

  
it("check correctly if a member exists",async () => {
  //presenter is the contract creator
  let presenter = accounts[0];
  await instance.join(presenter,{from:accounts[1],value:web3.toWei(10,"finney")})
  assert.isTrue(await instance.ismember.call({from:accounts[1]}));
})

});