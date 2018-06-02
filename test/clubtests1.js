const Club = artifacts.require("Club");

contract('testSuite1', async (accounts) => {
  var instance;
  beforeEach('setup contract for each test', async function () {
    await Club.deployed();
    instance = await Club.new(6)
  })

  it("have an initial zero balance", async () => {
     
     let balance = await web3.eth.getBalance(instance.address);
     assert.equal(balance.valueOf(), 0);
  }),
  it("is owned by publisher", async () => {
     
    let owner = await instance.owner.call();
    assert.equal(owner, accounts[0]);
 }),
 it("give the ability to the owner to change ownership", async () => {
     
  let owner = await instance.owner.call();
  await instance.transferOwnership(accounts[1],{from:accounts[1]});
  //not owner can't change
  owner = await instance.owner.call();
  assert.equal(owner, accounts[0],"Unexpected ownership change!");
  await instance.transferOwnership(accounts[1],{from:owner});
  owner = await instance.owner.call();
  assert.equal(owner, accounts[1],"Ownership unchanged!");
}),
 
  it("can present new user", async () => {
   
    //presenter is the contract creator
    let presenter = accounts[0];
    let from = accounts[1]; //new user joining the schema
    await instance.join(presenter,{value:web3.toWei(10,"finney"), from:from});
    let balance = await web3.eth.getBalance(instance.address);
    assert.equal(balance.valueOf(), web3.toWei(10,"finney"));
    
 }),

 it("can present new user if member of the schema", async () => {
  
  //presenter is the contract creator
  let presenter = accounts[0];
  let from = accounts[1]; //new user joining the schema
  await instance.join(presenter,{value:web3.toWei(10,"finney"), from:from});
  let balance = await web3.eth.getBalance(instance.address);
  
  assert.equal(balance.valueOf(), web3.toWei(10,"finney"));
  presenter = from; //new member as a presenter
  from=accounts[2];  // new entering member
  await instance.join(presenter,{value:web3.toWei(10,"finney"), from:from});
  balance = await web3.eth.getBalance(instance.address);
  //contract must be rewarded
  assert.equal(balance.valueOf(), web3.toWei(20,"finney")); 
  let count = await instance.membersCount.call();
  //should have tree members on the schema
  assert.equal(3,count.toNumber());
  

})

});