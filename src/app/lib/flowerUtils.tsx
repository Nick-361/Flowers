const getDayOfYear = (date: Date = new Date()): number => {
  // UTC Time, 4 hours ahead 
    const start = new Date(date.getFullYear(), 0, 0); // Start of the year (January 1st)
    const diff = date.getTime() - start.getTime(); // Difference in milliseconds
    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in one day

    // Adjust the time by subtracting 10 hours (6 AM in local time (10-4=6))
  const adjustedTime = diff - (1000 * 60 * 60 * 10);
  
  return Math.floor(adjustedTime / oneDay); // Return the adjusted day number
};
  
console.log("Day of the year: ", getDayOfYear()); // Example usage

const isChristmasDay = (): boolean => {
  // JavaScript months are 0-indexed, so December is month 11
  const date = new Date();
  const isDecember = date.getMonth() === 11; // Month is December
  const is25th = date.getDate() === 25; // Day is the 25th
  return isDecember && is25th;
};

const isValentinesDay = (): boolean => {
  // JavaScript months are 0-indexed, so December is month 11
  const date = new Date();
  const isFeburary = date.getMonth() === 2; 
  const is14th = date.getDate() === 14; 
  return isFeburary && is14th;
};

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

export { getFlowersForToday, saveFlowersForToday, getDayOfYear, isChristmasDay, isValentinesDay };