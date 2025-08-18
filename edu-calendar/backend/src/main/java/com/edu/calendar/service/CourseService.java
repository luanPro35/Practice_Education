package com.edu.calendar.service;

import com.edu.calendar.model.Course;
import com.edu.calendar.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course existingCourse = courseRepository.findById(id).orElse(null);
        if (existingCourse != null) {
            existingCourse.setName(courseDetails.getName());
            existingCourse.setDescription(courseDetails.getDescription());
            existingCourse.setTeacher(courseDetails.getTeacher());
            existingCourse.setRoom(courseDetails.getRoom());
            existingCourse.setStartDate(courseDetails.getStartDate());
            existingCourse.setEndDate(courseDetails.getEndDate());
            return courseRepository.save(existingCourse);
        }
        return null; // Or throw an exception if course not found
    }
}
