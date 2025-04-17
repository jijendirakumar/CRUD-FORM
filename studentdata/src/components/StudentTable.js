import { Link, useNavigate } from "react-router-dom";
import "./StudentTable.css";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Removed redundant imports and unused 'where'
import { db } from "../firebase"; // Ensure firebase.js exists

function StudentTable() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const DisplayDetails = (id) => {
    navigate("/student/view/" + id);
  };

  const EditDetails = (id) => {
    navigate("/student/edit/" + id);
  };

  const RemoveDetails = async (docId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const docRef = doc(db, "students", docId); // Use the Firestore document ID
        await deleteDoc(docRef);
        alert("Removed Student Data Successfully");
        fetchStudents(); // Refresh the list
      } catch (err) {
        console.log("Error deleting student:", err.message);
      }
    }
  };

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((doc) => ({
        docId: doc.id, // Store the Firestore document ID
        ...doc.data(), // Spread the student fields (id, name, place, phone)
      }));
      setStudents(studentList);
    } catch (err) {
      console.log("Error fetching students:", err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container"> {/* Fixed typo: conatiner -> container */}
        <Link to="/student/create" className="btn btn-add">Add New Student</Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((item) => (
              <tr key={item.docId}>
                <td>{item.id}</td> {/* Display the custom id field */}
                <td>{item.name}</td>
                <td>{item.place}</td>
                <td>{item.phone}</td>
                <td>
                  <button onClick={() => DisplayDetails(item.id)} className="btn btn-info">View</button>
                  <button onClick={() => EditDetails(item.id)} className="btn btn-primary">Edit</button>
                  <button onClick={() => RemoveDetails(item.docId)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;