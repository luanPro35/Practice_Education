import { fetchStudents } from '../services/api.js';

export default async function Students() {
    const studentsContainer = document.getElementById('students-container');
    const students = await fetchStudents();
    studentsContainer.innerHTML = students.map(student => `
        <div class="card">
            <h3>${student.firstName} ${student.lastName}</h3>
            <p>${student.email}</p>
        </div>
    `).join('');
}
