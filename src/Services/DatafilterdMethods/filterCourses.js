/**
 * Dynamically filter courses based on any filter object
 * @param {Array} courses - Array of course objects
 * @param {Object} filters - Object with keys matching course properties
 * @returns {Array} Filtered courses
 */
export function filterCourses(courses, filters = {}) {
  // Get all keys from the filter object
  const filterKeys = Object.keys(filters);

  return courses.filter(course => {
    // Check every filter key, if any fails, exclude the course
    return filterKeys.every(key => {
      const filterValue = filters[key];
      // If filterValue is undefined or null, ignore it
      if (filterValue === undefined || filterValue === null) return true;

      // Compare course value with filter value
      return course[key] === filterValue;
    });
  });
}
