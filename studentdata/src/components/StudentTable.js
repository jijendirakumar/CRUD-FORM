import { Link, useNavigate } from "react-router-dom";
// src/StudentTable.js
import './StudentTable.css'
import { useEffect, useState } from "react";

function StudentTable() {
    const [students,setStudents]=useState("");
    const navigate=useNavigate();
    const DisplayDetails=(id)=>{
      navigate("/student/view/"+id);
    }
    const EditDetails=(id)=>{
      navigate("/student/edit/" +id);
    }
    const RemoveDetails=(id)=>{
      
        fetch("http://localhost:8000/students/"+ id,{
          method:'DELETE',

        })
        .then((res)=>{
          alert("Removed Student Data  Successfully");
          window.location.reload();
        })
        .catch((err)=>console.log(err.message))
      }
    

  useEffect(()=>{
    fetch('http://localhost:8000/students')
    .then((res)=>res.json())
    .then((data)=>
        setStudents(data)).catch((err)=>
        console.log(err.message))
  })
    return(
      <div className="container">
        <h2>Student Records</h2>
        <div className="table-conatiner">

          <Link to='/student/create' className="btn btn-add">Add New Student</Link>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>place</th>
                <th>phone</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {students && students.map((item)=>(
                  <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button onClick={()=>DisplayDetails(item.id)}  className="btn btn-info">view</button>
                    <button onClick={()=>{EditDetails(item.id) }} className="btn btn-primary">edit</button>
                    <button onClick={()=>RemoveDetails(item.id)} className="btn btn-danger">delete</button>
                    
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  export default StudentTable;