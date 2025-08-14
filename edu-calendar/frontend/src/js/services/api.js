import { API_URL } from '../constants/apiEndpoints.js';

export async function fetchCourses() {
    const response = await fetch(`${API_URL}/courses`);
    return await response.json();
}

export async function fetchStudents() {
    const response = await fetch(`${API_URL}/students`);
    return await response.json();
}
