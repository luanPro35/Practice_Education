import { fetchCourses, addCourses, updateCourses, deleCourses } from '../services/api.js';

// Store all courses to perform client-side filtering and searching
let allCourses = [];

// Function to render the courses list and set up event listeners
async function renderCourses(filter = 'all', searchTerm = '') {
    const coursesContainer = document.getElementById('courses-container');
    if (coursesContainer) {
        // Fetch all courses if not already loaded
        if (allCourses.length === 0) {
            allCourses = await fetchCourses();
        }

        // Apply filter and search
        const filteredCourses = allCourses.filter(course => {
            const matchesFilter = filter === 'all' || course.category === filter; // Assuming 'category' property exists
            const matchesSearch = !searchTerm ||
                                  course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        coursesContainer.innerHTML = filteredCourses.map(course => `
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

    // Set up event listeners for controls
    const addCourseBtn = document.getElementById('add-course-btn');
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', () => {
            openCourseModal();
        });
    }

    const courseForm = document.getElementById('course-form');
    if (courseForm) {
        courseForm.addEventListener('submit', handleCourseFormSubmit);
    }

    // Event listener for category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        // Remove previous listener to avoid duplicates if renderCourses is called multiple times
        categoryFilter.removeEventListener('change', handleFilterChange);
        categoryFilter.addEventListener('change', handleFilterChange);
        // Set the current filter value if it's not 'all'
        if (filter !== 'all') {
            categoryFilter.value = filter;
        }
    }

    // Event listener for search button
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    if (searchButton && searchInput) {
        // Remove previous listener to avoid duplicates
        searchButton.removeEventListener('click', handleSearchClick);
        searchButton.addEventListener('click', handleSearchClick);
        // Set the current search term if it's not empty
        if (searchTerm !== '') {
            searchInput.value = searchTerm;
        }
    }
}

// Handler for category filter change
function handleFilterChange() {
    const filter = document.getElementById('category-filter').value;
    const searchTerm = document.getElementById('search-input').value;
    renderCourses(filter, searchTerm);
}

// Handler for search button click
function handleSearchClick() {
    const searchTerm = document.getElementById('search-input').value;
    const filter = document.getElementById('category-filter').value;
    renderCourses(filter, searchTerm);
}

// Function to open the course modal for adding or editing
function openCourseModal(course = null) {
    const modal = document.getElementById('course-modal');
    const modalTitle = document.getElementById('course-modal-title');
    const courseForm = document.getElementById('course-form');

    if (modal) modal.style.display = 'block';
    if (modalTitle) modalTitle.textContent = course ? 'Edit Course' : 'Add Course';

    if (courseForm) {
        courseForm.reset();
        if (course) {
            document.getElementById('course-title').value = course.name || '';
            document.getElementById('course-description').value = course.description || '';
            document.getElementById('course-teacher').value = course.teacher || '';
            document.getElementById('course-room').value = course.room || '';
            document.getElementById('course-start-date').value = course.startDate || '';
            document.getElementById('course-end-date').value = course.endDate || '';

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
            const idInput = document.getElementById('course-id');
            if (idInput) {
                idInput.remove();
            }
        }
    }
}

// Function to close the course modal
function closeCourseModal() {
    const modal = document.getElementById('course-modal');
    if (modal) modal.style.display = 'none';
}

// Handler for form submission
async function handleCourseFormSubmit(event) {
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
            await updateCourses(courseId, courseData);
        } else {
            await addCourses(courseData);
        }
        closeCourseModal();
        // Re-render with current filter/search to reflect changes
        const filter = document.getElementById('category-filter').value;
        const searchTerm = document.getElementById('search-input').value;
        renderCourses(filter, searchTerm);
    } catch (error) {
        console.error('Error saving course:', error);
        alert('Failed to save course. Please try again.');
    }
}

// Handler for Edit button click
window.handleEditCourse = async (id) => {
    // Fetch latest courses to ensure edit data is current
    // We need to fetch all courses again to ensure we have the latest data for editing
    const currentCourses = await fetchCourses(); // Fetch all courses
    const courseToEdit = currentCourses.find(c => c.id === id);
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
            // Re-render after delete, preserving current filter/search
            const filter = document.getElementById('category-filter').value;
            const searchTerm = document.getElementById('search-input').value;
            renderCourses(filter, searchTerm);
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course. Please try again.');
        }
    }
};

export default renderCourses;
