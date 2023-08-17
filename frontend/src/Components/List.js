import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const List = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const [vehicle,setVehicle] = useState([]);

    const loadItem = () => {
        axios.get("http://localhost:8080/api/Vehicle/getAllVehicle",{
            headers : {
                "Authorization" : token
            }
        })
        .then((res) => {
            console.log("res..",res.data);
            setVehicle(res.data);
        })
        .catch(e => {
            console.log("e.",e);
        })
    }

    useEffect(() => {
        loadItem()
    },[]);

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8080/api/Vehicle/delete-vehicle/${id}`)
        loadItem()
    }
  return (
    <div>
        <h3>List of Vehicle</h3>
        loginUserName : {username}
        <table border={1}>
            <thead>
            <tr>
                <th>Name</th>
                <th>vehicleNumber</th>
                <th>color</th>
                <th>Brnad</th>
                <th>Category</th>
                <th colSpan={2}>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    vehicle && vehicle.length > 0 ?
                        vehicle.map((data,index) => {
                            return (
                                <tr key={index}>
                                    <td>{data?.vehicleName}</td>
                                    <td>{data?.vehicleNumber}</td>
                                    <td>{data?.color}</td>
                                    <td>{data?.Brnad}</td>
                                    <td>{data?.Category}</td>
                                    <td><Link to={`/Add?Id=${data._id}`}>Edit</Link></td>
                                    <td style={{cursor : "pointer"}} onClick={() => deleteItem(data._id)}>Delete</td>
                                </tr>
                            )
                        })
                    :
                    "No Data Found"
                }
            </tbody>
        </table>
    </div>
  )
}

export default List