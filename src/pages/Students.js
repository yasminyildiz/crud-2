import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Popup from "reactjs-popup";
import { getUsers, deleteUser, getUser, updateUser, addUser } from "./crud.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

// Components
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// SVGs
import penIcon from "../images/pen.svg";
import trashIcon from "../images/trash.svg";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const bgColor = "#f8f8f8";

  const [crudType, setCrudType] = useState("");
  const [isNewStudentPopupOpen, setNewStudentPopupOpen] = useState(false);
  const [newStudentFormValues, setNewStudentFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    domain: "",
    company: {
      name: "",
    },
  });

  const columns = [
    {
      selector: (row) => row.image,
      cell: (row) => (
        <img src={row.image} alt="studentImg" className="studentImg" />
      ),
    },
    {
      name: "First Name",
      selector: (row) => row.firstName + " " + row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Website",
      selector: (row) => row.domain,
    },
    {
      name: "Company",
      selector: (row) => row.company.name,
    },
    {
      name: "",
      cell: (row) => (
        <div id="tableCrudDiv">
          <img src={penIcon} alt="Edit" onClick={() => handleEdit(row.id)} />
          <img
            src={trashIcon}
            alt="Delete"
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = async (userId) => {
    try {
      const response = await getUser(userId);
      const userData = response.data;
      setModalOpen(true);
      setModalData(userData);
      setCrudType("edit");
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleFormSubmit = (event, userId, crudType) => {
    const randomId = Math.floor(Math.random() * 100) + 31;

    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const updatedFormData = {
      id: userId !== null && userId !== undefined ? userId : randomId,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      domain: formData.get("domain"),
      company: {
        name: formData.get("company"),
      },
      image:
        formData.get("image") ||
        "https://robohash.org/providenttemporadelectus.png",
    };

    if (crudType === "edit") {
      updateUser(userId, updatedFormData)
        .then((response) => {
          console.log("User data updated successfully:", response.data);
          const updatedUser = response.data;

          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === userId ? updatedUser : user))
          );
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    } else if (crudType === "add") {
      addUser(updatedFormData)
        .then((response) => {
          const updatedUsers = [response.data, ...users];

          setUsers(updatedUsers);
          setNewStudentPopupOpen(false);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const openNewStudentPopup = () => {
    setNewStudentFormValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      domain: "",
      company: {
        name: "",
      },
    });

    setCrudType("add");
    setNewStudentPopupOpen(true);
  };

  const closeNewStudentPopup = () => {
    setNewStudentPopupOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const Modal = ({ isOpen, closeModal, userData }) => {
    const [formValues, setFormValues] = useState(userData);
    const handleInputChange = (event) => {
      const { name, value } = event.target;

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    };

    return (
      <Popup open={isOpen} onClose={closeModal} position="right center">
        <div className="popup-container">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h4>{crudType === "edit" ? "Edit Student" : "Add New Student"}</h4>
          <form
            onSubmit={(event) =>
              handleFormSubmit(event, formValues.id, crudType)
            }
            className="d-flex flex-column align-items-center"
          >
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formValues.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="website">Website:</label>
                  <input
                    type="text"
                    id="domain"
                    name="domain"
                    className="form-control"
                    value={formValues.domain}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="company">Company:</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-control"
                    value={formValues.company.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </Popup>
    );
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchText.toLowerCase()) ||
      user.domain.toLowerCase().includes(searchText.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="row mx-0">
      <Sidebar active="students" />
      <div
        className="col-lg-10 col-md-9 col-sm-12   mainArea"
        style={{ backgroundColor: bgColor }}
      >
        <Header />
        <div className="row dataTableDiv">
          <div className="col-12 dataTableTitleRow">
            <h2>Student Title</h2>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search... &#xF002;"
                value={searchText}
                onChange={handleSearch}
              />
              <button className="btn btn-primary" onClick={openNewStudentPopup}>
                ADD NEW STUDENT
              </button>
            </div>
          </div>

          <DataTable
            // title="My Data Table"
            columns={columns}
            data={filteredUsers}
            pagination={true}
            paginationPerPage={5}
            rowsPerPageOptions={[6, 12, 24, 48]}
          />
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              closeModal={closeModal}
              userData={modalData}
              handleFormSubmit={handleFormSubmit}
            />
          )}

          {isNewStudentPopupOpen && (
            <Modal
              isOpen={isNewStudentPopupOpen}
              closeModal={closeNewStudentPopup}
              userData={newStudentFormValues}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
