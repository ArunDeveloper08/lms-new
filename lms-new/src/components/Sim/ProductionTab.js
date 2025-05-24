import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IssueSim from './store/RecievedInStore';
import Received from './production/InProduction';
import ProductionWithDongle from './production/ProductionWithDongle';
import AllProductionList from './production/AllProductionList';

// import IssueSim from "./store/RecievedInStore"
const ProductionTab = () => {
    const [ value, setValue ] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //  /sim/getcount
    // POST -- "sim/addnew" -- To create a new Sim 
    // Put -- "sim/update'  --  To update the -- query= check = toRequire
    // get -- sim/get 
    return (
        // <Box sx={ { width: '100%', typography: 'body1' } }>
        //     <TabContext value={ value } >
        //         <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
        //             <TabList sx={ { width: "60%", margin: "0 auto" } } extColor="primary" variant="fullWidth"
        //                 indicatorColor="secondary" onChange={ handleChange } aria-label="lab API tabs example">
        //                 <Tab label={ `Without Dongle` } value="1" />
        //                 {/* <Tab label={ `With Dongle` } value="2" /> */ }
        //                 <Tab label={ `With Dongle` } value="4" />
        //                 <Tab label={ `All Production Sim` } value="3" />
        //                 {/* <Tab label={ `Return to Store` } value="4" /> */ }
        //                 {/* <Tab  label={ `All ProductionTab List` } value="4" /> */ }
        //             </TabList>
        //         </Box>
        //         <TabPanel sx={ { paddingX: 0 } } value="1"><Received /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="2"><ProductionWithDongle /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="3"><AllProductionList /></TabPanel>
        //         <TabPanel sx={ { paddingX: 0 } } value="4"><IssueSim /></TabPanel>
        //         {/* <TabPanel sx={ { paddingX: 0 } } value="4">4</TabPanel>/ */ }
        //     </TabContext>
        // </Box>
        <IssueSim />
    )
}

export default ProductionTab