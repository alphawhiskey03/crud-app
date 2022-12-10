const Student = require("../models");
module.exports.createStudent = async (req, res) => {
  const { name, age, rollNo, address } = req.body;
  try {
    const newStudent = await Student.create({
      name,
      age,
      rollNo,
      address,
    });
    res.status(200).json({ message: "Student created", student: newStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", error: err });
  }
};
module.exports.getStudents = async (_, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: "success", students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", err });
  }
};
module.exports.getStudent = async (req, res) => {
  try {
    const studentId = req.param("studentId");
    const student = await Student.findById(studentId);
    res.status(200).json({ message: "success", student });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error", err });
  }
};

module.exports.updateStudent = async (req, res) => {
  try {
    const { body } = req;
    const isValid = Object.values((value) => value !== "");
    if (!isValid) {
      res.status(403).json({ error: "validation error" });
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      body.id,
      {
        ...body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Student updated", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "error", error: err });
  }
};

module.exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.body;
    if (id.length > 0) {
      var deletedStudent = await Student.deleteOne({ _id: id });
      if (deletedStudent.deletedCount <= 0) {
        res.status(404).json({ message: "error", error: "User not found" });
      }
    } else {
      res.status(404).json({ message: "error", error: "invalid ID" });
    }
    res
      .status(200)
      .json({ message: ` success deleted ${deletedStudent.name}!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
