// Import routes
import { routes } from './js/constants/routes.js';

// Function to load HTML components dynamically
function loadHTMLComponent(elementId, filePath) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      element.innerHTML = data;
      // Execute init function if it exists for the current route
      const currentRoute = routes[window.location.pathname];
      if (currentRoute && currentRoute.init) {
        currentRoute.init();
      }
    })
    .catch(error => {
      console.error(`Error loading component from ${filePath}:`, error);
    });
}

// Router function
function router() {
  const path = window.location.pathname;
  const route = routes[path] || routes['/404']; // Default to 404 if path not found

  if (route) {
    loadHTMLComponent('content', route.template); // Load content into the 'content' div
  } else {
    console.error('No route found for path:', path);
  }
}

// Handle navigation clicks
function handleNavigation(event) {
  if (event.target.matches('a')) {
    const href = event.target.getAttribute('href');
    if (href && href.startsWith('/')) { // Only handle internal links
      event.preventDefault(); // Prevent default link behavior
      history.pushState(null, null, href); // Update URL without reloading
      router(); // Reroute
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Load the navbar
  loadHTMLComponent('page-header', './views/components/navbar.html');

  // Set up router for initial load
  router();

  // Listen for navigation clicks
  document.body.addEventListener('click', handleNavigation);

  // Listen for browser back/forward navigation
  window.addEventListener('popstate', router);
});
