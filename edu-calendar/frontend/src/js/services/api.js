import { API_ENDPOINTS } from '../constants/apiEndpoints.js';

// Generic API function
async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Handle DELETE requests that might not return content
    if (options.method === 'DELETE') {
        return true;
    }
    
    return await response.json();
}

// Course API functions
export async function fetchCourses() {
    return await apiRequest(API_ENDPOINTS.COURSES);
}

export async function getCourseById(id) {
    return await apiRequest(`${API_ENDPOINTS.COURSES}/${id}`);
}

export async function addCourse(courseData) {
    return await apiRequest(API_ENDPOINTS.COURSES, {
        method: 'POST',
        body: JSON.stringify(courseData)
    });
}

export async function updateCourse(id, courseData) {
    return await apiRequest(`${API_ENDPOINTS.COURSES}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(courseData)
    });
}

export async function deleteCourse(id) {
    return await apiRequest(`${API_ENDPOINTS.COURSES}/${id}`, {
        method: 'DELETE'
    });
}

// Student API functions
export async function fetchStudents() {
    return await apiRequest(API_ENDPOINTS.STUDENTS);
}

export async function getStudentById(id) {
    return await apiRequest(`${API_ENDPOINTS.STUDENTS}/${id}`);
}

export async function addStudent(studentData) {
    return await apiRequest(API_ENDPOINTS.STUDENTS, {
        method: 'POST',
        body: JSON.stringify(studentData)
    });
}

export async function updateStudent(id, studentData) {
    return await apiRequest(`${API_ENDPOINTS.STUDENTS}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(studentData)
    });
}

export async function deleteStudent(id) {
    return await apiRequest(`${API_ENDPOINTS.STUDENTS}/${id}`, {
        method: 'DELETE'
    });
}

// Schedule API functions
export async function fetchSchedules() {
    return await apiRequest(API_ENDPOINTS.SCHEDULES);
}

export async function getScheduleById(id) {
    return await apiRequest(`${API_ENDPOINTS.SCHEDULES}/${id}`);
}

export async function addSchedule(scheduleData) {
    return await apiRequest(API_ENDPOINTS.SCHEDULES, {
        method: 'POST',
        body: JSON.stringify(scheduleData)
    });
}

// Dashboard API function
export async function fetchDashboardData() {
    // Fetch data from multiple endpoints and combine
    try {
        const [courses, students, schedules] = await Promise.all([
            fetchCourses(),
            fetchStudents(),
            fetchSchedules()
        ]);
        
        // Calculate upcoming classes for this week
        const today = new Date();
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + 7);
        
        const upcomingClasses = schedules
            .filter(schedule => {
                const scheduleDate = new Date(schedule.date);
                return scheduleDate >= today && scheduleDate <= endOfWeek;
            })
            .slice(0, 5) // Limit to 5 upcoming classes
            .map(schedule => ({
                time: new Date(schedule.date).toLocaleString(),
                name: schedule.title || 'Unnamed Class',
                room: schedule.room || 'TBD'
            }));
            
        // Mock announcements (in a real app, these would come from the backend)
        const announcements = [
            'Welcome to the new semester!',
            'Library hours extended during finals week',
            'New course registrations open next Monday'
        ];
        
        return {
            courses: courses.length,
            students: students.length,
            teachers: 12, // Mock data
            classesThisWeek: upcomingClasses.length,
            upcomingClasses,
            announcements
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
}

export async function updateSchedule(id, scheduleData) {
    return await apiRequest(`${API_ENDPOINTS.SCHEDULES}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(scheduleData)
    });
}

export async function deleteSchedule(id) {
    return await apiRequest(`${API_ENDPOINTS.SCHEDULES}/${id}`, {
        method: 'DELETE'
    });
}

// Legacy function names for backward compatibility
export const addCourses = addCourse;
export const updateCourses = updateCourse;
export const deleCourses = deleteCourse;
