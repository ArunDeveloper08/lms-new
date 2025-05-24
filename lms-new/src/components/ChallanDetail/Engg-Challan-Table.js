import React, { useEffect } from 'react';
import {
    Autocomplete,
    Button,
    TextField,
} from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import qs from "query-string";
import { useLocation, useNavigate } from 'react-router-dom';
import SingleChallanView from './single-challan-view';
import SingleChallanActions from './single-challan-actions';
import { mainRoute } from '../../App';
const EnggChallanTable = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [engineerName, setEngineerName] = useState(queryParams.get('engineer') || '');
    const [status, setStatus] = useState(queryParams.get('status') || '');
    const [data, setData] = useState([]);
    const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
    const [engineer, setEngineer] = useState([]);
    useEffect(() => {
        const newParams = new URLSearchParams();
        if (engineerName) newParams.set('engineer', engineerName);
        if (status) newParams.set('status', status);
        // Replace the current URL with the updated query parameters
        navigate(`${mainRoute}/challanhistory?${newParams}`, { replace: true });
    }, [engineerName, status, location.pathname, navigate]);

    useEffect(() => {
        if (engineerName && status) {
            searchChallan();
        }
        axios
            .get(`${window.MyApiRoute}employee/names`)
            .then((res) => {
                const engineerData = res.data.data.filter(
                    (employee) => employee?.Designation === "engineer"
                  );
          
                  setEngineer(engineerData);
            })
            .catch((err) => console.log({ err }));
    }, []);

    const searchChallan = async () => {
        const url = qs.stringifyUrl({
            url: `${window.MyApiRoute}record/get`,
            query: {
                createdBy: "engineer",
                engineerName: engineerName,
                status: status,
                category: "3-phaseMeter",
                location: "getChallanDetails",
                challanType: "external returnable challan"
            }
        });
        try {
            const { data } = await axios.post(url, userInfo);
            console.log(data);
            const statusFormatting = data.Data.filter(item => {
                if (status === "" || status === undefined) return true;
                return item.Status === status;
            });
            console.log(statusFormatting);
            setData(statusFormatting);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section >
            <div className="flex justify-around items-center mt-2">
                <Autocomplete
                    onChange={(e, f) => setEngineerName(f)}
                    className="w-[300px]"
                    name="Engineer"
                    value={engineerName}
                    options={engineer?.map((option) => option?.Name)}
                    renderInput={(params) => (
                        <TextField key={params} value={engineerName} {...params} label="Select Engineer Name" />
                    )}
                />
                <select
                    name="Status"
                    debounce={300}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
                    placeholder="Serial Number"
                    value={status}
                >
                    <option value="">All Status</option>
                    <option value="open">open</option>
                    <option value="close">close</option>
                </select>
                <p>No of Challans :{data.length}</p>
                <Button onClick={searchChallan} variant='contained' sx={{ paddingX: 4 }}>Search</Button>
            </div>
            {
                data?.map((item, index) => (
                    <section key={index} className='grid grid-cols-3'>
                        {/* <div className='col-span-2'>
                            <SingleChallanView userInfo={userInfo} item={item} />
                        </div> */}
                        <div className='col-span-3'>
                            <SingleChallanActions actions={item.Status === "open"} item={item} />
                        </div>
                    </section>
                ))
            }
        </section>
    );
};

export default EnggChallanTable;