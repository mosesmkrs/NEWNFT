
import React from "react"
    // IMPORTING NECESSARY COMPONENTS
import HeaderCarousel from "../components/HeaderCarousel"
 import LiveCollection from "../components/LaunchesPage/LiveCollection"
 import PastCollection from "../components/LaunchesPage/PastCollection"
import CarouselEntry from "../components/LaunchesPage/CarouselEntry"
    // IMPORTING NECESSARY DATABASES
import {launchpadCollectionsData} from '../database/launchpadCollectionsData'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function LaunchesPage(){
    const [currentCard, setCurrentCard] = React.useState(0)
    const [viewPastCollections, setViewPastCollections] = React.useState(false)
    const {liveCollections, pastCollections, carouselCollections} = launchpadCollectionsData
        // A FUNCTION TO GENERATE AN ARRAY OF LIVE COLLECTIONS
    function liveCollectionsGenerator() {
        const liveCollectionsArray = []

        for(let i = 0; i < 20; i++){
            liveCollectionsArray.push(<LiveCollection
                key = {i}
                image = {liveCollections.cardImage}
                title = {liveCollections.cardTitle}
                banner = {liveCollections.cardBanner}
                price = {liveCollections.price}
                id = {i}
            />)
        }

        return liveCollectionsArray
    }

    // A FUNCTION TO GENERATE AN ARRAY OF PAST COLLECTIONS
    function pastCollectionsGenerator() {
        const pastCollectionsArray = []

        for(let i = 0; i < 20; i++){
            pastCollectionsArray.push(<PastCollection
                key = {i}
                image = {pastCollections.cardImage}
                title = {pastCollections.cardTitle}
                banner = {pastCollections.cardBanner}
                price = {pastCollections.price}
                id = {i}
            />)
        }

        return pastCollectionsArray
    }

    function checkNextCard(){
        setCurrentCard(prevCard => prevCard < carouselCollections.length - 1 ? prevCard + 1 : 0)
    }

    // A FUNCTION TO MOVE TO THE PREVIOUS CARD
    function checkPreviousCard(){
        setCurrentCard(prevCard => prevCard > 0 ? prevCard - 1 : carouselCollections.length - 1)
    }

    const generatedEntriesArray = carouselCollections.map(detail => (
        <SwiperSlide key={detail._id}>
            <CarouselEntry
                image={detail.cardImage}
                heading={detail.cardTitle}
                description={detail.cardInfo}
                id={detail._id}
                
            />
        </SwiperSlide>
    ));

    function generatedDotSelectorsArray(){
        const dotSelectorsArray = []

        for(let i = 0; i < carouselCollections.length; i ++){
            dotSelectorsArray.push(
                <p 
                    className="font-bold text-6xl cursor-pointer   transition-all duration-500"
                    onClick={() => setCurrentCard(i)}
                    key={i}
                    
                    style={
                        i == currentCard 
                            ? 
                        { color:  "rgb(55 65 81)" } 
                            : 
                        null
                    }
                >.</p>
            )
        }

        return dotSelectorsArray
    }


  return (
     <div>
   
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
     
      {generatedEntriesArray.map((entry, index) => (
        <SwiperSlide key={index}
        
        > <HeaderCarousel
        carouselItems = {generatedEntriesArray}
        currentCarouselItem = {currentCard}
        dotScrollerButtons = {generatedDotSelectorsArray()}
        checkPreviousItem = {() => checkPreviousCard()}
        checkNextItem = {() => checkNextCard()}
    />
       
        </SwiperSlide>
      ))}
           
          
      
    </Swiper>
    <div className="flex items-center gap-[20px] my-0 mx-[20px] mt-[100px] w-full sm:w-[70%] sm:my-0 sm:mx-auto sm:mt-[150px] md:w-full md:ml-[12%] lg:mt-[50px] lg:gap-[50px]">
                <p 
                     onClick={() => setViewPastCollections(false)}
                    
                     style={
                         viewPastCollections 
                             ? 
                         null 
                             : 
                         {
                             "backgroundColor": "#EE9E26",
                             "border": "2px solid black",
                             "borderRadius": "20px",
                             "padding": "10px"
                         }
                     }

                     className="text-[#FFF] font-[Inter] text-[20px] not-italic font-[400] leading-normal cursor-pointer transition-all duration-500 ease-in-out"
                 >Live and upcoming</p>

                 <p 
                     onClick={() => setViewPastCollections(true)}
                    
                     style={
                         viewPastCollections 
                             ? 
                         {
                             "backgroundColor": "#EE9E26",
                             "border": "2px solid black",
                             "borderRadius": "20px",
                             "padding": "10px"
                         } 
                             : 
                         null
                     }

                     className="text-[#FFF] font-[Inter] text-[20px] not-italic font-[400] leading-normal cursor-pointer transition-all duration-500 ease-in-out"
                 >Past</p>
             </div>

             <div className="grid grid-flow-row grid-cols-2 my-[80px] mx-auto py-0 px-[10px] gap-y-[20px] gap-x-[10px] w-full lg:grid-cols-3">
                 {viewPastCollections ? pastCollectionsGenerator() : liveCollectionsGenerator()}
             </div>
         </div>
    
  
  );
  
}

