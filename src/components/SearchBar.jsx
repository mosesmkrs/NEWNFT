/* eslint-disable react/prop-types */
// IMPORT NECESSARY FILES 
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop } from '@mui/material';

// EXPORTING A SEARCHBAR FUNCTION THAT RETURNS A SEARCHBAR COMPONENT
export default function SearchBar(props){
    // AN OBJECT HOLDING ALL CSS PROPERTIES
    const styles = {
        backDrop: {
            position: "absolute",
            width: "100%",
            height: "100%",
            marginTop: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            transition: "all 500ms ease-in-out normal",
            zIndex: "1",
            fontFamily: "Inter"
        }
    }

    return(
        <Backdrop
            open = {true}
            slotProps={{ root: { style: styles.backDrop } }}
        >
            <div className='w-full flex items-center justify-around m-auto mt-0 transition-all duration-500 ease-in-out bg-link-side-panel-container__side-panel--rewards-button shadow-search-container__search-bar gap-[10px] p-[20px] h-[70px]'>
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <SearchIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Collection or NFT"
                    type="text" 
                    name="search-data"
                    value={props.formData.searchData}
                    onChange={props.updateFormData}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                <IconButton 
                    color='warning' 
                    sx={{ p: '10px' }} 
                    onClick={props.hideSearchBar}
                >
                    <CloseIcon/>
                </IconButton>
            </div>
        </Backdrop>
    )
}