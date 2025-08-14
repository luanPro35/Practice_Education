import { routes } from './js/constants/routes.js';

const root = document.getElementById('root');

function router() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/404'];
    fetch(route.template)
        .then(response => response.text())
        .then(html => {
            root.innerHTML = html;
            if (route.init) {
                route.init();
            }
        });
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
