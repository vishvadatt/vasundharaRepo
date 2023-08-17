import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const [Brand, setBrand] = useState([]);
    const [Category, setCategory] = useState([]);
    const queryParameter = useLocation()
    const id = queryParameter.search.split("?Id=")

    const [login,setLogin] = useState({
        vehicleName : "",
        vehicleNumber : 0,
        color : "",
        Description : "",
        brandId : "",
        categoryId : "",
        userId : ""
    })
    const [errMsg,setErrMsg] = useState("");

    const {vehicleName,vehicleNumber,color,brandId,categoryId} = login
    const findVehicle = async () => {
        const response = await axios.get(`http://localhost:8080/api/Vehicle/findOne-vehicle/${id[1]}`);
        setLogin(response.data)
    }

    useEffect(() => {
        if(id[1] !== undefined){
            findVehicle()
        }
    },[id[1]])

    useEffect(() => {
        getBrand()
        getCategory()
    },[]);
    
    const getBrand = async () => {
        const response = await axios.get("http://localhost:8080/api/Brand/getAllBrands");
        console.log("bran...",response.data);
        setBrand(response.data)
    }

    const getCategory = async () => {
        const response = await axios.get("http://localhost:8080/api/Category/getAllCategory");
        console.log("bran...",response.data);
        setCategory(response.data)
    }

    const onChangeEvent = (e) => {
        console.log(e.target);
        const {name,value} = e.target
        setLogin({
            ...login,
            [name] : value,
        });
    }

    const onSubmitItem = async (e) => {
        try {
            e.preventDefault()
                if(id[1] !== undefined){
                    const response = await axios.put(`http://localhost:8080/api/Vehicle/Edit-vehicle/${id[1]}`,login,{
                    headers : {
                        "Authorization" : token
                    }
                    
                });
                console.log("update..",response);
                setTimeout(() => {
                    navigate("/List")
                },500);
                }else{
                console.log("token...",token);
                const response = await axios.post("http://localhost:8080/api/Vehicle/create-vehicle",login,{
                    headers : {
                        "Authorization" : token
                    }
                })
            console.log("re..",response.data?.status);

            if(response.data?.status === 200){  
                setErrMsg("Register SuccessFully")
                setTimeout(() => {
                    navigate("/List")
                },500);
                }else{
                    setErrMsg(response.data?.message)
                }
            }
        } catch (e) {
            console.log("e....");
        }
        
    }

  return (
    <div>
        <h3>Add Vehicle Info</h3>
        <br />
        <form onSubmit={(e) => onSubmitItem(e)}>
            {errMsg !== "" && errMsg}
            <br />
            <input type="text" name='vehicleName' value={vehicleName} onChange={onChangeEvent} placeholder='Enter vehicleName'/>
            <br />
            <input type="number" name='vehicleNumber' value={vehicleNumber} onChange={onChangeEvent} placeholder='enter VehecleNumber'/>
            <br />
            <input type="text" name='color' value={color} onChange={onChangeEvent} placeholder='enter color'/>
            <br />
            <select name="brandId" value={brandId} onChange={onChangeEvent}>
                <option>Select Brand</option>
                {
                    Brand && Brand.map((data,index) => {
                        return <option value={data._id}>{data.brandName}</option>
                    })
                }
            </select>
            <br />
            <select name="categoryId" value={categoryId}  onChange={onChangeEvent}>
                <option>Select Category</option>
                {
                    Category && Category.map((data,index) => {
                        return <option value={data._id}>{data.categoryName}</option>
                    })
                }
            </select>
            <br />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Add