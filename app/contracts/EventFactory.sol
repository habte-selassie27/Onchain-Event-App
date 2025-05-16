// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract EventFactory {
    
    struct EventMetaData {
        address eventOrganizer;
        uint256 dateOfEvent;
        uint256 maximumAttendee;
        address attendee;
        string nameOfEvent;
        uint256 eventId;
    }

    address public owner;

    uint256 public eventIDCounter;

    string public  baseURI;

    mapping (uint256 => address) public eventContracts;

    mapping (uint256 => EventMetaData) public events;

    constructor() {
       eventIDCounter = 0;
       owner = msg.sender; 
    }

    event EventCreated(uint256 indexed eventId, address eventContract);

    function createEvent(string memory name, uint256 time, uint256 maxSupply, string memory baseURI) external returns(uint256 eventIDCounter) {
       ///////  Deploys a new EventTicket contract and stores metadata
    }

     function getEvent(uint256 eventId) public view returns (EventMetaData memory){
       return events[eventId]; 
     }


}