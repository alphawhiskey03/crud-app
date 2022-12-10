const { Schema, model } = require("mongoose");

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
    // unique: true,
  },
  address: {
    type: String,
    default: "Not specified",
  },
});
const Student = model("students", studentSchema);
module.exports = Student;
