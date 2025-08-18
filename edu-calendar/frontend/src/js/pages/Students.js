import { addStudent, updateStudent, deleteStudent, fetchStudents as apiFetchStudents, getStudentById as apiGetStudentById } from "../services/api.js";

// Store all students to perform client-side filtering and searching
let allStudents = [];

// Exporting getStudentById as well
const Students = {
  add: addStudent,
  update: updateStudent,
  delete: deleteStudent,
  getById: apiGetStudentById // Added getById
};

export default Students;

async function renderStudentList(filter = '', search = '') {
  const studentListContainer = document.querySelector('.students-list');
  if (!studentListContainer) return;

  try {
    // Fetch all students if not already loaded
    if (allStudents.length === 0) {
      allStudents = await apiFetchStudents();
    }

    // Apply filter and search (client-side)
    const filteredStudents = allStudents.filter(student => {
      const matchesFilter = filter === '' || student.major === filter; // Assuming 'major' is the filter property
      const matchesSearch = !search ||
                            student.firstName.toLowerCase().includes(search.toLowerCase()) ||
                            student.lastName.toLowerCase().includes(search.toLowerCase()) ||
                            student.email.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    
    studentListContainer.innerHTML = ''; 

    filteredStudents.forEach(student => {
      const card = document.createElement('div');
      card.classList.add('student-card');
      card.innerHTML = `
        <img src="../../assets/images/placeholder.jpg" alt="Student Image" />
        <div class="student-info">
          <h3>${student.firstName} ${student.lastName}</h3>
          <p>${student.email}</p>
          <p>Major: ${student.major || 'N/A'}</p>
          <a href="#" class="profile-link" data-student-id="${student.id}">View Profile</a>
          <button class="delete-student-btn" data-student-id="${student.id}">Delete</button>
          <button class="update-student-btn" data-student-id="${student.id}">Update</button>
        </div>
      `;
      studentListContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to fetch students:", error);
    studentListContainer.innerHTML = "<p>Error loading students.</p>";
  }
}

// Function to render a single student's details (e.g., in a modal or detail view)
function renderStudent(student) {
  // This function needs a specific target element to render into.
  // For now, it's a placeholder. A modal or a dedicated div would be better.
  console.log("Rendering student details:", student);
  // Example: If there's a modal with id="student-detail-modal"
  // const detailModal = document.getElementById('student-detail-modal');
  // if (detailModal) {
  //   detailModal.querySelector('.student-detail-name').textContent = `${student.firstName} ${student.lastName}`;
  //   detailModal.querySelector('.student-detail-email').textContent = student.email;
  //   detailModal.querySelector('.student-detail-major').textContent = student.major || 'N/A';
  //   detailModal.style.display = 'block';
  // }
}

async function handleAddStudent(event) {
  event.preventDefault();
  
  const firstNameInput = document.querySelector('#studentFirstName');
  const lastNameInput = document.querySelector('#studentLastName');
  const emailInput = document.querySelector('#studentEmail');
  const majorInput = document.querySelector('#studentMajor');

  // Check if all required input fields exist
  if (!firstNameInput || !lastNameInput || !emailInput || !majorInput) {
    console.error("One or more student form input fields are missing.");
    alert("Error: Student form is incomplete. Please check the HTML structure.");
    return;
  }

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const major = majorInput.value.trim();

  // Basic validation
  if (!firstName || !lastName || !email) {
    alert("Please fill in all required fields (First Name, Last Name, Email).");
    return;
  }

  const newStudent = { firstName, lastName, email, major };
  
  try {
    await Students.add(newStudent);
    // Clear the form
    document.querySelector('#addStudentForm').reset();
    // Re-render the list to show the new student
    renderStudentList(); 
  } catch (error) {
    console.error("Failed to add student:", error);
    alert("Failed to add student. Please try again.");
  }
}

async function handleUpdateStudent(studentId) {
  // Fetch the student data to pre-fill the form
  try {
    const student = await Students.getById(studentId);
    if (!student) {
      alert("Student not found for update.");
      return;
    }

    const firstNameInput = document.querySelector('#studentFirstName'); 
    const lastNameInput = document.querySelector('#studentLastName');
    const emailInput = document.querySelector('#studentEmail');
    const majorInput = document.querySelector('#studentMajor');

    if (!firstNameInput || !lastNameInput || !emailInput || !majorInput) {
      console.error("One or more student form input fields are missing for update.");
      alert("Error: Student update form is incomplete. Please check the HTML structure.");
      return;
    }

    // Populate the form with existing student data
    firstNameInput.value = student.firstName || '';
    lastNameInput.value = student.lastName || '';
    emailInput.value = student.email || '';
    majorInput.value = student.major || '';

    // Assuming there's a way to trigger the form submission for update,
    // or a separate "Save Update" button. For now, we'll just populate the form.
    // If using a modal for update, this would populate the modal's form.
    // For simplicity, let's assume the form is reused and a submit event will handle it.
    // A more robust solution would involve a modal or a dedicated update form.

    // To actually submit the update, we'd need to modify the form's submit handler
    // or add a specific update submit button.
    // For now, we'll just populate the form. The user would then need to click "Add Student"
    // which would then be handled by handleAddStudent if we modify it to check for studentId.
    // Let's refine handleAddStudent to handle updates as well.

  } catch (error) {
    console.error("Failed to fetch student for update:", error);
    alert("Failed to fetch student data for update. Please try again.");
  }
}

async function handleDeleteStudent(studentId) {
  if (confirm('Are you sure you want to delete this student?')) {
    try {
      await Students.delete(studentId);
      renderStudentList(); // Refresh the list after deletion
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert("Failed to delete student. Please try again.");
    }
  }
}

async function handleViewProfile(studentId) {
  try {
    const student = await Students.getById(studentId);
    if (student) {
      renderStudent(student); 
    } else {
      alert("Student not found.");
    }
  } catch (error) {
    console.error("Failed to fetch student profile:", error);
    alert("Failed to load student profile.");
  }
}

function init(){
  const addForm = document.querySelector('#addStudentForm');
  if (addForm) {
    addForm.addEventListener('submit', handleAddStudent);
    // Removed misplaced alert
  }

  const studentListContainer = document.querySelector('.students-list');
  if (studentListContainer) {
    studentListContainer.addEventListener('click', async (event) => {
      const target = event.target;
      const studentId = target.dataset.studentId;

      if (!studentId) return; // If the clicked element doesn't have a studentId, do nothing

      if (target.classList.contains('delete-student-btn')) {
        await handleDeleteStudent(studentId);
      } else if (target.classList.contains('update-student-btn')) {
        await handleUpdateStudent(studentId); 
        // After populating the form for update, we need to submit it.
        // This requires a mechanism to trigger the form submission for update.
        // For now, we'll assume the user clicks the "Add Student" button again,
        // and handleAddStudent needs to be modified to check for studentId.
        // Let's refine handleAddStudent to handle updates.
      } else if (target.classList.contains('profile-link')) {
        event.preventDefault(); 
        await handleViewProfile(studentId);
      }
    });
  }
}

// Initial rendering when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  init(); 
  renderStudentList(); 
});
