const API_URL = '/api/trips';

const getAuthToken = () => localStorage.getItem('token');

export const tripService = {
  /**
   * Create a new trip with an optional cover image.
   * @param {Object} tripData The data for the trip
   * @param {File} coverImageFile The file to upload (optional)
   * @returns {Promise<string>} The new trip's ID
   */
  createTrip: async (tripData, coverImageFile) => {
    try {
      const formData = new FormData();
      
      // Append all trip data fields
      Object.keys(tripData).forEach(key => {
        formData.append(key, tripData[key]);
      });

      // Append image if exists
      if (coverImageFile) {
        formData.append('coverImage', coverImageFile);
      }

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
          // Don't set Content-Type here, browser sets it automatically with boundary for FormData
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create trip');
      }

      const data = await res.json();
      return data.id;
    } catch (error) {
      console.error("Error creating trip: ", error);
      throw error;
    }
  },

  /**
   * Fetch all trips.
   * @returns {Promise<Array>} Array of trip objects
   */
  getTrips: async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch trips');
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching trips: ", error);
      throw error;
    }
  },

  /**
   * Delete a trip by ID.
   * @param {string} tripId The trip ID to delete
   */
  deleteTrip: async (tripId) => {
    try {
      const res = await fetch(`${API_URL}/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete trip');
      }
    } catch (error) {
      console.error("Error deleting trip: ", error);
      throw error;
    }
  }
};
