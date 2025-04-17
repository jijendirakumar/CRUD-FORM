import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function EditStudent() {
  const { studentid } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState(""); // Fixed typo: setname -> setName
  const [place, setPlace] = useState(""); // Fixed typo: setplace -> setPlace
  const [phone, setPhone] = useState(""); // Fixed typo: setphone -> setPhone
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const q = query(collection(db, "students"), where("id", "==", studentid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setId(data.id || "");
          setName(data.name || "");
          setPlace(data.place || "");
          setPhone(data.phone || "");
        } else {
          console.log("No matching document!");
        }
      } catch (err) {
        console.log("Error fetching student:", err.message);
      }
    };
    fetchStudent();
  }, [studentid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { id, name, place, phone };

    try {
      const q = query(collection(db, "students"), where("id", "==", studentid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = doc(db, "students", querySnapshot.docs[0].id);
        await updateDoc(docRef, studentData);
        alert("Student Data Updated Successfully");
        navigate("/");
      } else {
        console.log("No document to update!");
      }
    } catch (err) {
      console.log("Error updating student:", err.message);
    }
  };

  return (
    <div className="container">
      <h2>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {id.length === 0 && validation && <span className="errormsg">Please Enter your id</span>}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation && <span className="errormsg">Please Enter your name</span>}

        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {place.length === 0 && validation && <span className="errormsg">Please Enter your place</span>}

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {phone.length === 0 && validation && <span className="errormsg">Please Enter your phone</span>}

        <div>
          <button className="btn btn-save">Update</button>
          <Link to="/" className="btn btn-back">Back</Link>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;