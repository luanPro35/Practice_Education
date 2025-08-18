export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
    STUDENTS: `${API_BASE_URL}/students`,
    COURSES: `${API_BASE_URL}/courses`,
    SCHEDULES: `${API_BASE_URL}/schedules`
};

// Legacy support
export const API_URL = API_BASE_URL;
export const API_Student = API_ENDPOINTS.STUDENTS;
