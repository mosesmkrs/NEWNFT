import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAddress } from '@meshsdk/react';
import ShareIcon from '@mui/icons-material/Share';
import { BrowserWallet } from '@meshsdk/core';

const wallet = await BrowserWallet.enable('eternl');

const Profile = () => {
    
  const address = useAddress();
  
  const [truncatedAddress, setTruncatedAddress] = useState('');
  const [truncatedrewardAddress, setrewardAddress] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const rewardAddresses = await wallet.getRewardAddresses();
      if(rewardAddresses && rewardAddresses.length > 0){
        const startLength = 12;
        const endLength = 10;

        const startPortion = rewardAddresses[0].substring(0, startLength);
        const endPortion = rewardAddresses[0].substring(rewardAddresses[0].length - endLength);

        const truncatedrewardAddress = `${startPortion}...${endPortion}`;
        setrewardAddress(truncatedrewardAddress)
      }
      

      if (address) {
        const startLength = 12;
        const endLength = 10;

        const startPortion = address.substring(0, startLength);
        const endPortion = address.substring(address.length - endLength);

        const truncatedAddress = `${startPortion}...${endPortion}`;
        setTruncatedAddress(truncatedAddress);
      }
    };

    fetchData();
  }, [address]);


  return (
    <div>
      <div className='background-image'>
        <AccountCircleIcon style={{ fontSize: '10rem', color: '#6B7280', background: 'black' }} className='rounded-full ml-10 translate-y-[40%]' />
      </div>
     <div className='flex mt-[3%] m-2'>
         <p className='break-all font-bold text-[28px] ml-10 mr-4 '>{truncatedAddress} </p>
         <p className='font-bold text-[28px]' style={{  color:'#6B7280' }}>#1053988</p>
         </div>
         <div className='flex center text-center translate-x-[85%] '>
            <button style={{  color:'#ffffff', background: '#18191B', border: '1px solid #6B7280' }} className='text-[14px] rounded-lg py-2 px-3 m-1  font-bold '>
                Edit profile
            </button>

          <div  style={{   background: '#18191B', border: '1px solid #6B7280' }} className='py-2 px-3 m-1 rounded-lg'>
           <ShareIcon/>
          </div>
         </div>

         <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className='flex ml-10 w-fit space-x-0 rounded-lg mb-5'>
            <div  className='py-1 px-5 border-r' style={{ borderColor: '#6b7280'}}>
                <p>Season Rank</p>
                <span style={{  color:'#76a9fa' }}>--</span>
            </div>
            <div  className='py-1 px-5 border-r' style={{ borderColor: '#6b7280'}}>
                <p>All Time Rank</p>
                <span style={{  color:'#76a9fa' }}>--</span>
            </div>
            <div  className='py-1 px-5 border-r' style={{ borderColor: '#6b7280'}}>
                <p>Wallet</p>
                <span style={{  color:'#76a9fa' }}>{truncatedAddress}</span>
            </div>
            <div  className='py-1 px-5 '>
                <p>Stake Address</p>
                <span style={{  color:'#76a9fa' }}>{truncatedrewardAddress}</span>
            </div>
          </div>
    </div>
  );
};

export default Profile;
