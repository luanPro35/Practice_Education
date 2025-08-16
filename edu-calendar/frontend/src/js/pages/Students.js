import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../services/api.js';
async function renderStudents() {
    const studentsContainer = document.getElementById('students-container');
    const students = await fetchStudents();
    studentsContainer.innerHTML = students.map(student => `
        <div class="card">
            <h3>${student.firstName || ''} ${student.lastName || ''}</h3>
            <p>${student.email || ''}</p>
            <p>${student.phone || ''}</p>
            <p>${student.class || ''}</p>
            <button onclick="handleEditStudent(${student.id})">Edit</button>
            <button onclick="handleDeleteStudent(${student.id})">Delete</button>
        </div>
    `).join('');
}
function openStudentModal(student = null) {
    const modal = document.getElementById('student-modal');
    const modalTitle = document.getElementById('modal-title');
    const studentForm = document.getElementById('student-form');
    const studentIdInput = document.getElementById('student-id');
    modal.style.display = 'block';
    modalTitle.textContent = student ? 'Edit Student' : 'Add Student';
    studentForm.reset();
    if (student) {
        document.getElementById('student-name').value = `${student.firstName || ''} ${student.lastName || ''}`;
        document.getElementById('student-email').value = student.email || '';
        document.getElementById('student-phone').value = student.phone || '';
        document.getElementById('student-class').value = student.class || '';
        if (!studentIdInput) {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.id = 'student-id';
            hiddenInput.name = 'id';
            studentForm.appendChild(hiddenInput);
            studentIdInput = document.getElementById('student-id');
        }
        studentIdInput.value = student.id;
    } else {
        if (studentIdInput) {
            studentIdInput.remove();
        }
    }
}
function closeStudentModal() {
    document.getElementById('student-modal').style.display = 'none';
}
document.getElementById('add-student').addEventListener('click', () => {
    openStudentModal();
});
document.getElementById('student-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const studentId = document.getElementById('student-id')?.value;
    const name = document.getElementById('student-name').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const phone = document.getElementById('student-phone').value.trim();
    const studentClass = document.getElementById('student-class').value.trim();
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    const studentData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        class: studentClass
    };
    try {
        if (studentId) {
            await updateStudent(studentId, studentData);
        } else {
            await addStudent(studentData);
        }
        closeStudentModal();
        renderStudents();
    } catch (error) {
        console.error('Error saving student:', error);
        alert('Failed to save student. Please try again.');
    }
});
window.handleEditStudent = async (id) => {
    const studentToEdit = students.find(s => s.id === id);
    if (studentToEdit) {
        openStudentModal(studentToEdit);
    } else {
        alert('Student not found.');
    }
};
window.handleDeleteStudent = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            await deleteStudent(id);
            renderStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Failed to delete student. Please try again.');
        }
    }
};
renderStudents();