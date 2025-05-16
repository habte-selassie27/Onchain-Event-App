import React from 'react'

import { Checkout,CheckoutButton } from '@coinbase/onchainkit/checkout'

export default function NftMintCard() {
  return (
    <div>
      <Checkout >
  <CheckoutButton text='Checkout with USDC'/>
</Checkout>
 
    </div>
  )
}  


