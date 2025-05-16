// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Counter} from "@open";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";


contract EventTicket is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable, Pausable {

    using Counter for Counters.Counter;

    address public owner;
    uint maxSupply;
    uint totalSupply;
    string memory symbol;
    string calldata name;
    string calldata eventDetails
    uint256 public eventDate;
    uint256 public eventTime;

    uint256 private _nextEventTokenId;
    uint256 private currentEventTokenId;

    string memory eventURI;

    constructor (string _name, string _symbol,
     uint256 maxSupply, uint256 totalSupply) 
     ERC721 ("EventTicket", "ET") {
        owner = msg.sender
        currentEventTokenId = 0;
        _nextEventTokenId = currentEventTokenId + 1;
     }

     function pause() public onlyOwner () {
      _pause();
     }

     function unpause() public onlyOwner {
      _unpause();
     }

     function mint () external {
      uint256 tokenId = currentEventTokenId;
      currentEventTokenId++;
      _safeMint(msg.sender, tokenId, bytes data)
      _setTokenURI(tokenId, tokenLink);

     }

     function baseURI(string memory tokenLink) public onlyOwner {
        _baseURI(tokenLink)
     }

     function setTokenURI(uint256 tokenId, string memory tokenLink) public onlyOwner {
      _setTokenURI(tokenId, tokenLink)
     }

     function tokenURI(uint256 tokenId) public onlyOwner {
        
     }

      function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
      super._burn(tokenId)
      
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721, ERC721Enumerable)  // Declare you're overriding both
    whenNotPaused                       // Pausable modifier - will revert if contract is paused
{
    super._beforeTokenTransfer(from, to, tokenId, batchSize);
}



}