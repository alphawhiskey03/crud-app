import Popup from "./popup";

const AddStudent = ({ isOpen, handleClose }) => {
  const addStudentData = async (data) => {
    const res = await fetch("http://localhost:4000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    alert(body.message);
    handleClose();
  };
  return (
    <>
      {isOpen && (
        <Popup
          title="Add student"
          handleClose={handleClose}
          formSubmit={addStudentData}
        />
      )}
    </>
  );
};
export default AddStudent;
