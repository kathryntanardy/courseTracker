const express = require('express');
const router = express.Router();
const Course = require('../models/models');

// Get all courses
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
        items: req.body.items,
        credits: req.body.credits,
        colour: req.body.colour

    });

    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

// Update Course
router.put('/', async (req, res) => {

    const courseName = req.body.courseName;
    const newName = req.body.newName;
    const newItems = req.body.newItems;
    const newCredits = req.body.newCredits;
    const newColour = req.body.newColour;

    try {

        const courseToUpdate = await Course.findOne({ name: courseName });
        courseToUpdate.name = newName;
        courseToUpdate.items = newItems;
        courseToUpdate.credits = newCredits;
        courseToUpdate.colour = newColour;

        await courseToUpdate.save();
        res.status(200).json(courseToUpdate);

    } catch (err) {
        res.json({ message: err.message });
    }

});

// Delete course
router.delete('/', async (req, res) => {

    const courseName = req.body.courseName;

    try {

        const courseToDelete = await Course.findOne({ name: courseName });
        await courseToDelete.deleteOne();
        res.status(200).json({ message: "Successfully deleted course" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Items

// Get all assignments from a course
router.get('/allitems', async (req, res) => {

    try {
        const course = await Course.findOne({ name: req.query.courseName });
        res.status(200).json(course.items);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Get an item from a course
router.get('/item', async (req, res) => {

    try {

        const course = await Course.findOne({ name: req.body.courseName });
        const courseItem = course.items.find((item) => item.name === req.body.itemName);
        res.status(200).json(courseItem);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Add item to course
router.patch('/item', async (req, res) => {

    const courseName = req.body.courseName;

    try {
        const course = await Course.findOne({ name: courseName });
        const item = {
            name: req.body.itemName,
            weight: req.body.weight,
            totalMarks: req.body.totalMarks,
            grade: req.body.grade,
            percentage: req.body.percentage,
            subItems: []
        };
        course.items.push(item);
        await course.save();
        res.status(201).json(course);

    } catch (err) {
        res.json({ message: err.message });
    }
});

// Edit item
router.patch('/item/edit', async (req, res) => {

    const courseName = req.body.courseName;
    const itemName = req.body.itemName;

    try {

        const courseToUpdate = await Course.findOne({ name: courseName });
        const itemToUpdate = courseToUpdate.items.find((item) => item.name === itemName);

        itemToUpdate.name = req.body.name;
        itemToUpdate.weight = req.body.weight;
        itemToUpdate.totalMarks = req.body.totalMarks;
        itemToUpdate.percentage = req.body.percentage;
        itemToUpdate.grade = req.body.grade;

        await courseToUpdate.save();
        res.status(200).json(itemToUpdate);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// // Delete item
router.delete('/item', async (req, res) => {

    try {

        const course = await Course.findOne({ name: req.body.courseName });
        const itemToDelete = course.items.find((item) => item.name === req.body.itemName);
        const itemToDeleteIndex = course.items.indexOf(itemToDelete);
        course.items.splice(itemToDeleteIndex, 1);

        await course.save();
        res.status(200).json({ message: "Successfully deleted item" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// SubItems

// Get subItems of an item
router.get('/item/subitem', async (req, res) => {

    const courseName = req.query.courseName;
    const itemName = req.query.itemName;

    try {

        const course = await Course.findOne({ name: courseName });
        const itemToFind = course.items.find((item) => item.name === itemName);

        res.status(200).json(itemToFind.subItems);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Add a subitem to an item
router.patch('/item/subitem', async (req, res) => {

    const courseName = req.body.courseName;
    const itemName = req.body.itemName;

    try {

        const course = await Course.findOne({ name: courseName });
        const courseItem = course.items.find((item) => item.name === itemName);
        const subItem = {
            name: req.body.name,
            weight: req.body.weight,
            totalMarks: req.body.totalMarks,
            grade: req.body.grade
        }

        courseItem.subItems.push(subItem);

        // Calculate updated grade of item        
        let tempGrade = 0;
        let tempWeight = 0;
        
        courseItem.subItems.forEach((item) => {
            tempGrade += (item.grade / item.totalMarks) * item.weight;
            tempWeight += item.weight;
        })
        
        courseItem.percentage = tempGrade / tempWeight;
        
        await course.save();
        res.status(200).json(subItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Delete subitem from an item
router.delete('/item/subitem', async (req, res) => {

    const courseName = req.body.courseName;
    const itemName = req.body.itemName;
    const subItemName = req.body.subItemName;

    try {
        const course = await Course.findOne({ name: courseName });
        const itemToFind = course.items.find((item) => item.name === itemName);
        const subItemToFind = itemToFind.subItems.find((subItem) => subItem.name === subItemName);
        const subItemToDeleteIndex = itemToFind.subItems.indexOf(subItemToFind);
        itemToFind.subItems.splice(subItemToDeleteIndex, 1);

        if (itemToFind.subItems.length > 0) {
            // Calculate updated grade of item        
            let tempGrade = 0;
            let tempWeight = 0;
            
            itemToFind.subItems.forEach((item) => {
                tempGrade += (item.grade / item.totalMarks) * item.weight;
                tempWeight += item.weight;
            })
            
            itemToFind.percentage = tempGrade / tempWeight;
        } else {

            if (itemToFind.totalMarks !== -1) {
                itemToFind.percentage = itemToFind.grade / itemToFind.totalMarks;
            } else {
                itemToFind.percentage = -1;
            }
        }

        await course.save();
        res.status(200).json(itemToFind);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

module.exports = router;