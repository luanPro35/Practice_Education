import { fetchCourses, addCourses, updateCourses, deleCourses } from '../services/api.js';

// Function to render the courses list
async function renderCourses() {
    const coursesContainer = document.getElementById('courses-container');
    const courses = await fetchCourses();
    coursesContainer.innerHTML = courses.map(course => `
        <div class="card">
            <h3>${course.name || ''}</h3>
            <p>${course.description || ''}</p>
            <p>Teacher: ${course.teacher || ''}</p>
            <p>Room: ${course.room || ''}</p>
            <p>Schedule: ${course.startDate || ''} - ${course.endDate || ''}</p>
            <button onclick="handleEditCourse(${course.id})">Edit</button>
            <button onclick="handleDeleteCourse(${course.id})">Delete</button>
        </div>
    `).join('');
}

// Function to open the course modal for adding or editing
function openCourseModal(course = null) {
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('course-modal-title');
    const courseForm = document.getElementById('course-form');
    const courseIdInput = document.getElementById('course-id'); // Assuming an ID input will be added to the form

    modal.style.display = 'block';
    modalTitle.textContent = course ? 'Edit Course' : 'Add Course';

    // Clear and populate form fields
    courseForm.reset();
    if (course) {
        document.getElementById('course-title').value = course.name || '';
        document.getElementById('course-description').value = course.description || '';
        document.getElementById('course-teacher').value = course.teacher || '';
        document.getElementById('course-room').value = course.room || '';
        document.getElementById('course-start-date').value = course.startDate || '';
        document.getElementById('course-end-date').value = course.endDate || '';

        // Add or set the hidden input for course ID if editing
        let idInput = document.getElementById('course-id');
        if (!idInput) {
            idInput = document.createElement('input');
            idInput.type = 'hidden';
            idInput.id = 'course-id';
            idInput.name = 'id';
            courseForm.appendChild(idInput);
        }
        idInput.value = course.id;
    } else {
        // Remove course ID input if adding a new course
        const idInput = document.getElementById('course-id');
        if (idInput) {
            idInput.remove();
        }
    }
}

// Function to close the course modal
function closeCourseModal() {
    document.getElementById('course-modal').style.display = 'none';
}

// Handler for the "Add Course" button
document.getElementById('add-course-btn').addEventListener('click', () => {
    openCourseModal();
});

// Handler for form submission
document.getElementById('course-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const courseId = document.getElementById('course-id')?.value;
    const title = document.getElementById('course-title').value.trim();
    const description = document.getElementById('course-description').value.trim();
    const teacher = document.getElementById('course-teacher').value.trim();
    const room = document.getElementById('course-room').value.trim();
    const startDate = document.getElementById('course-start-date').value;
    const endDate = document.getElementById('course-end-date').value;

    const courseData = {
        name: title,
        description: description,
        teacher: teacher,
        room: room,
        startDate: startDate,
        endDate: endDate
    };

    try {
        if (courseId) {
            // Update existing course
            await updateCourses(courseId, courseData);
        } else {
            // Add new course
            await addCourses(courseData);
        }
        closeCourseModal();
        renderCourses(); // Re-render the list after add/update
    } catch (error) {
        console.error('Error saving course:', error);
        alert('Failed to save course. Please try again.');
    }
});

// Handler for Edit button click
window.handleEditCourse = async (id) => {
    // Fetch course details to populate the form
    const courses = await fetchCourses(); // Re-fetching all courses to find the one to edit
    const courseToEdit = courses.find(c => c.id === id);
    if (courseToEdit) {
        openCourseModal(courseToEdit);
    } else {
        alert('Course not found.');
    }
};

// Handler for Delete button click
window.handleDeleteCourse = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
        try {
            await deleCourses(id);
            renderCourses(); // Re-render the list after deletion
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course. Please try again.');
        }
    }
};

// Initial render of courses when the page loads
renderCourses();
