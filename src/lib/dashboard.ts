// // src/lib/dashboard.ts
// import axios from 'axios';

// export async function getDashboardData() {
//   try {
//     // Fetch dashboard stats
//     const statsResponse = await axios.get('/api/dash/stats');
//     const stats = statsResponse.data;

//     // Fetch recent activity
//     const activityResponse = await axios.get('/api/dash/recent');
//     const recentActivity = activityResponse.data;

//     return { stats, recentActivity };
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     return { stats: null, recentActivity: [] };
//   }
// }

// src/lib/dashboard.ts
import axios from 'axios';

export async function getDashboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Fetch dashboard stats
    const statsResponse = await axios.get(`${baseUrl}/api/dash/stats`);
    const stats = statsResponse.data;

    // Fetch recent activity
    const activityResponse = await axios.get(`${baseUrl}/api/dash/recent`);
    const recentActivity = activityResponse.data;

    return { stats, recentActivity };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { stats: null, recentActivity: [] };
  }
}