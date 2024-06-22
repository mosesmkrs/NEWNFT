import { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAddress } from '@meshsdk/react';
import ShareIcon from '@mui/icons-material/Share';
import { BrowserWallet } from '@meshsdk/core';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'


const Profile = () => {
    
  const address = useAddress();
  
  const [truncatedAddress, setTruncatedAddress] = useState('');
  const [truncatedrewardAddress, setruncatedrewardAddress] = useState('');
  const [rewardAddress, setrewardAddress] = useState('');
  const [activeTab, setActiveTab] = useState('My NFTs (0)');
  const [isHovered, setIsHovered] = useState(false);
  const [selectedText, setSelectedText] = useState('All Listing');
  const [isCopiedAddress, setIsCopiedAddress] = useState(false);
  const [isCopiedRewardAddress, setIsCopiedRewardAddress] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      const wallet = await BrowserWallet.enable("eternl");
      const rewardAddresses = await wallet.getRewardAddresses();
      if(rewardAddresses && rewardAddresses.length > 0){
        const startLength = 12;
        const endLength = 10;

        const startPortion = rewardAddresses[0].substring(0, startLength);
        const endPortion = rewardAddresses[0].substring(rewardAddresses[0].length - endLength);

        const truncatedrewardAddress = `${startPortion}...${endPortion}`;
        setruncatedrewardAddress(truncatedrewardAddress)
        setrewardAddress(rewardAddresses)
       

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

  

  const copyToClipboard = (text, setIsCopied) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);

        // Revert the copied state after 2 seconds (adjust as needed)
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard:', err);
      });
  };

  const [sliderRef] = useKeenSlider(
    {
      slideChanged() {
        console.log('slide changed')
      },
    },
    [
      // add plugins here
    ]
  )

  function changeTab(clickedButton) {

   


    if (!clickedButton || !clickedButton.classList) {
        return;
      }
    // Remove the 'active' class from all buttons
    const buttons = document.querySelectorAll('.flex button');
    buttons.forEach(button => button.classList.remove('active'));
  
    // Add the 'active' class to the clicked button
    clickedButton.classList.add('active');

    // Get the text content of the clicked button
    const buttonText = clickedButton.innerText;

    // Set the active tab based on the clicked button
    setActiveTab(buttonText);

  }
  
  const handleSpanClick = (text) => {
    setSelectedText(text);
  };


  return (
    <div>
      <div className='background-image'>
        <AccountCircleIcon style={{ fontSize: '10rem', color: '#6B7280', background: 'black' }} className='rounded-full ml-10 translate-y-[40%] background' />
      </div>
     <div className='flex mt-[3%] m-2 '>
         <p className='break-all font-bold text-[28px] ml-10 mr-4 address '>{truncatedAddress} </p>
         <p className='font-bold text-[28px] address' style={{  color:'#6B7280' }}>#1053988</p>
         </div>
         <div className='flex center text-center translate-x-[85%] flexbuttons'>
            <button style={{  color:'#ffffff', background: '#18191B', border: '1px solid #6B7280' }} className='text-[14px] rounded-lg py-2 px-3 m-1  font-bold '>
                Edit profile
            </button>

          <div  style={{   background: '#18191B', border: '1px solid #6B7280' }} className='px-3 py-2 m-1 text-white rounded-lg'>
           <ShareIcon/>
          </div>
         </div>
         <div className='moreverticon translate-x-[85%]'>
         <button style={{  color:'#ffffff', background: '#18191B', border: '1px solid #6B7280' }} className='text-[14px] rounded-lg py-2 px-3 m-1  font-bold '>
                <MoreVertIcon/>
            </button>
         </div>

         <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className='flex mx-auto mb-5 space-x-0 rounded-lg w-fit tablee'>
            <div  className='px-5 py-1 text-white border-r tableecontent' style={{ borderColor: '#6b7280'}}>
                <p>Season Rank</p>
                <span >--</span>
            </div>
            <div  className='px-5 py-1 text-white border-r tableecontent' style={{ borderColor: '#6b7280'}}>
                <p>All Time Rank</p>
                <span >--</span>
            </div>
            <div  className='px-5 py-1 text-white border-r tableecontent' style={{ borderColor: '#6b7280'}}>
                <p>Wallet</p>
                <span className='flex' style={{  color:'#76a9fa' }}>
                  {truncatedAddress}
                  {isCopiedAddress ? (
                      <CheckIcon className='p-1' />
                    ) : (
                      <ContentCopyIcon className='p-1' onClick={() => copyToClipboard(address, setIsCopiedAddress)} />
                    )}
                  </span>
            </div>
            <div  className='px-5 py-1 text-white tableecontent '>
                <p>Stake key</p>
                <span className='flex' style={{  color:'#76a9fa' }}>
                  {truncatedrewardAddress}
                  {isCopiedRewardAddress ? (
                      <CheckIcon className='p-1' />
                    ) : (
                      <ContentCopyIcon className='p-1' onClick={() => copyToClipboard(rewardAddress, setIsCopiedRewardAddress)} />
                    )}
                  
                  </span>
            </div>
          </div>
          <div className='w-[90%] mx-auto editprofile'>
          <button style={{  color:'#ffffff', background: '#18191B', border: '1px solid #6B7280' }} className='text-[14px] rounded-lg py-2 px-3 m-1 w-full font-bold '>
                Edit profile
            </button>
          </div>
          
          <div className="flex border-b mb-5 ml-10 w-[80%] noslide">
            <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'My NFTs (0)' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >My NFTs (0)</button></div>

            <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'For Sale' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >For Sale</button></div>

            <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Activity' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Activity</button></div>

            <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Favorites' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Favorites</button></div>

            <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Offers' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Offers</button></div>

            <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Creations (0)' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Creations (0)</button></div>

          </div>

          <div className='slide'>
          <div className="flex  border-b my-5 pt-2 px-10 mx-auto w-[80%] keen-slider" ref={sliderRef} >
            <section className='flex keen-slider__slide '>
                <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'My NFTs (0)' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >My NFTs (0)</button></div>

                <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'For Sale' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >For Sale</button></div>

                <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Activity' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Activity</button></div>
                <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Favorites' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Favorites</button></div>
                <p>&gt;&gt;</p>

            </section>
            <section className='flex keen-slider__slide'>
               
              <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Offers' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Offers</button></div>

              <div  className="mr-8 text-sm font-bold "><button    className={`pb-3 ${activeTab === 'Creations (0)' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Creations (0)</button></div>

            </section>
            

           
          </div>
          </div>

          <div>

    {/* MY NFTs SECTION */}

        {activeTab === 'My NFTs (0)' && (
            <div>
                <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className=' mx-auto w-[95%]  rounded-lg mb-12 h-24 nfttable '>
                      <div className='flex mx-3 my-[2.5%] justify-between '>
                      <section className='flex w-[70%]'>
                      <input
                            type="text"
                            style={{   background: '#18191B' }}
                            name="searchInput"
                            className=" rounded-sm  font-bold border-b w-[30%] pb-2 "
                            placeholder="Search NFTs"  
                     />
                       <h2 className='ml-4 font-bold' style={{ color: '#9ca3af'  }}>0 Match</h2>
                      </section>

                       <div className='flex buttonsinsearch'>
                     <button style={{ color: '#9ca3af',background: '#232a2e'  }} className='px-3 py-2 mr-2 font-bold rounded-lg'>Bulk List</button>
                     <button style={{ color: '#9ca3af',background: '#232a2e'  }} className='px-3 py-2 font-bold rounded-lg'>New Bundle +</button>
                    </div>
                      </div>
                   
                </div>
            </div>
        )}

        {/* FOR SALE SECTION */}

        {activeTab === 'For Sale' && (
             <div>
             <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className=' mx-auto w-[95%]  rounded-lg mb-12 h-24  '>
                   <div className='flex mx-3 my-[2.5%]'>
                   
                   <input
                         type="text"
                         style={{   background: '#18191B' }}
                         name="searchInput"
                         className=" rounded-sm  font-bold border-b w-[30%] pb-2 "
                         placeholder="Search NFTs for sale"  
                  />
                    <h2 className='mx-4 font-bold' style={{ color: '#9ca3af'  }}>0 Matches</h2>
                    <div className='flex'
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                   >
                    <p>{selectedText}</p>
                    <KeyboardArrowDownIcon/>
                    {isHovered && (
                        <div  style={{   background: '#18191B',border: '1px solid #6B7280' }} className='absolute grid w-1/6 mt-5 border rounded-md'>
                           <span onClick={() => handleSpanClick('All Listing')} className={`font-bold p-3 filterspans ${selectedText === 'All Listing' ? 'border' : ''}`}>All Listing</span>

                            <span onClick={() => handleSpanClick('Bundles')} className={`font-bold p-3 filterspans ${selectedText === 'Bundles' ? 'border' : ''}`}>Bundles</span>

                            <span onClick={() => handleSpanClick('Single Assets')} className={`font-bold p-3 filterspans ${selectedText === 'Single Assets' ? 'border' : ''}`}>Single Assets</span>
                        </div>
                    )}
                   </div>
                  
                   </div>
                  
             </div>
            
         </div>
        )}

        {activeTab === 'Activity' && (
            <>
            <p>Activity</p>
            </>
        )}
      
      {/* FAVORITES SECTION */}
        {activeTab === 'Favorites' && (
           <div>
           <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className=' ml-6 w-[95%]  rounded-lg mb-12 h-24  '>
                 <div className='flex mx-3 my-[2.5%]'>
                 
                 <input
                       type="text"
                       style={{   background: '#18191B' }}
                       name="searchInput"
                       className=" rounded-sm  font-bold border-b w-[30%] pb-2 "
                       placeholder="Search NFTs"  
                />
                  <h2 className='mx-4 font-bold' style={{ color: '#9ca3af'  }}>0 Matches</h2>
                 </div>
           </div>
          
       </div>
        )}

        {activeTab === 'Offers' && (
            <>
            <p>Offers</p>
            </>
        )}

        {activeTab === 'Creations (0)' && (
            <>
            <p>Creations (0)</p>
            </>
        )}

       
      </div>
    </div>
  );
};

export default Profile;
