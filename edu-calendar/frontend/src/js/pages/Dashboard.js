import { fetchDashboardData } from '../services/api.js';

// Function to render dashboard data
async function renderDashboard() {
    try {
        const dashboardData = await fetchDashboardData();

        // Update stat cards
        document.querySelector(".stat-card-courses").textContent = `📚 Courses: ${dashboardData.courses || 0}`;
        document.querySelector(".stat-card-students").textContent = `👨‍🎓 Students: ${dashboardData.students || 0}`;
        document.querySelector(".stat-card-teachers").textContent = `👩‍🏫 Teachers: ${dashboardData.teachers || 0}`;
        document.querySelector(".stat-card-classes").textContent = `🗓️ Classes this week: ${dashboardData.classesThisWeek || 0}`;

        // Update upcoming classes list
        const updateList = document.querySelector(".upcoming ul");
        updateList.innerHTML = ""; // Clear existing list
        if (dashboardData.upcomingClasses && dashboardData.upcomingClasses.length > 0) {
            dashboardData.upcomingClasses.forEach((cls) => {
                const li = document.createElement("li");
                li.textContent = `${cls.time || ''} - ${cls.name || ''} (Room ${cls.room || ''})`;
                updateList.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No upcoming classes.";
            updateList.appendChild(li);
        }

        // Update announcements list
        const announcementsList = document.querySelector(".announcements ul");
        announcementsList.innerHTML = ""; // Clear existing list
        if (dashboardData.announcements && dashboardData.announcements.length > 0) {
            dashboardData.announcements.forEach((announcement) => {
                const li = document.createElement("li");
                li.textContent = announcement;
                announcementsList.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No new announcements.";
            announcementsList.appendChild(li);
        }

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Display error message to user if data fetching fails
        document.querySelector(".stats").innerHTML = '<p style="color: red;">Failed to load dashboard data.</p>';
        document.querySelector(".upcoming").innerHTML = '<p style="color: red;">Failed to load upcoming classes.</p>';
        document.querySelector(".announcements").innerHTML = '<p style="color: red;">Failed to load announcements.</p>';
    }
}

// Navigation function
function goTo(page) {
  if(page === "students") {
    window.location.href = "/students.html";
  } else if(page === "courses") {
    window.location.href = "/courses.html";
  } else if(page === "schedule") {
    window.location.href = "/schedule.html";
  }
}

// Call renderDashboard when the page loads
renderDashboard();

// Export the function for use in routing
export default renderDashboard;
