const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper for HTTP requests with error handling
async function fetchAPI(endpoint, options = {}) {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sirjay_admin_token') : null;
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (err) {
    console.warn(`API Error [${endpoint}]:`, err.message);
    return null;
  }
}

// ----------------- PUBLIC API ENDPOINTS -----------------

export async function getHeroConfig() {
  const data = await fetchAPI('/hero');
  return data && data.success ? data.hero : null;
}

export async function getWhyChooseCards() {
  const data = await fetchAPI('/why-choose');
  return data && data.success && data.cards.length > 0 ? data.cards : null;
}

export async function getFashionModules() {
  const data = await fetchAPI('/fashion-modules');
  return data && data.success && data.modules.length > 0 ? data.modules : null;
}

export async function getComingSoonDepts() {
  const data = await fetchAPI('/coming-soon');
  return data && data.success && data.depts.length > 0 ? data.depts : null;
}

export async function getCourses(category) {
  const query = category ? `?category=${category}` : '';
  const data = await fetchAPI(`/courses${query}`);
  return data && data.success && data.courses.length > 0 ? data.courses : null;
}

export async function submitApplication(formData) {
  return await fetchAPI('/admissions/apply', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export async function submitInquiry(formData) {
  return await fetchAPI('/contact/inquire', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

export async function getEvents() {
  const data = await fetchAPI('/events');
  return data && data.success && data.events.length > 0 ? data.events : null;
}

export async function submitRSVP(eventId, rsvpData) {
  return await fetchAPI(`/events/${eventId}/rsvp`, {
    method: 'POST',
    body: JSON.stringify(rsvpData),
  });
}

export async function getGalleryItems(params = {}) {
  const query = new URLSearchParams(params).toString();
  const data = await fetchAPI(`/gallery${query ? `?${query}` : ''}`);
  return data && data.success && data.items.length > 0 ? data.items : null;
}

export async function getFAQs() {
  const data = await fetchAPI('/faqs');
  return data && data.success && data.faqs.length > 0 ? data.faqs : null;
}

export async function getStaff() {
  const data = await fetchAPI('/staff');
  return data && data.success && data.staff.length > 0 ? data.staff : null;
}

// ----------------- ADMIN AUTH & MANAGEMENT API ENDPOINTS -----------------

export async function loginAdmin(credentials) {
  const data = await fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  if (data && data.success && data.token) {
    localStorage.setItem('sirjay_admin_token', data.token);
    localStorage.setItem('sirjay_admin_user', JSON.stringify(data.admin));
  }
  return data;
}

export async function getAdminStats() {
  return await fetchAPI('/admin/dashboard-stats');
}

export async function updateHeroConfig(payload) {
  return await fetchAPI('/hero', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

// Generic Admin CRUD Helpers
export async function createItem(endpoint, itemData) {
  return await fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(itemData),
  });
}

export async function updateItem(endpoint, id, itemData) {
  return await fetchAPI(`${endpoint}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  });
}

export async function patchItem(endpoint, id, payload) {
  return await fetchAPI(`${endpoint}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteItem(endpoint, id) {
  return await fetchAPI(`${endpoint}/${id}`, {
    method: 'DELETE',
  });
}

export async function uploadGalleryFile(file) {
  try {
    const token = localStorage.getItem('sirjay_admin_token');
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE_URL}/gallery/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error('File Upload Error:', err);
    return null;
  }
}

export async function getAdminApplications(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await fetchAPI(`/admissions${query ? `?${query}` : ''}`);
}

export async function getAdminInquiries() {
  return await fetchAPI('/contact/inquiries');
}

export async function markAllInquiriesRead() {
  return await fetchAPI('/contact/inquiries/read-all', {
    method: 'PATCH',
  });
}

export async function getAdminRSVPs() {
  return await fetchAPI('/events/rsvps/all');
}
