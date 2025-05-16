import React from 'react';
import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';
//import { base } from 'viem/chains';
//import { Avatar } from '@coinbase/onchainkit/identity';
//import { base } from 'viem/chains'; 
import { base } from 'viem/chains';
 import { IdentityCard } from '@coinbase/onchainkit/identity';
//import { base } from 'viem/chains';
import { Signature, SignatureStatus, SignatureLabel, SignatureToast, SignatureIcon, SignatureButton} from '@coinbase/onchainkit/signature';
import { domain, types, message } from './gttg';
import { useState } from 'react';
//import { Signature, SignatureStatus, SignatureLabel } from 'your-signature-lib'; // Adjust import to your package


import { CheckCircle, Loader2, XCircle, Clock } from 'lucide-react'; // Icons from lucide-react
import { error } from 'console';
import { APIError } from '@coinbase/onchainkit/api';


interface Props {
  status: 'init' | 'pending' | 'success' | 'error' | 'reset';
}


const SignatureStatusIcon: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Loader2 className="animate-spin text-blue-500 w-5 h-5" />;
    case 'success':
      return <CheckCircle className="text-green-500 w-5 h-5" />;
    case 'error':
      return <XCircle className="text-red-500 w-5 h-5" />;
    case 'init':
    case 'reset':
    default:
      return <Clock className="text-gray-400 w-5 h-5" />;
  }
};




function Login() {
  const [status, setStatus] = useState<'init' | 'pending' | 'success' | 'error' | 'reset'>('init');
  const [signature, setSignature] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <div>

 

<Signature
  domain={domain}
  types={types}
  primaryType="Attest" // or whatever your type name is in types
  message={message}
  onStatus={(statusObj) =>{
  const {statusName, statusData} = statusObj;
  setStatus(statusName);

  if(statusName === 'success') {
    setSignature(statusData.signature);
    setErrorMsg(null);
  } else if (statusName === 'error') {
    setErrorMsg(statusData.message);
    setSignature(null);
  }

 }}

 onError={(error: APIError) => {
  console.error('Error Coe:', error.code)
  console.error('Error message:', error.message)
 }}
>
<SignatureButton
  label="Sign Message" // Default: "Sign"
  connectLabel="Connect Wallet" // Default: "Connect Wallet"
  errorLabel="Try Again" // Default: "Try again"
  successLabel="Signed!" // Default: "Signed"
  pendingLabel="Signing..." // Default: "Signing..."
  disabled={false}
  className="custom-class"
/>

<SignatureStatus className="p-4 border rounded-md shadow-md custom-class">
  <SignatureLabel className="font-bold text-lg">

  </SignatureLabel>
   {/* Conditional UI based on status */}
   {status === 'init' && <p>Ready to sign. Click the button when you're ready.</p>}
   {status === 'pending' && <p className="text-blue-600">Waiting for wallet signature...</p>}
   {status === 'success' && (
      <p className="text-green-600 break-all">
        ✅ Signature complete: <br />
      <code>{signature}</code>
      </p>
    )}
    {status === 'error' && (
      <p className="text-red-600">
        ❌ Error signing: {errorMsg}
      </p>
    )}     
</SignatureStatus>


<SignatureToast
 durationMs={5000} // Default: 5000
 position="bottom-center" // Default: "bottom-center"
 className="custom-class"
>

<SignatureIcon />

<SignatureStatusIcon status={status} />
<SignatureLabel className="font-medium" />

{/* Optional custom message */}
  {status === 'pending' && <p className="text-sm text-blue-600">Awaiting wallet signature...</p>}
  {status === 'success' && <p className="text-sm text-green-600">Signature complete ✅</p>}
  {status === 'error' && <p className="text-sm text-red-600">Signature failed ❌</p>}

  </SignatureToast> 

  <button>Sign Message</button>

</Signature>


     
{/*  
<Signature
  domain={domain}
  types={types}
  primaryType="Attest"
  message={message}
  label="Sign EIP712"
  onSuccess={(signature: string) => console.log(signature)}
/>

<Signature
  // Required for EIP-712 typed data
  domain={domain}
  types={types}
  message={message}
  primaryType="Test"
 
  // OR for personal_sign
  message="Hello World"
 
  // Optional props
  label="Sign"
  onSuccess={(signature: string) => {}}
  onError={(error: APIError) => {}}
  onStatus={(status: LifecycleStatus) => {}}
  resetAfter={5000} // ms to reset after success
  className="custom-class"
  disabled={false}
>
<SignatureButton
  label="Sign Message" // Default: "Sign"
  connectLabel="Connect Wallet" // Default: "Connect Wallet"
  errorLabel="Try Again" // Default: "Try again"
  successLabel="Signed!" // Default: "Signed"
  pendingLabel="Signing..." // Default: "Signing..."
  disabled={false}
  className="custom-class"
/>

</Signature> */}

    </div>
  )
}

export default Login  


