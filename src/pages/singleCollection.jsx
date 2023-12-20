import { useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FaDiscord } from "react-icons/fa6";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AllNftsPageCard from '../components/AllNftsPage/AllNftsPageCard';
import allCollectionsCardData from '../database/allCollectionsCardData';
import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

import { useSearchParams } from 'react-router-dom'

//imports for table

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





const createData = (name, number) => {
    return { name, number };
  };
  
  const rows = [
    createData('₳ 3975', 2),
    createData('₳ 3827', 1),
    createData('₳ 3650', 1),
    createData('₳ 50', 1),
    createData('₳ 25', 1),
    createData('₳ 20', 1),
    createData('₳ 11', 1),
    createData('₳ 7', 1),
    createData('₳ 6', 1),
    createData('₳ 5', 1),
  ];


function SingleCollection() {
    
    

    
    const [isCopiedPolicyid, setIsCopiedPolicyid] = useState(false);

    const [searchParams] = useSearchParams()


    function validateQueryParams(){
        // GETTING POSSIBLE QUERIES AND A REGEX EXPRESSIONS
        const singleCollectionID = searchParams.get('singleCollectionID')
        const regex = /[0-9]/g
    
        // IF WE HAVE A CAROUSELCOLLECTION QUERY ONLY,VALIDATE IT AND RETURN RESPECTIVE DATA
        if(singleCollectionID){
          if(!regex.test(singleCollectionID)){
            throw new Error("Invalid value for query parameter")
          }
    
          
          const relativeData = allCollectionsCardData.find(dataEntry => dataEntry._id === parseInt(singleCollectionID))
          return relativeData
        // IF WE HAVE A PASTCOLLECTION QUERY ONLY,VALIDATE IT AND RETURN RESPECTIVE DATA
        }
        else{
          throw new Error("Invalid query parameter")
        }
      }

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
  const [showFullText, setShowFullText] = useState(false);
  const [activeTab, setActiveTab] = useState('NFTs');

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

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
function nftCardsArrayGenerator(){
    return allCollectionsCardData.map(cardData => (
      <AllNftsPageCard
        key={cardData._id}
        cardImage = {cardData.cardImage}
        cardTitle = {cardData.cardTitle}
        name = {cardData.name}
        price = {cardData.price}
       
      />
    ))
  }
    
  const cardData = validateQueryParams()
 
  return (
    // allCollectionsCardData.map((cardData)=>(
        
        <div key={cardData._id}>
            
      <img src={cardData.bannerImg} alt="banner" />
      <div>
           <div style={{   background: '#000000', border: '1px solid #6B7280' }} className='largescreen mx-auto w-[90%]  rounded-lg mb-12 h-fit flex translate-y-[-40%] '>
               
                <section className="grid pt-5 mx-2 w-fit h-fit">
                    <div className="flex content-center">
                    <img className="rounded-full w-16 mx-4" src={cardData.cardImage} alt="" />
                        <section className='grid mr-auto'>
                        <h1 className="font-bold text-slate-50 text-xl">
                            {cardData.cardTitle}
                        </h1>
                            <div className='flex h-fit '>
                            <VerifiedIcon className="verified-icon text-blue-500 m-[6px] " />
                            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 text-orange-400 mt-2 w-5 md:h-5 md:w-5"><path fillRule="evenodd" clipRule="evenodd" d="M17.1433 2.16984C16.7348 -0.245051 13.2652 -0.245051 12.8567 2.16984C12.564 3.90049 10.4467 4.58843 9.19258 3.36039C7.44265 1.64682 4.63572 3.68617 5.72466 5.87998C6.50506 7.45219 5.19651 9.25325 3.46011 8.99688C1.03717 8.63916 -0.0349846 11.9389 2.13548 13.0737C3.69095 13.8869 3.69095 16.1131 2.13548 16.9264C-0.0349855 18.0611 1.03717 21.3609 3.4601 21.0031C5.19651 20.7468 6.50506 22.5478 5.72466 24.12C4.63572 26.3139 7.44265 28.3532 9.19258 26.6396C10.4467 25.4116 12.564 26.0995 12.8567 27.8302C13.2652 30.2451 16.7348 30.2451 17.1433 27.8302C17.4361 26.0995 19.5533 25.4116 20.8074 26.6396C22.5574 28.3532 25.3643 26.3139 24.2753 24.12C23.495 22.5478 24.8035 20.7468 26.5399 21.0031C28.9628 21.3609 30.035 18.0611 27.8645 16.9264C26.3091 16.1131 26.3091 13.8869 27.8645 13.0737C30.035 11.9389 28.9628 8.63916 26.5399 8.99688C24.8035 9.25325 23.495 7.45219 24.2753 5.87998C25.3643 3.68617 22.5574 1.64682 20.8074 3.36039C19.5533 4.58843 17.4361 3.90049 17.1433 2.16984ZM8.20826 13.4165C8.24134 13.4165 8.27406 13.415 8.30638 13.4121C8.28934 13.6086 8.38845 13.9437 8.54121 14.4602L9.62551 18.1266C9.68674 18.3336 9.71735 18.4371 9.79721 18.4967C9.87707 18.5564 9.98501 18.5564 10.2009 18.5564H14.4668H15.5879H19.8538C20.0697 18.5564 20.1776 18.5564 20.2575 18.4967C20.3374 18.4371 20.368 18.3336 20.4292 18.1266L21.5135 14.4602C21.6653 13.9468 21.7642 13.6126 21.7486 13.4157C21.7631 13.4162 21.7776 13.4165 21.7922 13.4165C22.3905 13.4165 22.8755 12.9315 22.8755 12.3333C22.8755 11.735 22.3905 11.25 21.7922 11.25C21.194 11.25 20.709 11.735 20.709 12.3333C20.709 12.7502 20.9446 13.1121 21.2899 13.2932C21.1139 13.3939 20.8822 13.5738 20.5701 13.8162L18.336 15.5513C18.0626 15.7637 17.9259 15.8699 17.7857 15.8362C17.6454 15.8025 17.5719 15.6458 17.4248 15.3324L15.5773 11.3958C15.5544 11.3468 15.5326 11.3003 15.5117 11.2562C15.8706 11.0798 16.1177 10.7105 16.1177 10.2835C16.1177 9.6852 15.6327 9.20021 15.0344 9.20021C14.4362 9.20021 13.9512 9.6852 13.9512 10.2835C13.9512 10.7103 14.198 11.0795 14.5568 11.256C14.5359 11.3002 14.514 11.3468 14.491 11.3958L12.6399 15.3402C12.4928 15.6536 12.4193 15.8103 12.2791 15.844C12.1389 15.8777 12.0021 15.7715 11.7287 15.5591L9.4846 13.8162C9.15645 13.5613 8.91718 13.3755 8.7381 13.2783C9.06838 13.0928 9.29152 12.7391 9.29152 12.3333C9.29152 11.735 8.80653 11.25 8.20826 11.25C7.61 11.25 7.12501 11.735 7.12501 12.3333C7.12501 12.9315 7.61 13.4165 8.20826 13.4165ZM10.05 19.543C9.88432 19.543 9.75001 19.6773 9.75001 19.843V20.9178C9.75001 21.0835 9.88432 21.2178 10.05 21.2178H20.005C20.1707 21.2178 20.305 21.0835 20.305 20.9178V19.843C20.305 19.6773 20.1707 19.543 20.005 19.543H10.05Z" fill="currentColor"></path></svg>
                            </div>
                           
                        </section>

                        <section >
                           
                        {/* <div style={{   background: '#18191B'}} className='rounded-lg '> */}
                            {/* <div  className='py-1 px-2 pt-2.5 text-white border-r' style={{ borderColor: '#6b7280'}}>
                                <FaDiscord style={{ color: '#6B7280' }} className='w-5'/>
                            </div>
                            <div  className='py-1 px-2 text-white border-r' style={{ borderColor: '#6b7280'}}>
                               <TwitterIcon style={{ color: '#6B7280' }}/>
                            </div>
                            <div  className='py-1 px-2 text-white border-r' style={{ borderColor: '#6b7280'}}>
                               <LanguageIcon style={{ color: '#6B7280' }}/>
                            </div> */}
                            <div style={{   background: '#18191B'}} className='py-1 px-2 h-fit text-white rounded-lg '>
                                <MoreVertIcon style={{ color: '#6B7280' }}/>
                            </div>
                        {/* </div> */}

                        </section>
                     
                    </div>
                     <div className='w-[70%] ' >
                     <p style={{ color: '#6B7280' }} className='text-sm '>
                            {showFullText ? cardData.cardInfo : `${cardData.cardInfo.slice(0, 90)}...`}
                            <br/>
                            {cardData.cardInfo.length > 90 && (
                            <button onClick={toggleText} className='text-blue-500 cursor-pointer'>
                                {showFullText ? 'See less' : 'See more'}
                            </button>
                            )}
                        </p>
                     </div>

                     <section className='justify-between flex dafiicons'>

                     <div className='flex w-fit space-x-0 mt-auto details'>
                        <div  className='pr-4 text-white '>
                            <p className='font-bold'>{cardData.floor}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>floor</p>
                        </div>
                        <div  className='pr-4 text-white '>
                            <p className='font-bold'>{cardData.offer}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>best offer</p>
                        </div>
                        <div  className='pr-4 text-white '>
                            <p className='font-bold'>{cardData.amount}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>volume</p>
                        </div>
                        <div  className='pr-4 text-white '>
                            <p className='font-bold'>{cardData.listed}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>listed</p>
                        </div>
                        <div  className='pr-4 text-white '>
                            <p className='font-bold'>{cardData.nfts}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>NFTs</p>
                        </div>
                        <div  className='pr-4 text-white '>
                            <p className='font-bold'>{cardData.unique}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>unique wallets</p>
                        </div>
                    </div>

                    <div>
                    <div  className='flex mt-7  w-fit space-x-0 rounded-lg '>
                            <div  className='py-1 px-2 text-sm  border-r' style={{ borderColor: '#6b7280',color: '#6B7280'}}>
                              <p>DAO</p>
                            </div>
                            <div  className='py-1 px-2 text-sm border-r' style={{ borderColor: '#6b7280',color: '#6B7280'}}>
                               <p>Defi</p>
                            </div>
                            <div  className='py-1 px-2 text-sm ' style={{ borderColor: '#6b7280',color: '#6B7280'}}>
                               <p> PFP</p>
                            </div>
                            
                        </div>
                        
                    </div>

                     </section>
                     <p className='mr-2 mt-2 flex  text-blue-500 font-bold text-sm'>policy ID: {cardData.policy.slice(0, 7)}...{cardData.policy.slice(-5)}
                            {isCopiedPolicyid ? (
                                    <CheckIcon className='p-1' />
                                ) : (
                                    <ContentCopyIcon className='p-1' onClick={() => copyToClipboard(cardData.policy,setIsCopiedPolicyid)} />
                                )}
                            </p>
                </section>
           </div>
           <div style={{   background: '#000000', border: '1px solid #6B7280' }} className='smallscreen mx-auto w-[90%]  rounded-lg mb-12 h-fit flex translate-y-[-44%] '>
                <section>
                    <img className="rounded-full w-28 m-6" src={cardData.cardImage} alt="" />
                </section>
                <section className="grid pt-5 mx-2 w-full h-fit">
                    <div className="flex  justify-between">
                        <section className="flex">
                            <h1 className="font-bold text-slate-50 text-2xl">{cardData.cardTitle}</h1>
                            <VerifiedIcon className="verified-icon text-blue-500 m-[6px] " />
                            <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 text-orange-400 mt-2 w-5 md:h-5 md:w-5"><path fillRule="evenodd" clipRule="evenodd" d="M17.1433 2.16984C16.7348 -0.245051 13.2652 -0.245051 12.8567 2.16984C12.564 3.90049 10.4467 4.58843 9.19258 3.36039C7.44265 1.64682 4.63572 3.68617 5.72466 5.87998C6.50506 7.45219 5.19651 9.25325 3.46011 8.99688C1.03717 8.63916 -0.0349846 11.9389 2.13548 13.0737C3.69095 13.8869 3.69095 16.1131 2.13548 16.9264C-0.0349855 18.0611 1.03717 21.3609 3.4601 21.0031C5.19651 20.7468 6.50506 22.5478 5.72466 24.12C4.63572 26.3139 7.44265 28.3532 9.19258 26.6396C10.4467 25.4116 12.564 26.0995 12.8567 27.8302C13.2652 30.2451 16.7348 30.2451 17.1433 27.8302C17.4361 26.0995 19.5533 25.4116 20.8074 26.6396C22.5574 28.3532 25.3643 26.3139 24.2753 24.12C23.495 22.5478 24.8035 20.7468 26.5399 21.0031C28.9628 21.3609 30.035 18.0611 27.8645 16.9264C26.3091 16.1131 26.3091 13.8869 27.8645 13.0737C30.035 11.9389 28.9628 8.63916 26.5399 8.99688C24.8035 9.25325 23.495 7.45219 24.2753 5.87998C25.3643 3.68617 22.5574 1.64682 20.8074 3.36039C19.5533 4.58843 17.4361 3.90049 17.1433 2.16984ZM8.20826 13.4165C8.24134 13.4165 8.27406 13.415 8.30638 13.4121C8.28934 13.6086 8.38845 13.9437 8.54121 14.4602L9.62551 18.1266C9.68674 18.3336 9.71735 18.4371 9.79721 18.4967C9.87707 18.5564 9.98501 18.5564 10.2009 18.5564H14.4668H15.5879H19.8538C20.0697 18.5564 20.1776 18.5564 20.2575 18.4967C20.3374 18.4371 20.368 18.3336 20.4292 18.1266L21.5135 14.4602C21.6653 13.9468 21.7642 13.6126 21.7486 13.4157C21.7631 13.4162 21.7776 13.4165 21.7922 13.4165C22.3905 13.4165 22.8755 12.9315 22.8755 12.3333C22.8755 11.735 22.3905 11.25 21.7922 11.25C21.194 11.25 20.709 11.735 20.709 12.3333C20.709 12.7502 20.9446 13.1121 21.2899 13.2932C21.1139 13.3939 20.8822 13.5738 20.5701 13.8162L18.336 15.5513C18.0626 15.7637 17.9259 15.8699 17.7857 15.8362C17.6454 15.8025 17.5719 15.6458 17.4248 15.3324L15.5773 11.3958C15.5544 11.3468 15.5326 11.3003 15.5117 11.2562C15.8706 11.0798 16.1177 10.7105 16.1177 10.2835C16.1177 9.6852 15.6327 9.20021 15.0344 9.20021C14.4362 9.20021 13.9512 9.6852 13.9512 10.2835C13.9512 10.7103 14.198 11.0795 14.5568 11.256C14.5359 11.3002 14.514 11.3468 14.491 11.3958L12.6399 15.3402C12.4928 15.6536 12.4193 15.8103 12.2791 15.844C12.1389 15.8777 12.0021 15.7715 11.7287 15.5591L9.4846 13.8162C9.15645 13.5613 8.91718 13.3755 8.7381 13.2783C9.06838 13.0928 9.29152 12.7391 9.29152 12.3333C9.29152 11.735 8.80653 11.25 8.20826 11.25C7.61 11.25 7.12501 11.735 7.12501 12.3333C7.12501 12.9315 7.61 13.4165 8.20826 13.4165ZM10.05 19.543C9.88432 19.543 9.75001 19.6773 9.75001 19.843V20.9178C9.75001 21.0835 9.88432 21.2178 10.05 21.2178H20.005C20.1707 21.2178 20.305 21.0835 20.305 20.9178V19.843C20.305 19.6773 20.1707 19.543 20.005 19.543H10.05Z" fill="currentColor"></path></svg>
                           
                        </section>

                        <section className="flex">
                            <p className='mr-2 mt-2 flex  text-blue-500 font-bold text-sm'>policy ID: {cardData.policy.slice(0, 7)}...{cardData.policy.slice(-5)}
                            {isCopiedPolicyid ? (
                                    <CheckIcon className='p-1' />
                                ) : (
                                    <ContentCopyIcon className='p-1' onClick={() => copyToClipboard(cardData.policy,setIsCopiedPolicyid)} />
                                )}
                            </p>
                        <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className='flex  w-fit space-x-0 rounded-lg '>
                            <div  className='py-1 px-2 pt-2.5 text-white border-r' style={{ borderColor: '#6b7280'}}>
                                <FaDiscord style={{ color: '#6B7280' }} className='w-5'/>
                            </div>
                            <div  className='py-1 px-2 text-white border-r' style={{ borderColor: '#6b7280'}}>
                               <TwitterIcon style={{ color: '#6B7280' }}/>
                            </div>
                            <div  className='py-1 px-2 text-white border-r' style={{ borderColor: '#6b7280'}}>
                               <LanguageIcon style={{ color: '#6B7280' }}/>
                            </div>
                            <div  className='py-1 px-2 text-white '>
                                <MoreVertIcon style={{ color: '#6B7280' }}/>
                            </div>
                        </div>

                        </section>
                     
                    </div>
                     <div className='w-[70%] ' >
                     <p style={{ color: '#6B7280' }} className='text-sm '>
                            {showFullText ? cardData.cardInfo : `${cardData.cardInfo.slice(0, 90)}...`}
                            <br/>
                            {cardData.cardInfo.length > 90 && (
                            <button onClick={toggleText} className='text-blue-500 cursor-pointer'>
                                {showFullText ? 'See less' : 'See more'}
                            </button>
                            )}
                        </p>
                     </div>

                     <section className='justify-between flex'>

                     <div className='flex w-fit space-x-0 mt-5'>
                        <div  className='py-1 pr-5 text-white '>
                            <p className='font-bold'>{cardData.floor}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>floor</p>
                        </div>
                        <div  className='py-1 px-5 text-white '>
                            <p className='font-bold'>{cardData.offer}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>best offer</p>
                        </div>
                        <div  className='py-1 px-5 text-white '>
                            <p className='font-bold'>{cardData.amount}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>volume</p>
                        </div>
                        <div  className='py-1 px-5 text-white '>
                            <p className='font-bold'>{cardData.listed}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>listed</p>
                        </div>
                        <div  className='py-1 px-5 text-white '>
                            <p className='font-bold'>{cardData.nfts}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>NFTs</p>
                        </div>
                        <div  className='py-1 px-5 text-white '>
                            <p className='font-bold'>{cardData.unique}</p>
                            <p style={{ color: '#6B7280' }} className='text-xs '>unique wallets</p>
                        </div>
                    </div>

                    <div>
                    <div  className='flex mt-7  w-fit space-x-0 rounded-lg '>
                            <div  className='py-1 px-2 text-sm  border-r' style={{ borderColor: '#6b7280',color: '#6B7280'}}>
                              <p>DAO</p>
                            </div>
                            <div  className='py-1 px-2 text-sm border-r' style={{ borderColor: '#6b7280',color: '#6B7280'}}>
                               <p>Defi</p>
                            </div>
                            <div  className='py-1 px-2 text-sm ' style={{ borderColor: '#6b7280',color: '#6B7280'}}>
                               <p> PFP</p>
                            </div>
                            
                        </div>
                    </div>

                     </section>
                  
                </section>
           </div>


           <div className="flex border-b mb-5 mx-auto w-[90%] mt-[-7%]">
            <div  className="font-bold mr-8 text-sm "><button    className={`pb-3 ${activeTab === 'NFTs' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >NFTs</button></div>

            <div  className="font-bold mr-8 text-sm "><button    className={`pb-3 ${activeTab === 'Offers' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Offers</button></div>

            <div  className="font-bold mr-8 text-sm "><button    className={`pb-3 ${activeTab === 'Activity' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Activity</button></div>

            <div  className="font-bold mr-8 text-sm "><button    className={`pb-3 ${activeTab === 'Analytics' ? 'active' : ''}`}  onClick={(e) => changeTab(e.target)} >Analytics</button></div>

          </div>
          <div>
            
          {activeTab === 'NFTs' && (
             <div className='w-[90%] mx-auto'>
                <section className='flex justify-between'>
                    <div className='flex'>
                        <button style={{  color:'#ffffff', background: '#18191B', border: '1px solid #FFDB24' }} className='text-[14px] rounded-lg py-2 px-3 m-1 text-sm font-bold flex '>

                        <svg className='w-5 mr-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"></path></svg>
                            Sweep NFTs
                        </button>

                        <button  style={{   background: '#18191B', border: '1px solid #6B7280' }} className='py-2 px-3 font-bold m-1 rounded-lg text-white text-sm'>
                        New Collection Offer
                        </button>
                    </div >
                    <div>
                        <button
                     className='py-2 px-3 font-bold m-1 rounded-lg text-gray-500  text-sm bg-gray-800 flex'>
                        <ElectricBoltIcon className='p-0.5 mr-2'/>
                            Instant sale N/A
                        </button>
                    </div>
                </section>
                <section className='flex justify-between my-5'>
                      <div className='flex'>
                            <button style={{  color:'#ffffff', background: '#18191B', border: '1px solid #6B7280' }} className='text-[14px] rounded-lg py-2 px-3 m-1 text-sm font-bold flex '>

                            <svg className='w-5 mr-1 text-gray-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path></svg>
                            
                               Filters
                            </button>
                      </div>
                      <div className='w-[70%] flex  bg-[#18191B] rounded-xl p-3'>
                      <SearchIcon className="text-gray-600 m-auto mx-2 " />
                      <input
                      
                       type="text"
                       style={{   background: '#18191B' }}
                       name="searchInput"
                       className=" rounded-lg  w-[100%]  "
                       placeholder="Search 6991 NFTs (292 listed)"  
                />
               
                      </div>
                      <div>
                      <button  style={{   background: '#18191B', border: '1px solid #6B7280' }} className='py-2 px-3 font-bold m-1 rounded-lg text-white text-sm flex'>
                        Price: Low to High
                        <KeyboardArrowDown />
                        </button>
                      </div>
                </section>

                <section>
                <div className="render-cards">
          <div className="render-cards">
          
          <div className="cards  gap-5 py-10 px-2 grid md:grid-cols-3  sm:grid-cols-3 lg:grid-cols-5 lg:px-20 ">
            {nftCardsArrayGenerator()}
          </div>
        </div>
      </div>
                </section>
            
         </div>
        )}

        {activeTab === 'Activity' && (
             <div className='w-[90%] mx-auto'>
             Activity section under development!!!
               
            </div>
        )}
      
      {/* FAVORITES SECTION */}
        {activeTab === 'Analytics' && (
           <div className='w-[90%] mx-auto'>
        Analytics section under development!!!
          
       </div>
        )}



        {activeTab === 'Offers' && (
            <div className='w-[90%] mx-auto'>
                <section className='flex justify-between'>
                        <button  style={{   background: '#18191B', border: '1px solid #6B7280' }} className='py-2 px-3 font-bold m-1 rounded-lg text-white text-sm'>
                                        New Collection Offer
                        </button>
                        <button
                            className='py-2 px-3 font-bold m-1 rounded-lg text-gray-500  text-sm bg-gray-800 flex'>
                                <ElectricBoltIcon className='p-0.5 mr-2'/>
                                    Instant sale N/A
                            </button>
                </section>

                <div style={{   background: '#18191B', border: '1px solid #6B7280' }} className='w-full flex mx-auto my-3 bg-[#18191B] rounded-lg p-2'>
                      <SearchIcon className="text-gray-600 m-auto mx-2 " />
                      <input
                      
                       type="text"
                       style={{   background: '#18191B' }}
                       name="searchInput"
                       className=" rounded-md  w-[100%] text-sm "
                       placeholder="Search NFTs..."  
                />
               
                      </div>

                      <section className='flex justify-between'>
                        <section className='mb-8 mt-3'>
                           
                        <TableContainer style={{   background: '#18191B', border: '1px solid #6B7280' }} component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow >
                                        <TableCell sx={{ fontFamily:'lexend', fontSize:'16px' }}>Collection Offers</TableCell>
                                        <TableCell sx={{ fontFamily:'lexend' }} align='right'><CachedIcon /></TableCell>
                                        
                                    </TableRow>
                                    <TableRow sx={{ backgroundColor:'#1d2022' }}>
                                        <TableCell sx={{ color:'#6B7280', fontSize:'12px', fontWeight:'bold',fontFamily:'lexend' }}>OFFER</TableCell>
                                        <TableCell sx={{ color:'#9ca3af', fontSize:'12px', fontWeight:'bold',fontFamily:'lexend' }} >NUMBER OF OFFERS</TableCell>
                                        
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell sx={{fontFamily:'lexend'}}>{row.number}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </section>
                        <section className='w-full ml-3 mt-3'>
                            <div className='rounded-md' style={{   background: '#18191B', border: '1px solid #6B7280' }}>
                            <p className=' p-3 font-bold text-sm border-b-1' style={{borderBottom: '1px solid #6B7280'}}> Choose NFT to sell</p>
                            <p className='p-12 text-center font-bold'>You do not own any NFTs from this collection!</p>
                            </div>
                        </section>

                      </section>

            </div>
        )}

       

          </div>
       </div>
    </div>
        // ))
    
  )
}

export default SingleCollection
