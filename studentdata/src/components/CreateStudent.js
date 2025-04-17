import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateStudent.css";

// 👉 NEW: Import Firestore methods
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // ✅ make sure firebase.js is correctly configured

function CreateStudent() {
  const [id, setId] = useState("");
  const [name, setname] = useState("");
  const [place, setplace] = useState("");
  const [phone, setphone] = useState("");
  const [validation, setValiation] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { id, name, place, phone };
    console.log(studentData);

    try {
      await addDoc(collection(db, "students"), studentData); // 👉 Save to Firestore
      alert("Student Data Saved Successfully to Firebase");
      navigate("/");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" required value={id} onChange={e => setId(e.target.value)} onMouseDown={() => setValiation(true)} />
        {id.length === 0 && validation && <span className="errormsg">Please Enter your id</span>}

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required value={name} onChange={e => setname(e.target.value)} onMouseDown={() => setValiation(true)} />
        {name.length === 0 && validation && <span className="errormsg">Please Enter your name</span>}

        <label htmlFor="place">Place:</label>
        <input type="text" id="place" name="place" required value={place} onChange={e => setplace(e.target.value)} onMouseDown={() => setValiation(true)} />
        {place.length === 0 && validation && <span className="errormsg">Please Enter your place</span>}

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" required value={phone} onChange={e => setphone(e.target.value)} onMouseDown={() => setValiation(true)} />
        {phone.length === 0 && validation && <span className="errormsg">Please Enter your phone</span>}

        <div>
          <button className="btn btn-save">Save</button>
          <Link to="/" className="btn btn-back">Back</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateStudent;
