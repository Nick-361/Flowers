const getDayOfYear = (date: Date = new Date()): number => {
    const start = new Date(date.getFullYear(), 0, 0); // Start of the year (January 1st)
    const diff = date.getTime() - start.getTime(); // Difference in milliseconds
    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in one day
    return Math.floor(diff / oneDay); // Return the day number
  };
  
  console.log(getDayOfYear()); // Example usage
  

// Check if flowers is stored for today
const getFlowersForToday = () => {
    const today = getDayOfYear()
  const savedGreeting = localStorage.getItem('flowers');
  const savedDate = localStorage.getItem('flowerDay');

  if (savedDate === today.toString()) {
    return savedGreeting; // Return the saved greeting if it's from today
  }
  return null; // No greeting stored for today
};

// Save the new flowers for the day
const saveFlowersForToday = (flowers: string) => {
    const today = getDayOfYear()
  localStorage.setItem('flowers', flowers);
  localStorage.setItem('flowerDay', today.toString()); // Save today's date
};

export { getFlowersForToday, saveFlowersForToday, getDayOfYear };