/* eslint-disable react/prop-types */
// IMPORTING NECESSSARY FILES
  // IMPORTING COMPONENTS
import { Icon } from "@iconify/react";

// EXPORTING AN ALLCOLLECTIONS CARD COMPONENT
export default function AllCollectionsPageCard(props){
  // DEFINING VARIABLES
  const {cardImage, cardTitle, volume} = props

  return(
    <div className='collection-card rounded-lg  border border-solid border-gray-600 w-full hover:transform hover:scale-105 transition-transform duration-400'>
      <div className='collection-card-img-container'>
        <img src={cardImage} alt={cardTitle} className='w-full rounded-t-lg h-auto' />
      </div>

      <div className='collection-details-container px-3 py-5 text-gray-400 text-base'>
        <div className='collection-title flex items-center font-bold text-blue-400'>
          {cardTitle}
          <Icon icon="fluent:checkmark-starburst-16-filled" color="#75a8f9" width="16" height="16" className="ml-2" />
        </div>

        <p className='volume font-bold'>
          {volume}
          <span className='light-300'>  Volume</span>
        </p>
      </div>
    </div>
  )
}
