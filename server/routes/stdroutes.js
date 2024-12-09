const express = require('express')
const { getAllStudents, addStudent, updateStudent, deleteStudent } = require('../controller/students')
const router = express.Router()

//get all the students
router.get('/',getAllStudents)

// add new student
router.post('/add',addStudent)


// router.put('/update/:id',updateStudent)

router.delete('/delete/:id',deleteStudent)

module.exports = router