import {Button} from '@mui/material';
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from '../App';

const Navbar=() => {

    const a=JSON.parse(secureLocalStorage.getItem("info"));
    return (
        a&&<div className="my-5 mx-10 flex justify-between items-center space-x-5">
            <div className="flex">
                <p
                    className={`py-2 text-sm px-3 sm:px-10 font-semibold text-white sm:text-xl bg-${a.isAdmin? "green":"blue"
                        }-500 rounded-md`}
                >
                    {a.isAdmin? "Admin":"Employee"}
                </p>
                <p className="py-2 text-sm sm:px-10 font-semibold sm:text-xl">
                    Name : {a.data.name}
                </p>
            </div>
            <Link to={`${mainRoute}`} onClick={() => {
                return (
                    secureLocalStorage.clear()
                )
            }} color="error" sx={{margin: "0 auto", display: "block"}} variant="contained">Logout</Link>
        </div>
    )
}