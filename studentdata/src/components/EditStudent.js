import { useState,useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom"
// src/StudentTable.js
function EditStudent() {
  const {studentid}=useParams();
  const [id,setId]=useState("");
  const [name,setname]=useState("");
  const [place,setplace]=useState("");
  const [phone,setphone]=useState("");
  const [validation,setValiation]=useState();
  const navigate=useNavigate();
  //const [studentData,setStudentData]=useState({});
  useEffect(()=>{
    fetch("http://localhost:8000/students/" + studentid)
    .then((res)=>res.json())
    .then((data)=>{
      setId(data.id);
      setname(data.name)
      setplace(data.place)
      setphone(data.phone)
    })
    .catch((err)=>console.log(err.message))
  },[]);
  const handleSubmit=(e)=>{
    e.preventDefault(); 
    const studentData={id,name,place,phone};
  

    console.log(studentData);
        
    fetch("http://localhost:8000/students/"+ studentid,{
      method:'PUT',
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(studentData)
    })
    .then((res)=>{
      alert("Student Data Updated Successfully");
      navigate("/");
    })
    .catch((err)=>console.log(err.message))
  }
  
    return(
      <div className="container">
      <h2>Edit Student Deatils</h2>
      <form onSubmit={handleSubmit}>

         <label htmlFor="id">ID:</label>
         <input type="text" id="id" name="id" required value={id} onChange={e=>setId(e.target.value)} onMouseDown={()=>setValiation(true)}/>
         {id.length===0 && validation && <span className="errormsg">Please Enter your id</span>}

         <label htmlFor="name">Name:</label>
         <input type="text" id="name" name="name"  required value={name} onChange={e=>setname(e.target.value)} onMouseDown={()=>setValiation(true)}/>
         {name.length===0 && validation && <span className="errormsg">Please Enter your name</span>}

         <label htmlFor="place">Place:</label>
         <input type="text" id="place" name="place" required value={place} onChange={e=>setplace(e.target.value)} onMouseDown={()=>setValiation(true)}/>
         {place.length===0 && validation && <span className="errormsg">Please Enter your place</span>}

         <label htmlFor="phone">Phone:</label>
         <input type="text" id="phone" name="phone" required value={phone} onChange={e=>setphone(e.target.value)} onMouseDown={()=>setValiation(true)}/>
         {phone.length===0 && validation && <span className="errormsg">Please Enter your phone</span>}

        <div>
         <button className="btn btn-save">update</button>
         <Link to="/" className="btn btn-back">Back</Link>
         </div>       
      </form>
    </div>
    )
  }
  export default EditStudent;