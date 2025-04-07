// src/StudentTable.js
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import "./ViewDetails.css";

function ViewDetails() {
  const {studentid}=useParams();
  const [studentData,setStudentData]=useState({});
  useEffect(()=>{
    fetch("http://localhost:8000/students/" + studentid)
    .then((res)=>res.json())
    .then((data)=>setStudentData(data))
    .catch((err)=>console.log(err.message))
  },[]);
  return (
    <div className="container">
      <h1>Student Deatils</h1>
     { studentData &&< div className="details">
        <p><strong>ID: </strong>{studentData.id}</p>
        <p><strong>NAME: </strong>{studentData.name}</p>
        <p><strong>PLACE: </strong>{studentData.place}</p>
        <p><strong>PHONE: </strong>{studentData.phone}</p>
      </div>
      }
      <Link to="/" className="btn btn-back">back</Link>
    </div> 
  )
  }
  export default ViewDetails;