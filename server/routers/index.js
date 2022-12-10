const { Router } = require("express");
const {
  createStudent,
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers");
const router = Router();
router.get("/", getStudents);
router.get("/:studentId", getStudent);
router.post("/", createStudent);
router.put("/", updateStudent);
router.delete("/", deleteStudent);

module.exports = router;
