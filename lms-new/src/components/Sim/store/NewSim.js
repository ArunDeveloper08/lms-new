import React, { useState } from 'react'
import { TextField } from '@mui/material'
import axios from 'axios';
import  secureLocalStorage  from  "react-secure-storage";
const AddSim = () => {
    const [ data, setdata ] = useState({
        IMEI: "",
        PhoneNumber: "",
        remark: ""
    })
    const a = JSON.parse(secureLocalStorage.getItem("info")).data;
    const handleSubmit = () => {
        if (data.IMEI.length < 20) {
            return alert("IMEI Number Cannot be less than 20 digits")
        } else if (data.IMEI.length > 20) {
            return alert("MEI Number Cannot be more than 20 digits")
        }
        if (data.PhoneNumber.length < 10) {
            return alert("Phone Number Cannot be less than 10 digits")
        } else if (data.PhoneNumber.length > 10) {
            return alert("Phone Number Cannot be more than 10 digits")
        }
        axios.post(window.MyApiRoute + "sim/addnew", { ...a, IMEI: data.IMEI, PhoneNumber: +data.PhoneNumber, remark: data.remark })
            .then(res => {
                alert(res.data.message);
                if (res.data.message === "Successfully Added") {
                    setdata({
                        IMEI: "",
                        PhoneNumber: "",
                        remark: ""
                    });
                }
            }).catch(err => alert("Error", err.message));
    }
    const handleChange = (e) => {
        setdata({ ...data, [ e.target.name ]: e.target.value });
    }
    return (
        <>
            <p className='text-2xl font-semibold text-center'>Add a New Sim</p>
            <div className='flex mx-auto gap-y-5 py-20 rounded-lg flex-col items-center w-[90%] md:w-[500px] bg-gradient-to-r from-red-500 to-gray-700'>
                <TextField id="outlined-basic" inputProps={ { maxlength: 20 } } type='text' value={ data.IMEI } onChange={ handleChange } name="IMEI" sx={ { background: "#ededed" } } label="CIMIE No." variant="outlined" />
                <TextField id="outlined-basic"
                    inputProps={ {
                        min: 0,
                        pattern: "\d{ 10 }"
                    } } type='number' value={ data.PhoneNumber } onChange={ handleChange } name="PhoneNumber" sx={ { background: "#ededed", width: 1 / 2 } } label="Mobile No." variant="outlined" />
                {/* <TextField id="outlined-basic" type='text' value={ data.Remarks } onChange={ handleChange } name="Remarks" sx={ { background: "#ededed" } } label="Remarks" variant="outlined" /> */ }
                <textarea rows={ 4 } onChange={ handleChange } value={ data.remark } className='w-2/3 p-3' name="remark" placeholder='Activity Log'></textarea>
                <button onClick={ handleSubmit } className='px-10 py-2 text-lg bg-green-600 transition hover:text-xl duration-900 text-white rounded-md'>Create</button>
            </div>
        </>
    )
}

export default AddSim;