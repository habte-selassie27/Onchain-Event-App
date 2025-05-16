import React from 'react'
import { NFTCard, NFTMintCard, type LifecycleStatus } from '@coinbase/onchainkit/nft'; 
import { NFTLastSoldPrice, NFTMedia, NFTNetwork, NFTOwner, NFTTitle } from '@coinbase/onchainkit/nft/view';
import { Address } from '@coinbase/onchainkit/identity';
import image from 'next/image';
import { error } from 'console';
import { Hex } from 'viem';
 

   
    
function NftMintCardUI() {

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

  type NFTData = {
    // Core display properties
    title: string; // required for card components
    name?: string; // required for NFTTitle and NFTCollectionTitle
    description?: string; // not currently used
    imageUrl?: string; // required for NFTMedia
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
  
  
function useNFTData() {  
    return {  
      title: 'My NFT',  
      imageUrl: 'https://example.com/image.png', 
     
    }  
   
  }  

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
   

     </NFTCard>
        

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
    
    </React.Fragment>
    </div>
       
  )
}

export default NftMintCardUI;
