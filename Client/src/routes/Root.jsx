import {Outlet} from 'react-router-dom';
import {useState} from 'react';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {IconButton} from '@mui/material';

function Root() {
    const [open,setOpen] =useState(false);

    const handleOpen = () => {
        open ? setOpen(false) : setOpen(true);
    }

    return (
        <div>
            <div id="header">
                <div></div>
                <h1>Where's Waldo</h1>
                {open && <div>timer</div>}
                <IconButton color="primary" onClick={handleOpen}><WatchLaterIcon/></IconButton>
                
            </div>
            <Outlet/>
        </div>
    )
}

export default Root;