pragma solidity ^0.4.23;

contract Club {
    address public owner;
    uint public price; //price to join the Club
    uint public membersCount;
    uint public bestSale; //the best sale till now
    uint private generation;
    address public bestSeller; //the user who presented more users
    
    //this is members count when the contract change owner to the best seller
    uint maxMembers = 2000000; 
    //the mebers is a mapping with address and generation the user is/was member
    //so if generation is 3 and members[address] is not 3, the user is not a member on that generation
    mapping(address => uint) public members;
    mapping(address => string) public nickNames;
    //presented count is by generation
    mapping( uint => mapping(address => uint)) public presentedCount; 

    
    constructor (uint _maxMembers) public {
        owner = msg.sender;
        generation = 1;
        members[owner] = generation;
        membersCount = 1;
        price = 10 finney; //milliether 
        bestSale = 0; //
        maxMembers = _maxMembers;
    } 
    //event to signal new members coming
    event joined(address user);
    //event to signal new best seller
    event best(address user);
    //event to signal a winner
    event winner(address user);

    function transferOwnership(address _new) public{
        if(msg.sender==owner){
            owner = _new;
        }
    }

    //amount is in wei
    function withdraw(uint amount) public returns(bool){
        //only owner can... 
        if( msg.sender == owner  )
        {
            uint prize = membersCount*price/4;
            //compute the remaining part 
            uint last = address(this).balance-prize;
            if( amount<=last ){
                msg.sender.transfer(amount);
                return true;
            }
            else
                return false;
        }
        return false;
    }
    function amImember() public view returns(bool){
        return members[msg.sender]==generation;
    }
    //this function allow to invite friends or developers
    //without any fee
    function inviteFriends(address friend) public returns (bool){
        if( msg.sender == owner ){
            //friend invitation for free  does not deserve any money back
            members[friend] = generation;
            membersCount++;
            return true;
        }
        return false;
    }
    //allow to store an user nickname to associate an address
    //note this fuction intentionally does not check for membership
    //anyone can user this smart contract to associate a nick to an address and use it
    function setNick(string _nick) public payable {
        if(msg.value==price||msg.sender==owner){
            nickNames[msg.sender] = _nick;
        }
    }
    function getNick(address _address) public view returns (string){
        return nickNames[_address];
    }
    //call this function to join the  club
    //presentedby is the address of whom invited you
    function join(address presentedby) public payable {
        if(msg.value==price){
            //presenter must be a member of the  club 
            //an user already in the club can't join again
            if( members[presentedby]==generation && members[msg.sender] < generation){
                members[msg.sender] = generation; // the presented guy join the club
                membersCount++;
                presentedCount[generation][presentedby]++;
                uint count = presentedCount[generation][presentedby];
                if( count%2 == 0){
                    //reward member each couple of presented new members!
                    presentedby.transfer(price);
                 }
                 //check best seller
                if( count > bestSale ){
                    bestSale = count;
                    bestSeller = presentedby;
                    emit best(bestSeller);
                 }
                if( membersCount>=maxMembers ){
                    //pay the prize to the winner!
                    uint prize = membersCount*price/4;
                     //compute the remaining part 
                    uint last = address(this).balance-prize;
                    bestSeller.transfer(prize);
                    //transfer the remaining part to the owner
                    if(last>0)
                        owner.transfer(last);
                    //game start again, bestseller is allowed to invite other members
                    //and is the only member of the new generation
                    generation++;
                    members[bestSeller] = generation;
                    membersCount = 1;
                    bestSale = 0;
                    emit winner(bestSeller);
                }
                emit joined(msg.sender);
            }else{
                revert("not a member");
            }
        }else{
            revert("price not enough");
        }
        
    }
}