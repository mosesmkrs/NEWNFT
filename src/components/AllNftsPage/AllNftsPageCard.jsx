/* eslint-disable react/prop-types */
// IMPORTING NECESSARY FILES
  // IMPORTING NECESSARY COMPONENTS
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// EXPORTING A DEFAULT FUNCTION THAT RETURNS AN ALLNFTSPAGECARD
export default function AllNftsPageCard(props){
  // DEFINING VARIABLES
  const {cardImage, cardTitle, name, price} = props

  return (
    <div className="rounded-lg  border border-solid border-gray-600 w-full ">
      <img 
        className="w-full h-auto rounded" 
        src={cardImage} 
        alt={cardTitle} 
      />

      <div className="texts flex px-2 py-1">
        <p className="text-blue-500  text-base">{cardTitle}</p>
        <VerifiedIcon className="verified-icon text-blue-500 p-1 text-xs" />
      </div>

      <span className="name  p-2 text-lg">{name}</span>
      
      <div className="details flex justify-between items-center">
        <span className="price   text-xl p-1 m-2 font-bold">{price}</span>
        
        <span className="banner  text-yellow-600 m-2 px-2 py-0.5 rounded font-bold">
          <span>For Sale</span>
        </span>
      </div>
      
      <hr className="line border-t border-gray-500" />
      
      <div className="action  flex">
        <span className="text-lg "><FavoriteBorderOutlinedIcon /></span>
        <span className="text-lg mx-1">0</span>
      </div>
    </div>
  );
}
