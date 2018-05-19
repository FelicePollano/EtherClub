pragma solidity ^0.4.23;

contract Club {
    address public owner;
    uint public price; //price to join the Club
    uint public membersCount;
    uint public bestSale; //the best sale till now
    address public bestSeller; //the user who presented more users
    //this is members count when the contract change owner to the best seller
    uint constant public maxMembers = 1000000; 
    mapping(address => bool) public members;
    mapping(address => uint) public presentedCount;
    constructor () public {
        owner = msg.sender;
        members[owner] = true;
        membersCount = 1;
        price = 10 finney; //milliether 
        bestSale = 0; //
    } 
    //amount is in wei
    function withdrwaw(uint amount) public returns(bool){
        //only owner can... 
        if( msg.sender == owner && address(this).balance >= amount )
        {
            msg.sender.transfer(amount);
            return true;
        }
        return false;
    }
    //this function allow to invite friends or developers
    //without any fee
    function inviteFriends(address friend) public returns (bool){
        if( msg.sender == owner ){
            //friend invitation for free  does not deserve any money back
            members[friend] = true;
            membersCount++;
            return true;
        }
        return false;
    }
    //call this function to join the  club
    //presentedby is the address of whom invited you
    function join(address presentedby) public payable {
        if(msg.value==price){
            //presenter must be a member of the  club 
            //an user already in the club can't join again
            if( members[presentedby]==true && members[msg.sender] != true){
                members[msg.sender] = true; // the presented guy join the club
                membersCount++;
                presentedCount[presentedby]++;
                uint count = presentedCount[presentedby];
                if( count%2 == 0){
                    //reward member each couple of presented new members!
                    presentedby.transfer(price);
                 }
                 //check best seller
                if( count > bestSale ){
                    bestSale = count;
                    bestSeller = presentedby;
                 }
            }else{
                revert();
            }
        }else{
            revert();
        }
        
    }
}