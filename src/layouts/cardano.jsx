/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import { useWallet, useWalletList } from '@meshsdk/react'
import Button from './Button'
import Dropdown from './Dropdown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Modal from './Modal'
import { useLovelace } from '@meshsdk/react';
import { useAddress } from '@meshsdk/react';
import { NavLink } from "react-router-dom";
import BrushIcon from '@mui/icons-material/Brush';
import SettingsIcon from '@mui/icons-material/Settings';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';


const ConnectWallet = ({ closeModal }) => {
	const { connect, disconnect, connecting } = useWallet()
	const wallets = useWalletList()

	const [selectedWallet, setSelectedWallet] = useState(null)
	const [connectionError, setConnectionError] = useState(null)
	const [closeContent, setcloseContent] = useState(true)
	const [isHovered, setIsHovered] = useState(false);
	const [truncatedAddress, setTruncatedAddress] = useState('');

	const lovelace = useLovelace();
	const address = useAddress();

	//error ref
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
			setConnectionError(null)
		} catch (error) {
			setConnectionError(error.message)
			errorRef.current?.openModal()
		}
	}

	const handleDisconnect = () => {
		localStorage.removeItem('selectedWallet')
		disconnect()
		setSelectedWallet(null)
	}
	useEffect(() => {
		const storedWallet = localStorage.getItem('selectedWallet');
		if (storedWallet) {
		setSelectedWallet(JSON.parse(storedWallet));
		connect(JSON.parse(storedWallet).name);
		}
		
		
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
    <div className="fixed right-0 -top-0 p-5 items-center  justify-center w-96 z-50  bg-black bg-opacity-100 border rounded-md animateModal1">
     <span className="close-button  text-3xl absolute top-2 right-4 cursor-pointer text-white" onClick={closeModal}>
            &times;
         </span>
        {closeContent && (
			<>
  <div>
      <img className='w-12  mt-5' src='../../img/cardano.png' alt='icon'/>
      </div>
             <div className='font-bold py-3  text-xl'>
       <p className='text-white'> Cardano wallets</p>
        </div>

      <p className=' text-sm mb-4 text-white'>By connecting your wallet, you agree to the <span className='text-[#1864F8]'>Terms & Conditions</span> and <span className='text-[#1864F8]'>Privacy Policy</span></p>
			</>
		)}
       


      
		<Dropdown
    
			title={
				<Button variant='accent'>
					{selectedWallet ? (
						<div className='flex text-[#9CA3AF] text-[16px] border p-3 rounded-md mb-2 '>
              <img
								src={selectedWallet.icon}
								alt={selectedWallet.name}
								width='30'
								height='30'
							/>
							<span>{selectedWallet.name} connected</span>
							
						</div>
					) : connecting && (
						'Connecting'
					)}
				</Button>
			}
		>
       
			<div className='connect-wallet'>
				{!selectedWallet && !connecting && (
					<ul>
						{wallets.map((wallet) => (
							<li
              className='text-[#9CA3AF] text-[16px] border p-3 rounded-md mb-2 flex'
								key={wallet.name}
								onClick={() => {handleWalletSelection(wallet);
								setcloseContent(false);
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
								
							</li>
						))}
					</ul>
				)}
				{selectedWallet && (
					
					<div className='connect-wallet__disconnect '>
						
						<span className='flex m-3 ml-1 bg-slate-900 p-2  rounded-md w-[30%]'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						>
							<NavLink to="/profile" className='flex'>
							<AccountCircleIcon style={{ fontSize: '2rem' ,color:'#2a2929' }} />
						<p className='ml-3 text-lg text-white'><b>₳ {Math.round(parseInt(lovelace) / 1000000)}</b></p>
							</NavLink>
							
						{isHovered && (
                <div className='additional-links absolute top-[52%] left-[27%] rounded-md w-8/12 border bg-slate-950'>
                 <span className='flex m-3 border-b   p-2  rounded-md '>
				<AccountCircleIcon style={{ fontSize: '4rem' ,color:'#2a2929' }} />
				
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
					<PhoneAndroidIcon className='mr-2' style={{ color:'blue' }}/>
                    <p className='text-white'>Birble Mobile</p>
                  </NavLink>
                  {/* ... */}
                </div>
              )}
						</span>
						
						<Button 
            variant='outline' 
			
			onClick={() => {
				handleDisconnect();
				setcloseContent(true);
			}}  noShadow>
							Disconnect
						</Button>
						
					</div>
				)}
			</div>
			<Modal
						ref={errorRef}
						>
							<div className="error__modal-content">

						
							<div className='modal__title'>
								<h4>Wallet connection error</h4>
							</div>
							<div className='modal__content'>
								<p>{connectionError}</p>
							</div>

							<div className='modal__button'>
								<Button variant='primary' onClick={() => errorRef.current?.closeModal()}>
									Okay
								</Button>
							</div>
							</div>


						</Modal>
		</Dropdown>
    </div>
	)
}

export default ConnectWallet






