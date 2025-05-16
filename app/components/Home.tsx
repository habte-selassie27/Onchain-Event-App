
import React from 'react';
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';
//import { base } from 'viem/chains';
//import { Avatar } from '@coinbase/onchainkit/identity';
//import { base } from 'viem/chains'; 
import { base } from 'viem/chains';
 import { IdentityCard } from '@coinbase/onchainkit/identity';
//import { base } from 'viem/chains';
 

function Home() {
  return (
    <div>
      
{/* <Avatar address="0x4bEf0221d6F7Dd0C969fe46a4e9b339a84F52FDF" chain={base} />  */}

<Identity
  address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9"
  schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
>
  <Avatar />

 
<Address address="0x02feeb0AdE57b6adEEdE5A4EEea6Cf8c21BeB6B1" isSliced={false} 
// chain={base}
 /> 
  <Name>
    <Badge 
    // tooltip={true}
    tooltip="Coinbase Verified Account"
    />
  </Name>
  <Address />
</Identity>


<IdentityCard 
  address="0x4bEf0221d6F7Dd0C969fe46a4e9b339a84F52FDF"
  chain={base}
  schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
  badgeTooltip="Coinbase Verified"
/>
    </div>
  )
}

export default Home