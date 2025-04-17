import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "./ViewDetails.css";

function ViewDetails() {
  const { studentid } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const q = query(collection(db, "students"), where("id", "==", studentid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setStudentData({ id: studentid, ...data });
        } else {
          console.log("No matching document!");
        }
      } catch (err) {
        console.log("Error fetching student:", err.code, err.message);
      }
    };
    fetchStudent();
  }, [studentid]);

  if (!studentData) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Student Details</h1>
      <div className="details">
        <p><strong>ID: </strong>{studentData.id}</p>
        <p><strong>NAME: </strong>{studentData.name || "N/A"}</p>
        <p><strong>PLACE: </strong>{studentData.place || "N/A"}</p>
        <p><strong>PHONE: </strong>{studentData.phone || "N/A"}</p>
        <Link to="/" className="back-link">Back</Link>
      </div>
    </div>
  );
}

export default ViewDetails;