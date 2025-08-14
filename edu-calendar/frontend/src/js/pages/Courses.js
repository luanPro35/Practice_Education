import { fetchCourses } from '../services/api.js';

export default async function Courses() {
    const coursesContainer = document.getElementById('courses-container');
    const courses = await fetchCourses();
    coursesContainer.innerHTML = courses.map(course => `
        <div class="card">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
        </div>
    `).join('');
}
