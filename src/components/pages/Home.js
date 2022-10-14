import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// Fontawesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    // console.log("Helloo Worldd..!!");
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3002/users");
    // console.log(result);
    setUser(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3002/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table className="table border shadow">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {/* <Link className="btn btn-primary me-2">View</Link> */}
                  {/* <Link className="btn btn-outline-primary me-2">Edit</Link> */}
                  {/* <Link className="btn btn-danger">Delete</Link> */}
                  <Link className="me-2" to={`/users/${user.id}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                  <Link className="me-2" to={`/users/edit/${user.id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <Link className="me-2" onClick={() => deleteUser(user.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
