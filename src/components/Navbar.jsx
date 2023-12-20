/* eslint-disable react/prop-types */
/* @jsxImportSource theme-ui */
// IMPORING NECESSARY MODULES

import { NavLink } from "react-router-dom";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState, useContext } from "react";
import NightlightIcon from '@mui/icons-material/Nightlight';
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import { useWallet } from '@meshsdk/react';

//  IMPORING NECESSARY COMPONENTS
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
// import { Icon } from "@iconify/react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TextField } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeProvider";
import Selected from "../layouts/selected";

// EXPORTING A FUNCTION THAT CREATES A NAVBAR COMPONENT
export default function Navbar(props) {
  const { open } = useWeb3Modal();
  const [mode, toggleTheme] = useContext(ThemeContext);

  // Function to connect the wallet
  const connectWallet = async () => {
    try {
      // Open the wallet modal using the open function from useWeb3Modal
      await open();
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };


  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredd, setIsHoveredd] = useState(false);
 

  
  
  const toggleAdditionalButtons = () => {
    setShowAdditionalButtons(true);
    setIsButtonOpen(false);
  };
  const togglebutton=() =>{
    setIsButtonOpen(true);
    setShowAdditionalButtons(false);
  }


  // AN OBJECT CONTAINING CSS PROPERITES
  const styles = { input: {
    mediumScreens: {
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "44px",
      paddingRight: "44px",
      marginLeft: "-35px",
      width: "260px",
      height: "50px",
      borderRadius: "20px",
      border: "1px solid #8B919B",
      backgroundColor: "rgba(255, 255, 255, 0.00)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#8B919B",
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.5",
    },

    largeScreens: { width: "356px" }
  }}

 return (
  <div>
    <div className="navbar flex items-center pb-[20px] h-[95px] p-[5px] pr-0 mb-[0px] w-[100%] relative transition-all duration-500 ease-in-out justify-between font-[Inter] sm:justify-between shadow-dropdown-content">
      <NavLink to="/home">
        <div className="flex justify-center items-center">
          <img src="/img/birble.png" className="w-[32px] h-auto m-[10px]" />

          <p className="ml-[-10px] mr-[30px] text-center  font-[Inter] text-[20px] font-[600] leading-normal sm:text-[24px] " >
            Birble.store
          </p>
        </div>
      </NavLink>

      <div className="small-screen-buttons flex justify-center items-center gap-[15px] sm:hidden">
        <button
          className="w-[45px] h-[45px] rounded-full bg-small-screen-buttons__search-button border-[2px] border-solid border-small-screen-buttons__search-button p-[4px] cursor-pointer transition-all duration-500 ease-in-out " 
          title="search-button"
        >
          <SearchIcon
            className="text-[#706f6f] cursor-pointer"
            onClick={props.showSearchBar}
          />
        </button>


        <button 
          className='w-[45px] h-[45px] rounded-full bg-small-screen-buttons__wallet-button border-[2px] border-solid border-small-screen-buttons__wallet-button p-[4px] cursor-pointer transition-all duration-500 ease-in-out flex justify-center items-center'
           onClick={toggleAdditionalButtons}
          title='show-wallet'
        >
          <AccountBalanceWalletIcon/>
        </button>

        <button
          className="small-screen-buttons__side-panel-button w-[45px] h-[45px] rounded-full bg-small-screen-buttons__search-button border-[2px] border-solid border-small-screen-buttons__search-button p-[4px] flex justify-center items-center flex-col"
          title="show-sidebar"
          onClick={props.showLinkSidePanel}
        >
          <MenuIcon/>
        </button>
      </div>

      <div className="medium-screen-buttons hidden sm:flex sm:justify-between sm:items-center sm:gap-[10px] sm:w-[100%] md:hidden">
        <div className="hidden justify-center items-center sm:flex sm:my-0 sm:mx-auto">
          <SearchIcon className="text-[#706f6f] cursor-pointer" />

          <TextField
            type="text"
            placeholder="Search collection, or NFT"
            name="searchInput"
            autoComplete="on"
            InputProps={{ style: {...styles.input.mediumScreens }}}
            
          />
        </div>

        <div className="medium-screen-buttons__button-container sm:flex sm:justify-center sm:items-center sm:gap-[15px]">
          <button
            className="w-[45px] h-[45px] rounded-full bg-small-screen-buttons__wallet-button border-[2px] border-solid border-small-screen-buttons__wallet-button p-[4px] cursor-pointer transition-all duration-500 ease-in-out flex justify-center items-center"
            onClick={toggleAdditionalButtons}
            title="show-wallet"
          >
            <AccountBalanceWalletIcon/>
          </button>

          <button
            className="small-screen-buttons__side-panel-button w-[45px] h-[45px] rounded-full bg-small-screen-buttons__search-button border-[2px] border-solid border-small-screen-buttons__search-button p-[4px] flex justify-center items-center flex-col"
            title="show-sidebar"
            onClick={props.showLinkSidePanel}
          >
            <MenuIcon/>
          </button>
        </div>
      </div>

      <div className="large-screen-buttons hidden md:flex md:justify-between md:items-center md:gap-[10px] md:w-[100%] lg:hidden">
        <div className="hidden justify-center items-center sm:flex sm:my-0 sm:mx-auto">
          <SearchIcon className="text-[#706f6f] cursor-pointer" />

          <TextField
            type="text"
            placeholder="Search collection, or NFT"
            name="searchInput"
            autoComplete="on"
            InputProps={{ style: {...styles.input.mediumScreens, ...styles.input.largeScreens }}}
            
          />
        </div>

        <div className="medium-screen-buttons__button-container sm:flex sm:justify-center sm:items-center sm:gap-[15px]">
          <button
            className="w-[45px] h-[45px] rounded-full bg-small-screen-buttons__wallet-button border-[2px] border-solid border-small-screen-buttons__wallet-button p-[4px] cursor-pointer transition-all duration-500 ease-in-out flex justify-center items-center"
            onClick={toggleAdditionalButtons}
            title="show-wallet"
          >
            <AccountBalanceWalletIcon/>
          </button>

          <button
            className="small-screen-buttons__side-panel-button w-[45px] h-[45px] rounded-full bg-small-screen-buttons__search-button border-[2px] border-solid border-small-screen-buttons__search-button p-[4px] flex justify-center items-center flex-col"
            title="show-sidebar"
            onClick={props.showLinkSidePanel}
          >
            <MenuIcon/>
          </button>
        </div>
      </div>

        <div className="extra-large-screen-buttons hidden lg:flex lg:justify-around">
          <div className="lg:flex lg:items-center lg:justify-center">
            <SearchIcon className="text-[#706f6f] cursor-pointer" />

          <TextField
            type="text"
            placeholder="Search collection, or NFT"
            name="searchInput"
            autoComplete="on"
            InputProps={{ style: {...styles.input.mediumScreens, ...styles.input.largeScreens}}}
          />
        </div>

          <div className="nav-links  items-center flex my-0 mr-[10px] ml-[10.104px] p-0 pl-[0px] justify-evenly">
            <div>
              <NavLink
                className="rewards m-0 mr-[32px] text-[#FFDB24] font-[Inter] font-[400] leading-normal text-[14px]"
                to="/rewards"
              >
                Rewards
              </NavLink>
            </div>

            <div className="dropdown">
              <span className="m-0 mr-[32px]  text-[14px] font-[400] leading-normal">
                <a className="">Explore</a>

                <div className="dropdown-content hidden absolute text-[#555c69] bg-[ ] min-w-[160px] z-[1] rounded-[5px] ml-[-10px] shadow-dropdown-content">
                 
                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/explore/allcollections"
                  >
                    All collections
                  </NavLink>

                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/explore/allnfts"
                  >
                    All NFTs
                  </NavLink>
                  {/* Add more links as needed */}
                </div>
              </span>
            </div>

            <div className="dropdown">
              <span className="m-0 mr-[32px]  text-[14px] font-[400] leading-normal">
                <a className="">Creators</a>
                <div className="dropdown-content hidden absolute text-[#555c69] bg-[ ] min-w-[160px] z-[1] rounded-[5px] ml-[-10px] shadow-dropdown-content">
                  {/* Dropdown links */}
                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/creators/mining"
                  >
                    Create your collection
                  </NavLink>

                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/creators/verification"
                  >
                    Verify your collection
                  </NavLink>
                  {/* Add more links as needed */}
                </div>
              </span>
            </div>

            <div className="dropdown">
              <span className="m-0 mr-[32px]  text-[14px] font-[400] leading-normal">
                <a className="">About</a>
                <div className="dropdown-content hidden absolute text-[#555c69] bg-[ ] min-w-[160px] z-[1] rounded-[5px] ml-[-10px] shadow-dropdown-content">
                  {/* Dropdown links */}
                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/about/team"
                  >
                    Our team
                  </NavLink>

                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/about/impact"
                  >
                    Our impact
                  </NavLink>
                  {/* Add more links as needed */}
                </div>
              </span>
            </div>

            <div className="dropdown">
              <span className="m-0 mr-[32px] text-[14px] font-[400] leading-normal">
                <a className="">Launchpad</a>
                <div className="dropdown-content hidden absolute text-[#555c69] bg-[ ] min-w-[160px] z-[1] rounded-[5px] ml-[-10px] shadow-dropdown-content">
                  {/* Dropdown links */}
                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/launchpad/launches"
                  >
                    Launches
                  </NavLink>

                  <NavLink
                    className=" block py-[12px] px-[16px] hover:bg-[#2a2929]"
                    to="/launchpad/apply for launchpad"
                  >
                    Apply For Launchpad
                  </NavLink>
                  {/* Add more links as needed */}
                </div>
              </span>
            </div>

            <span className="m-0 mr-[20px] text-[#FFF] text-[14px] font-[400] leading-normal">
              <button onClick={() => toggleTheme()}>
                {mode === "dark" ? (
                  <LightModeIcon className="text-[#FFDB24] cursor-pointer" />
                ) : (
                 <NightlightIcon className="text-[#9ca3af] cursor-pointer" />
                )}
              </button>
            </span>

            <span className="m-0 mr-[20px] text-[#FFF] text-[14px] font-[400] leading-normal">
              <NotificationsIcon className="text-[#9CA3AF] cursor-pointer" />
            </span>
           
            {props.selectedWallet ? (
              <>
              <Selected/>

           
              </>
       
      ):(
        <>
         {isButtonOpen && (
                <button
                className="text-[#000000] flex text-[14px] bg-[#FFDB24] py-[8px] px-[0px] border-none rounded-[8px] m-[0px] ml-[5px] transition-all duration-500 ease-in-out cursor-pointer active:scale-[0.8] active:opacity-[0.7]"
                onClick={toggleAdditionalButtons}
              >
                <span>Connect wallet </span>
                <span>
                  <KeyboardArrowDownIcon className="m-0 p-0 -ml-1" />
                </span>
              </button>
              
           )}
          
          
        {showAdditionalButtons && (
          <div className=" flex additional-btns relative right-[2%] ">
            <button
              onClick={props.toggleCardanoModal}
              className="additional-button text-[#ffffff] text-[14px] py-[8px] px-[4px] mr-3 border-none rounded-[8px]"
            >
              <img className="w-7" src="/img/cardanoImg.png" alt="img" 
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}/>
              {isHovered &&(
                <p className="absolute   text-slate-400">Cardano wallet</p>
              )}
            </button>

            <button
             onMouseEnter={() => setIsHoveredd(true)}
             onMouseLeave={() => setIsHoveredd(false)}
              onClick={connectWallet}
              className="additional-button text-[#ffffff] text-[14px] py-[8px] px-[4px] border-none rounded-[8px]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="tw-w-[18px] tw-h-[18px] md:tw-w-[24px] md:tw-h-[24px]" color="#998CA6"><path d="M11.7984 15.8266L11.7999 9.09692L5.33984 11.9317L11.7984 15.8266Z" fill="#998CA6"></path><path d="M11.835 9.09692L11.8335 15.8282L18.2948 11.9317L11.835 9.09692Z" fill="#998CA6"></path><path d="M18.2881 11.894L11.8335 1.28885L11.835 9.06219L18.2881 11.894Z" fill="#998CA6"></path><path d="M11.8341 16.9274L11.8335 22.1225L18.3002 13.2196L11.8341 16.9274Z" fill="#998CA6"></path><path d="M11.7985 22.119L11.7991 16.9263L5.33447 13.2196L11.7985 22.119Z" fill="#998CA6"></path><path d="M5.34668 11.8941L11.8001 9.06225L11.7986 1.29299L5.34668 11.8941Z" fill="#998CA6"></path><path d="M11.817 15.875L11.8296 15.868L18.3387 11.9427L18.352 11.9348L11.8327 1.22256L11.8176 1.2L11.8021 1.22256L5.28223 11.9348L11.8046 15.8682L11.817 15.8753V15.875ZM18.2879 11.894L11.8348 9.06221L11.8336 1.28887L18.2879 11.894ZM11.8348 9.097L18.2946 11.9318L11.8336 15.8283L11.8348 9.097ZM11.7985 15.8267L5.33995 11.9318L11.8 9.097L11.7985 15.8267ZM5.34659 11.894L11.7985 1.29295L11.8 9.06221L5.34659 11.894Z" fill="#998CA6"></path><path d="M5.21729 13.1153L11.8055 22.1854L11.8173 22.2001L11.8294 22.1854L18.4173 13.1153L11.8173 16.8998L5.21729 13.1153ZM11.7986 22.1191L5.33454 13.2197L11.7992 16.9264L11.7986 22.1191ZM11.8339 16.9275L18.3 13.2197L11.8336 22.1226L11.8342 16.9275H11.8339Z" fill="#998CA6"></path></svg>
              {isHoveredd &&(
                <p className="absolute text-slate-400">Etherium wallet</p>
              )}
            </button>
            <span className="close-button  text-2xl  cursor-pointer text-slate-500" onClick={togglebutton}>
            &times;
         </span>
          </div>
        )}
        </>
      )}
          </div>
        </div>  
          
      </div>
     
    </div>
  );
}
