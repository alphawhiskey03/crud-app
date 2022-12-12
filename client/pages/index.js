import Head from "next/head";
import { useState } from "react";
import AddStudent from "../components/addStudent";
import UpdateStudent from "../components/updateStudent";
import styles from "../styles/Home.module.css";
import { findStudent } from "../utils";
import { AiFillEdit, AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";

export default function Home({ studentData }) {
  const { students } = studentData;

  const [updateModal, setUpdateModal] = useState({
    studentId: undefined,
    isOpen: false,
    data: {},
  });
  const [addModal, setAddModal] = useState(false);
  const onEdit = (studentId) => {
    const data = findStudent(students, studentId);
    setUpdateModal((currState) => ({
      ...currState,
      studentId,
      isOpen: true,
      data,
    }));
  };
  const onUpdateClose = () =>
    setUpdateModal((currState) => ({ ...currState, isOpen: false }));
  const onAddClose = () => {
    setAddModal(false);
  };
  const onAdd = () => {
    setAddModal(true);
  };

  const onDelete = async (studentId) => {
    const res = await fetch("http://localhost:4000/students", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: studentId }),
    });
    if (res.status === 200) {
      const body = await res.json();
      alert(body.message);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Student app</title>
        <meta name="description" content="student app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="main-container">
          <div style={{ textAlign: "right", width: "100%" }}>
            <button onClick={onAdd} style={{ margin: "10px" }}>
              <AiOutlineUserAdd size="1rem" /> New student
            </button>
          </div>
          <div className="studentlist">
            {students &&
              students.map((student) => (
                <div className="student-row" key={student._id}>
                  <img src="user.png" />
                  <div>
                    <p>
                      <strong>{student.name}</strong>
                    </p>
                    <span className="age-span">
                      <p>Age: {student.age}</p>
                      <p>roll no: {student.rollNo}</p>
                    </span>
                    <p>address : {student.address}</p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <button
                      onClick={() => onEdit(student._id)}
                      handleClose={onUpdateClose}
                    >
                      <AiFillEdit size="1.5rem" />
                    </button>
                    <button onClick={() => onDelete(student._id)}>
                      <AiFillDelete size="1.5rem" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <UpdateStudent
        isOpen={updateModal.isOpen}
        studentId={updateModal.studentId}
        handleClose={() => setUpdateModal(false)}
        data={updateModal.data}
      />
      <AddStudent isOpen={addModal} handleClose={onAddClose} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/students");
  const data = await res.json();

  return {
    props: {
      studentData: data,
    },
  };
}
