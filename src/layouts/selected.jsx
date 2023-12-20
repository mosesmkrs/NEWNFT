import { useState,useEffect,useRef } from 'react';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import WalletIcon from '@mui/icons-material/Wallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAddress } from '@meshsdk/react';
import { useLovelace } from '@meshsdk/react';
import { useWallet } from '@meshsdk/react'
import { useWalletList } from '@meshsdk/react'

let timeoutId
function Selected() {
    const [truncatedAddress, setTruncatedAddress] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredd,setIsHoveredd] = useState(false)
    const [selectedWallet, setSelectedWallet] = useState(null)
    const {  connecting } = useWallet()
    const wallets = useWalletList()
const lovelace = useLovelace();
const address = useAddress();
const { connect } = useWallet()
const errorRef = useRef(null)

useEffect(() => {
  const storedWallet = localStorage.getItem('selectedWallet')
  if (storedWallet) {
    setSelectedWallet(JSON.parse(storedWallet))
    connect(JSON.parse(storedWallet).name)
  }
}, [connect])
const handleWalletSelection = async (wallet) => {
  try {
    localStorage.setItem('selectedWallet', JSON.stringify(wallet))
    setSelectedWallet(wallet)
    await connect(wallet.name)
    
    
  } catch (error) {
  
    errorRef.current?.openModal()
  }
}
const handleSwitchWalletHover = () => {
  setIsHoveredd(true);
};

const handleSwitchWalletLeave = () => {
  // Clear the existing timeout
  clearTimeout(timeoutId);

  // Set a new timeout to delay hiding the component
  timeoutId = setTimeout(() => {
    setIsHoveredd(false);
  }, 2000); 
};

   
      useEffect(() => {
		
		
		
		
		if (address) {
		const startLength = 7;
		const endLength = 6;
	
		const startPortion = address.substring(0, startLength);
		const endPortion = address.substring(address.length - endLength);
	
		const truncatedAddress = `${startPortion}...${endPortion}`;
		setTruncatedAddress(truncatedAddress);
		
		}
	}, [connect, address]);
  return (
    <div className='connect-wallet__disconnect '>
						
						<span className='flex m-3 ml-1 bg-slate-900 p-2  rounded-md w-full'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						>
							<NavLink to="/profile" className='flex'>
							<AccountCircleIcon style={{ fontSize: '2rem' ,color:'#2a2929' }} />
						<p className='ml-3 text-lg text-white'><b>₳ {Math.round(parseInt(lovelace) / 1000000)}</b></p>
							</NavLink>
							
						{isHovered && (
                <div className='additional-links absolute top-[52%] right-[5%] rounded-md w-1/4 border bg-slate-950 z-50'>
                 <span className='flex m-3 border-b   p-2  rounded-md '>
				<AccountCircleIcon style={{ fontSize: '4rem' ,color:'#2a2929' }} />
				
				<img  src={selectedWallet.icon} className='w-8 absolute translate-x-[100%] translate-y-[110%]'/>
			
				<div>
					<p className='w-55 break-all font-bold text-white'><code>{truncatedAddress}</code></p>
				
						<p className='ml-1 text-md relative text-white'>₳ {Math.round(parseInt(lovelace) / 1000000)}</p>
						</div>
				</span>
                 <NavLink
                    className="  py-[12px] px-[16px] hover:bg-[#2a2929] border-none flex"
                    to="/profile"
                  >
					<AccountCircleIcon style={{ fontSize: '2rem' ,color:'blue' }} className='mr-2' />
                    <p className='text-white'>Profile</p>
                  </NavLink>
                  <NavLink
                    className=" flex py-[12px] px-[16px] hover:bg-[#2a2929] border-none"
                    to="#"
                  >
					<BrushIcon className='mr-2' style={{ color:'blue' }}/>
                    <p className='text-white'>Creations</p>
                  </NavLink>
				<NavLink
                    className=" flex py-[12px] px-[16px] hover:bg-[#2a2929] border-none"
                    to="#"
                  >
                <SettingsIcon className='mr-2' style={{ color:'blue' }}/>
                    <p className='text-white'>Settings</p>
                  </NavLink>
				<NavLink
                    className=" flex py-[12px] px-[16px] hover:bg-[#2a2929] border-none"
                    to="#"
                  >
					<img src='../../img/moonpay.png' className='w-6 mr-2'/>
                   <p className='text-white'> Buy ADA with moonpay</p>
                  </NavLink>
				<NavLink
                    className=" flex py-[12px] px-[16px] hover:bg-[#2a2929] border-none"
                    to="#"
                  >
					<PhoneAndroidIcon className='mr-2' style={{ color:'white' }}/>
                    <p className='text-white'>Birble Mobile</p>
                  </NavLink>
				<NavLink
                    className=" flex py-[12px] px-[16px] hover:bg-[#2a2929] border-none"
                    to="#"
                  onMouseEnter={handleSwitchWalletHover}
                  onMouseLeave={handleSwitchWalletLeave}
                  >
					<WalletIcon className='mr-2' style={{ color:'white' }}/>
                 <span className='justify-between flex'>
					<p className='text-white'>Switch wallet</p>
						<ArrowForwardIosIcon className='p-1.5  absolute right-2'/>
                  </span>
                  </NavLink>
											{isHoveredd && (
							selectedWallet && !connecting && (
								<ul className='absolute border bg-slate-950 rounded-md w-full translate-x-[-102%] translate-y-[-50%] '>
								{wallets.map((wallet) => (
									<li
									className='text-[#9CA3AF] text-[16px] px-3 py-1.5 rounded-md mb-2 flex cursor-pointer hover:bg-[#2a2929] '
									key={wallet.name}
									onClick={() => {handleWalletSelection(wallet);
								
									}}
									>
										
									<img
										src={wallet.icon}
										alt={wallet.name}
										width='30'
										height='30'
									/>
									<span className='dropdown-button__wallet-name'>
										{wallet.name}
									
									</span>
									{selectedWallet && selectedWallet.name === wallet.name && (
									<div className="active-banner absolute right-2 px-1.5 text-sm py-0.5 bg-blue-900 text-blue-500 rounded-md">Active</div>
									)}
									</li>
								))}
								</ul>
							)
							)} 

                  {/* ... */}
                </div>
				
              )}
						</span>
						
						
					</div>
  )
}

export default Selected
