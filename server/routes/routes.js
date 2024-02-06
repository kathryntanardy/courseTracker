const express = require('express');
const router = express.Router();
const Item = require('../models/models');
const Course = require('../models/models');

router.get('/', async (req, res) => {

    try {
        const courseList = await Course.find();
        res.status(200).json(courseList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Create new course
router.post('/', async (req, res) => {

    const newCourse = new Course({

        name: req.body.name,
        credits: req.body.credits

    });

    try {
        await newCourse.save();
        res.status(201).json({ message: `Created course ${newCourse.name}` });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

// Delete course
router.delete('/', async (req, res) => {

    const courseName = req.body.name;
    const courseToDelete = await Course.findOne({ name: courseName });

    try {

        await courseToDelete.deleteOne();
        res.status(200).json({ message: "Successfully deleted course" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Assignments

// Get assignments from a course
// router.get('/allasn', async (req, res) => {

//     try {
//         const course = await Course.findOne({ name: req.body.courseName });
//         res.status(200).json(course.assignments);

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }

// });

// router.get('/asn', async (req, res) => {

//     try {

//         const assignments = await Item.find();
//         res.status(200).json(assignments);

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }

// });

// // Add assignment to course
// router.post('/asn', async (req, res) => {

//     try {
//         const course = await Course.findOne({ name: req.body.courseName });
//         const assignment = new Item({
//             name: req.body.assignmentName,
//             weight: req.body.weight,
//             grade: req.body.grade
//         });
//         course.assignments.push(assignment);
//         await course.save();
//         res.status(201).json(course);

//     } catch (err) {
//         res.json({ message: err.message });
//     }
// });

// // Delete assignment
// // router.delete('/asn', async (req, res) => {

// //     try {
// //         const course = await Course.findOne({ name: req.body.courseName });

// //     } catch (err) {

// //     }

// // });

module.exports = router;