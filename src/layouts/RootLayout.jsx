// IMPORTING NECESSARY MODULES
import  { useState, useContext } from 'react';
import {Outlet} from 'react-router-dom'

// IMPORTING NECESSARY COMPONENTS
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LinkSidePanel from '../components/LinkSidePanel'
import SearchBar from "../components/SearchBar"

import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from "@mui/icons-material/LightMode";

// IMPORTING NECESSARY CONTEXTS
import { ThemeContext } from "../contexts/ThemeProvider";

// EXPORTING A ROOTLAYOUT FUNCTION
export default function RootLayout(){
    // A BOOLEAN TO KEEP TRACK OF SHOWING THE SEARCHBAR
    const [showSearchBar, setShowSearchBar] = useState(false)
    // A BOOLEAN TO KEEP TRACK OF SHOWING THE SEARCHBAR
    const [showLinkSidePanel, setShowLinkSidePanel] = useState(false)

    // A USESTATE FUNCTION TO TRACK CHANGES IN SEARCHBAR CONTENT
    const [formData, setFormData] = useState({
        search: ""
    })

    // OBTAINING CONTEXTS OF THEMES
    const [mode, toggleTheme] = useContext(ThemeContext);

    // A FUNCTION TO UPDATE FORMDATA
    function updateFormData(e){
        const {name, value} = e.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }
 
    return(
        <main className="min-h-[100vh] scroll-smooth relative w-[100%] overflow-x-hidden">
            {
                showLinkSidePanel && <LinkSidePanel 
                    hideLinkSidePanel = {() => setShowLinkSidePanel(false)}
                    toggleTheme = {() => toggleTheme()}
                    
                    themeIcon = {
                        mode === "dark" 
                            ? 
                        <LightModeIcon className="text-[#FFDB24] cursor-pointer" /> 
                            : 
                        <NightlightIcon className="text-[#9ca3af] cursor-pointer" />
                    }
                />
            }           

            {   
                showSearchBar && <SearchBar 
                    hideSearchBar = {() => setShowSearchBar(false)}
                    formData = {formData}
                    updateFormData = {(e) => updateFormData(e)}
                />
            }

            <Navbar
                showLinkSidePanel = {() => setShowLinkSidePanel(true)}
                showSearchBar = {() => setShowSearchBar(true)}
                // toggleLanguage={toggleLanguage}
                // currentLanguage={currentLanguage}
             />

            {/* <IntlProvider locale={currentLanguage} messages={locales[currentLanguage]}> */}
            <Outlet/>
            {/* </IntlProvider> */}
            <Footer/>
         </main>
     )
}