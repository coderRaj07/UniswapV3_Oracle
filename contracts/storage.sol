// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

contract Storage {

// address deployedERC721 = 0x0nkxllx000sjhsixcfdewsz;
// ERC721(deployedERC721).func();

    //state variables
    //view vs pure
    //payable
    //modifiers
    //msg.sender, msg.value
    //mapping
    //struct
    //memory,storage
    //interfaces
    //virtual,override
    //gas fees calculation
    //calling a smartcontract from another smartcontract

  address public owner;
  mapping (uint=>address) public userIDAddresses;
  uint public id;
 
  mapping (string=>student) public studentIDDetails;
  //user defined datatype
  struct student{
      uint id;
      string mailId;
  }

function setNameToStudent(string memory name,uint idx,string memory mailId)public {
   studentIDDetails[name].id = idx;
   studentIDDetails[name].mailId = mailId;
}

function getNameToStudent(string memory name)public view returns(uint, string memory) {
   return (studentIDDetails[name].id, studentIDDetails[name].mailId);
}

function getNameToStudent1(string memory name)public view returns(student memory) {
   return (studentIDDetails[name]);
}

  function setIdToAddress(address user)public {
   id=id+1;
   userIDAddresses[id]=user;
  }

  function getAddressById(uint idx) public view returns (address){
      return userIDAddresses[idx];}

   //only runs when the contract gets deployed
   constructor(){
       owner = msg.sender;
   }
   
    uint256 public number=10;
    function store(uint256 num) public onlyOwner{
        // require(msg.sender==owner);
        number = num; //changing state variable
    }

    //using state variables in getter functions but not modifying them should use view 

    //for reading state variables use view  
    //return statements doesnot consume gases from userside
    function retrieve() public view returns (uint256){
        return number;
    }

    //using state variable to modify local variable, we have to use view
    function retrieve1(uint256 num) public view returns (uint256){
        uint256 num1 = num + number;
        return num1;
    }

    //pure to declare, when u r not changing any state varible just changing local ones
    function retrieve2(uint256 num) public pure returns (uint256){
        uint256 num1 = 2**num;
        return num1;
    }


    //increases reusability and optimises gases
    modifier onlyOwner(){
    require(msg.sender==owner);
    _;
    }

    function sendViaCall(address payable _to) public payable onlyOwner{
          //require(msg.sender==owner);
        (bool sent,) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }



    function balanceOf(address _owner) virtual external view returns (address){}

}

contract ash is Storage{
   
    function balanceOf(address _owner) override external view returns (address){
        _owner=msg.sender;
        return _owner;

}
}
//if smart contract stores function definations then u hv to use virtual keyword,

//interfaces only contains only function definitions
//https://eips.ethereum.org/EIPS/eip-721
interface IStorage{
function setNameToStudent(string memory name,uint idx,string memory mailId)external ;
function balanceOf(address _owner) external view returns (address);
}

//Istorage(0xab4nh673u0diok000).balanceOf;