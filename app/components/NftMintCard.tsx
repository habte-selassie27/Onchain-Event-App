import React from 'react'
import { NFTCard, NFTMintCard, useNFTContext, type LifecycleStatus } from '@coinbase/onchainkit/nft'; 
import { NFTLastSoldPrice, NFTMedia, NFTNetwork, NFTOwner, NFTTitle } from '@coinbase/onchainkit/nft/view';
import { Address } from '@coinbase/onchainkit/identity';
import image from 'next/image';
import { error } from 'console';
import { Hex } from 'viem';
 

    
function NftMintCardUI() {



  type NFTData = {
    // Core display properties
    title: "Habtu"; // required for card components
    name?: "Habtu"; // required for NFTTitle and NFTCollectionTitle
    description?: string; // not currently used
    imageUrl?: `https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.hubspot.com%2Fwebsite%2Fhow-to-make-picture-into-link&psig=AOvVaw3PQtq90Q3tqJ0-9hcLRM7g&ust=1747508641093000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOj8_ZbXqI0DFQAAAAAdAAAAABAE`; // required for NFTMedia
    animationUrl?: string; // required for NFTMedia (audio and video types)
  
    /**
     * Supported MIME types:
     * - image: image/*
     * - video: video/*
     * - audio: audio/* or application/*
     */
    mimeType?: string; // required for NFTMedia, falls back to image
    // Price-related properties
    lastSoldPrice?: GLfloat; // required for NFTLastSoldPrice
    price?: GLfloat; // required for NFTAssetCost and NFTTotalCost
    mintFee?: GLfloat; // required for NFTTotalCost
    // Mint-related properties
    ownerAddress?: `0x${string}`; // required for NFTOwner
    contractType?: string;
    mintDate?: Date; // required for NFTMintDate
    creatorAddress?: Hex; // required for NFTCreator
    maxMintsPerWallet?: number; // required for NFTMintButton
    isEligibleToMint?: boolean; // required for NFTMintButton
    totalOwners?: string; // required for NFTMinters
    recentOwners?: Hex; // required for NFTMinters
    network?: string; // required for default BuildMintTransaction implementation
  };
  
  
// function useNFTData() : NFTData {  
//     return {
//         // Core display properties
//         title: "Habtu", // required
//         name: "Habtu Genesis NFT",
//         description: "This NFT is a unique piece of the BlockRSVP collection.",
//         imageUrl: "https://example.com/nft-animation.mp4", // must be a direct image URL (not a Google redirect link)
//         animationUrl: "https://example.com/nft-animation.mp4",
//         mimeType: "image/png",
      
//         // Price-related properties
//         lastSoldPrice: 7,
//         price: 0,
//         mintFee: 2,
      
//         // Mint-related properties
//         ownerAddress: "0x1234567890abcdef1234567890abcdef12345678",
//         contractType: "ERC721", // example contract type
//         mintDate: new Date("2024-12-01T00:00:00Z"),
//         creatorAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
//         maxMintsPerWallet: 3,
//         isEligibleToMint: true,
//         totalOwners: "25",
//         recentOwners: [
//           "0xabc1111111111111111111111111111111111111",
//           "0xabc2222222222222222222222222222222222222",
//         ],
//         network: "base",
//  }   
// }  

   
function useNFTData(): NFTData {
    return {
      // Core display properties
      title: "Habtu",
      name: "Habtu Genesis NFT",
      description: "This NFT is a unique piece of the BlockRSVP collection.",
      imageUrl: "https://example.com/nft-animation.mp4", // ensure this is a valid image URL
      animationUrl: "https://example.com/nft-animation.mp4",
      mimeType: "image/png",
  
      // Price-related properties
      lastSoldPrice: 7,
      price: 0,
      mintFee: 2,
  
      // Mint-related properties
      ownerAddress: "0x1234567890abcdef1234567890abcdef12345678",
      contractType: "ERC721",
      mintDate: new Date("2024-12-01T00:00:00Z"),
      creatorAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      maxMintsPerWallet: 3,
      isEligibleToMint: true,
      totalOwners: "25",
      recentOwners: [
        "0xabc1111111111111111111111111111111111111",
        "0xabc2222222222222222222222222222222222222",
      ],
      network: "base",
    };
  }
  

const statusHandler = (status: LifecycleStatus) => { 
    const { statusName, statusData } = status; 
    switch (statusName) { 
        case 'init':
        console.log('init');
        break;
      
        case 'error':
        console.log("Error Occured",status.statusData);
        break;
      
        case 'mediaLoading':
        console.log(status.statusData.mediaType )
        console.log(status.statusData.mediaUrl )
        break;
      
        case 'mediaLoaded':
        console.log("Media Loaded");
        break;
    
        case 'transactionPending':
        console.log("Transaction Pending");
        break;
    
        case 'transactionLegacyExecuted':
        console.log("Transaction Legacy",status.statusData.transactionHashList)
        break;

        // NFTCard success state represents media loaded
        // NFTMintCard success state represents successful Mint
        case 'success':
        console.log(status.statusData.transactionReceipts)
         default: 
        // handle 'init' state
    } 
  } 

  

//   const sampleNFTData: NFTData = {
//     // Core display properties
//     title: "Habtu", // required
//    // name?: "Habtu Genesis NFT",
//     description: "This NFT is a unique piece of the BlockRSVP collection.",
//     imageUrl: "", // must be a direct image URL (not a Google redirect link)
//     animationUrl: "https://example.com/nft-animation.mp4",
//     mimeType: "image/png",
  
//     // Price-related properties
//     lastSoldPrice: 7,
//     price: 0,
//     mintFee: 2,
  
//     // Mint-related properties
//     ownerAddress: "0x1234567890abcdef1234567890abcdef12345678",
//     contractType: "ERC721", // example contract type
//     mintDate: new Date("2024-12-01T00:00:00Z"),
//     creatorAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
//     maxMintsPerWallet: 3,
//     isEligibleToMint: true,
//     totalOwners: "25",
//     recentOwners: [
//       "0xabc1111111111111111111111111111111111111",
//       "0xabc2222222222222222222222222222222222222",
//     ],
//     network: "base",
//   };
  

  return (
    <div>
        <React.Fragment>

         
   <NFTCard
     contractAddress='0xb4703a3a73aec16e764cbd210b0fde9efdab8941'
     tokenId='1'
     useNFTData={useNFTData}  
     className={''}
     onStatus = {statusHandler}
    //  onError = {''}
    //  onSuccess={''}
   >
       <NFTMedia /> 
       {/* //- The media for the NFT, this includes support for images, videos and audio NFTs. */}
       <NFTTitle /> 
       {/* //- The title of the NFT. */}
       <NFTOwner /> 
       {/* //- Displays the Owners Avatar, name or address and badge (if applicable). */}
       <NFTLastSoldPrice /> 
       {/* //- The last sold price of the NFT in native currency and USD. */}
       <NFTNetwork /> 
      
       {/* The network the NFT is on, currently only BASE NFTs are supported. */}

       </NFTCard>
    
    </React.Fragment>
    </div>
       
  )
}

export default NftMintCardUI;
