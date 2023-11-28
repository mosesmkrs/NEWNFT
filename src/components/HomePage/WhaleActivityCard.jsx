/* eslint-disable react/prop-types */
// IMPORTING NECESSARY FILES
  // IMPORTING COMPONENTS
import { Icon } from "@iconify/react";

// A FUNCTION THAT RETURNS A WHALEACTIVITY CARD COMPONENT
export default function WhaleActivityCard(props){
  return (
    <div className="flex flex-col md:flex md:flex-row   ">
      <div >
        <img
        className="rounded-lg"
          src={props.cardImage}
          alt={`Image ${props.index}`}
          width="100"
          height="100"
        />
      </div>

      <div className="p-2.5 text-sm text-text-gray">
        <span className="flex flex-row items-center bg-greenish w-fit px-2 py-1 rounded-md">
          <Icon icon="mdi:cart" color="#0e9f6e" />
          <p className="text-text-green text-xs">Purchase</p>
        </span>
        <p>{props.cardTitle}</p>
        <p className="text-md font-bold ">{props.price}</p>
        <p>{props.released}</p>
      </div>
    </div>
  );
}
