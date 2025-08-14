import Home from '../pages/Home.js';
import Courses from '../pages/Courses.js';
import Students from '../pages/Students.js';

export const routes = {
    '/': { template: '/src/views/pages/home.html', init: Home },
    '/courses': { template: '/src/views/pages/courses.html', init: Courses },
    '/students': { template: '/src/views/pages/students.html', init: Students },
    '/404': { template: '/src/views/pages/404.html' }
};
