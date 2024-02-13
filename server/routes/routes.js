const express = require('express');
const router = express.Router();
const Course = require('../models/models');

// Get all courses
router.get('/allcourses', async (req, res) => {

    try {
        const courseList = await Course.find();
        res.status(200).json(courseList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Get a specific course
router.get('/', async (req, res) => {

    const courseName = req.query.courseName;

    try {

        const course = await Course.findOne({ name: courseName });
        res.status(200).json(course);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Create new course
router.post('/', async (req, res) => {

    const newCourse = new Course({

        name: req.body.name,
        credits: req.body.credits,
        colour: req.body.colour,
        grade: 0,
        progress: 0,
        items: req.body.items
    });

    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

// Update Course
router.patch('/', async (req, res) => {

    const courseName = req.body.courseName;
    const newName = req.body.name;
    const newCredits = req.body.credits;
    const newColour = req.body.colour;

    try {

        const courseToUpdate = await Course.findOne({ name: courseName });
        courseToUpdate.name = newName;
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
            grade: -1,
            progress: 0,
            subItems: []
        };

        course.items.push(item);
        await course.save();
        res.status(201).json(course);

    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
});

// Edit item
router.patch('/item/edit', async (req, res) => {

    const courseName = req.body.courseName;
    const itemName = req.body.itemName;

    try {

        const course = await Course.findOne({ name: courseName });
        const itemToUpdate = course.items.find((item) => item.name === itemName);

        itemToUpdate.name = req.body.name;
        itemToUpdate.weight = req.body.weight;

        const { newCourseGrade, newCourseProgress } = calculateCourseGradeAndProgress(course.items);
            
        course.grade = newCourseGrade;
        course.progress = newCourseProgress;

        await course.save();
        res.status(200).json(itemToUpdate);
        
    } catch (err) {
        console.log(err.message);
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

        const { newCourseGrade, newCourseProgress } = calculateCourseGradeAndProgress(course.items);
            
        course.grade = newCourseGrade;
        course.progress = newCourseProgress;

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
            marksGiven: req.body.marksGiven
        }

        courseItem.subItems.push(subItem);

        const { newItemGrade, newItemProgress } = calculateItemGradeAndProgress(courseItem.subItems);

        courseItem.grade = newItemGrade;
        courseItem.progress = newItemProgress;

        const { newCourseGrade, newCourseProgress } = calculateCourseGradeAndProgress(course.items);

        course.grade = newCourseGrade;
        course.progress = newCourseProgress;
        
        await course.save();
        res.status(200).json(subItem);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }

});

// Edit subtitem in an item
router.patch('/item/subitem/edit', async (req, res) => {

    const courseName = req.body.courseName;
    const itemName = req.body.itemName;
    const subItemName = req.body.subItemName;

    try {
        const course = await Course.findOne({ name: courseName });
        const itemToFind = course.items.find((item) => item.name === itemName);
        const subItemToFind = itemToFind.subItems.find((subItem) => subItem.name === subItemName);
    
        subItemToFind.name = req.body.name;
        subItemToFind.weight = req.body.weight;
        subItemToFind.totalMarks = req.body.totalMarks;
        subItemToFind.marksGiven = req.body.marksGiven;

        const { newItemGrade, newItemProgress } = calculateItemGradeAndProgress(itemToFind.subItems);

        itemToFind.grade = newItemGrade;
        itemToFind.progress = newItemProgress;

        const { newCourseGrade, newCourseProgress } = calculateCourseGradeAndProgress(course.items);
            
        course.grade = newCourseGrade;
        course.progress = newCourseProgress;

        await course.save();
        
        res.status(200).json(itemToFind);

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

        const { newItemGrade, newItemProgress } = calculateItemGradeAndProgress(itemToFind.subItems);

        itemToFind.grade = newItemGrade;
        itemToFind.progress = newItemProgress;

        const { newCourseGrade, newCourseProgress } = calculateCourseGradeAndProgress(course.items);
            
        course.grade = newCourseGrade;
        course.progress = newCourseProgress;

        await course.save();
        res.status(200).json(itemToFind);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

// Calculate course grade
const calculateCourseGradeAndProgress = (courseItemList) => {

    if (courseItemList.length === 0) {
        return { newCourseGrade: 0, newCourseProgress: 0 };
    }

    let tempGrade = 0;
    let tempWeight = 0;

    courseItemList.forEach((item) => {

        if (item.subItems.length === 0) {
            return;
        }

        item.subItems.forEach((subItem) => {
            tempGrade += (subItem.marksGiven / subItem.totalMarks) * subItem.weight;
            tempWeight += subItem.weight;
        });
    });

    if (tempWeight === 0) {
        return { newCourseGrade: 0, newCourseProgress: 0 };
    }

    return { newCourseGrade: tempGrade / tempWeight, newCourseProgress: tempWeight / 100 };
};

// Calculate item grade
const calculateItemGradeAndProgress = (subItemList) => {

    if (subItemList.length === 0) {
        return { newItemGrade: 0, newItemProgress: 0 };
    }

    let tempGrade = 0;
    let tempWeight = 0;

    subItemList.forEach((subItem) => {
        tempGrade += (subItem.marksGiven / subItem.totalMarks) * subItem.weight;
        tempWeight += subItem.weight;
    });

    return { newItemGrade: tempGrade / tempWeight, newItemProgress: tempWeight };

};

module.exports = router;