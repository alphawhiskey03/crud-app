import useFormUtil from "../hooks/formUtil";
import { AiOutlineClose } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";
const Popup = ({ title, studentId, handleClose, formSubmit, data }) => {
  console.log(data);
  const { name, age, rollNo, address, id } = data || {};
  const { state, onSubmit, onChange } = useFormUtil(
    {
      name,
      age,
      rollNo,
      address,
      id: studentId || undefined,
    },
    onSave
  );
  function onSave() {
    formSubmit(state);
  }

  return (
    <div className="popup">
      <div style={{ width: "100%", textAlign: "right" }}>
        <button onClick={handleClose} style={{ margin: "10px" }}>
          <AiOutlineClose size={"1rem"} />
        </button>
      </div>
      <h2>{title}</h2>
      <input
        type="text"
        name="name"
        onChange={onChange}
        placeholder="Student name"
        value={state.name}
        required
      />
      <input
        type="number"
        name="age"
        onChange={onChange}
        placeholder="Student age"
        value={state.age}
        required
      />
      <input
        type="text"
        name="rollNo"
        onChange={onChange}
        placeholder="Student roll no"
        value={state.rollNo}
        required
      />
      <textarea
        type="text"
        name="address"
        placeholder="student address"
        onChange={onChange}
        value={state.address}
        required
      />
      <input type="hidden" name="studentId" value={studentId || ""} />
      <button onClick={onSubmit}>
        {" "}
        <CiSaveDown2 size="1rem" style={{ marginTop: 5, marginRight: 5 }} />
        SAVE
      </button>
    </div>
  );
};

export default Popup;
