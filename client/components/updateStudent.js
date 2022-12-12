import Popup from "./popup";
const UpdateStudent = ({ isOpen, studentId, handleClose, data }) => {
  const updateStudentData = async (data) => {
    const res = await fetch("http://localhost:4000/students", {
      method: "PUT",
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
          title="Update student"
          studentId={studentId}
          handleClose={handleClose}
          formSubmit={updateStudentData}
          data={data}
        />
      )}
    </>
  );
};
export default UpdateStudent;
