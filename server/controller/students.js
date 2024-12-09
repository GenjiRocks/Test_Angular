
const db = require('../db')


//get all students data 
exports.getAllStudents = async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM Students')
        const [marks] = await db.query('SELECT * FROM Marks')
        const [totalMarks] = await db.query('SELECT SUM(Marks) AS TotalMarks FROM Marks')
        const [averageMarks] = await db.query('SELECT AVG(Marks) AS AverageMarks FROM Marks')
        const [grade] = await db.query('SELECT CASE WHEN Marks >= 90 THEN "A" WHEN Marks >= 80 THEN "B" WHEN Marks >= 70 THEN "C" WHEN Marks >= 60 THEN "D" ELSE "F" END AS Grade FROM Marks')
        res.status(200).send({students, marks, totalMarks, averageMarks, grade})
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}



//get student by id

exports.getStudentById = async (req, res) => {
    try {
        const {id} = req.params;
        const [student] = await db.query('SELECT * FROM Students WHERE id = ?', [id])
        res.status(200).send(student)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

//add new student
exports.addStudent = async (req, res) => {
    try{
        const {StudentID, Name, MarkID, Subject, Marks} = req.body
        await db.query('INSERT INTO Students (StudentID, Name) VALUES (?, ?)', [StudentID, Name])
        await db.query('INSERT INTO Marks (MarkID, StudentID, Subject, Marks) VALUES (?, ?, ?, ?)', [MarkID, StudentID, Subject, Marks])
        res.status(200).send({message:'Student added successfully'})
    }catch{
        res.status(500).send({error: err.message})
    }
}

//deleting a student
exports.deleteStudent = async (req, res) => {
    try{
        const {id} = req.params;
        await db.query('DELETE FROM Students WHERE id = ?', [id])
        res.status(200).send({message: 'Student deleted successfully'})
    }catch{
        res.status(500).send({error: err.message})
    }
}

//Update marks for a subject for a student
exports.updateMarks = async (req, res) => {
    try{
        const {id, subject, marks} = req.body;
        await db.query('UPDATE Marks SET Marks = ? WHERE StudentID = ? AND Subject = ?', [marks, id, subject])
        res.status(200).send({message: 'Marks updated successfully'})
    }catch(err){
        res.status(500).send({error: err.message})
    }
}


