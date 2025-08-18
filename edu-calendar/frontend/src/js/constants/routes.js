import Home from '../pages/Home.js';
import Courses from '../pages/Courses.js';
import Students from '../pages/Students.js';
import Login from '../pages/Login.js';
import Dashboard from '../pages/Dashboard.js';
import Register from '../pages/Register.js';

export const routes = {
    '/': { template: './views/pages/home.html', init: Home },
    '/home': { template: './views/pages/home.html', init: Home },
    '/login': { template: './views/pages/login.html', init: Login },
    '/courses': { template: './views/pages/courses.html', init: Courses },
    '/students': { template: './views/pages/students.html', init: Students },
    '/dashboard': { template: './views/pages/dashboard.html', init: Dashboard },
    '/register': { template: './views/pages/register.html', init: Register },
    '/404': { template: './views/pages/404.html' }
};
