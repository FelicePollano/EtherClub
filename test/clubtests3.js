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
});

it("give the prize for the best seller",async () => {
  //presenter is the contract creator
  let presenter = accounts[0];
  let ownerBalance = await web3.eth.getBalance(presenter);
  //contract owner present two members
  await instance.join(presenter,{from:accounts[1],value:web3.toWei(10,"finney")}); //2
  await instance.join(presenter,{from:accounts[2],value:web3.toWei(10,"finney")}); //3
  //now member 1 present a lot of members
  presenter = accounts[1];
  let balance = await web3.eth.getBalance(presenter);
  
  
  await instance.join(presenter,{from:accounts[3],value:web3.toWei(10,"finney")});//4
  await instance.join(presenter,{from:accounts[4],value:web3.toWei(10,"finney")});//5 +10
  await instance.join(presenter,{from:accounts[5],value:web3.toWei(10,"finney")});//6 : win 6/4*10
  
  
  let balanceAfter = await web3.eth.getBalance(presenter);
  let ownerBalanceAfter = await web3.eth.getBalance(accounts[0]);
  assert.equal(balanceAfter-balance,web3.toWei(25,"finney")); //prize given
  
  
});

});