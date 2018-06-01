const Club = artifacts.require("Club");

contract('testSuite4', async (accounts) => {
  var instance;
  beforeEach('setup contract for each test', async function () {
    await Club.deployed();
    instance = await Club.new(6000)
  })

  


it("can withdraw until the contract can pay the prize",async () => {
  //presenter is the contract creator
  let presenter = accounts[0];
  
  //contract owner present one member
  await instance.join(presenter,{from:accounts[1],value:web3.toWei(10,"finney")}); //2
  
  //now member 1 present a lot of members
  presenter = accounts[1];
  for(let i=3;i<=10;++i){
  
    await instance.join(presenter,{from:accounts[i],value:web3.toWei(10,"finney")});
    
  }
  let ownerBalance = await web3.eth.getBalance(accounts[0]);
  //till now prize is 10*10/4 = 25;
  //contract balance should be 50, so we should be able to withdraw at most 25 :)
  var tx = await instance.withdraw(web3.toWei(25,"finney"),{gasPrice:web3.eth.gasPrice});
 
  let ownerBalanceAfter = await web3.eth.getBalance(accounts[0]);
  let expectedIncrease = web3.toWei(25,"finney")-web3.eth.gasPrice.mul(tx.receipt.gasUsed);
  let small = Math.abs(expectedIncrease-(ownerBalanceAfter-ownerBalance));
  assert.isBelow(small,web3.toWei(0.01,"finney")); //withdraw done
  
  ownerBalance=await web3.eth.getBalance(accounts[0]);
  tx = await instance.withdraw(web3.toWei(1000,"finney"),{gasPrice:web3.eth.gasPrice}); //cant get so much anymore
  ownerBalanceAfter = await web3.eth.getBalance(accounts[0]);

  assert.isBelow(0-web3.eth.gasPrice.mul(tx.receipt.gasUsed),ownerBalanceAfter-ownerBalance); //withdraw NOT done
  
});

});