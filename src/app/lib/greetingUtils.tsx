// Function to get today's date in YYYY-MM-DD format
const getCurrentDate = () => new Date().toISOString().split('T')[0];
console.log(getCurrentDate())
// Check if a greeting is stored for today
const getGreetingForToday = () => {
  const savedGreeting = localStorage.getItem('greeting');
  const savedDate = localStorage.getItem('greetingDate');

  if (savedDate === getCurrentDate()) {
    return savedGreeting; // Return the saved greeting if it's from today
  }
  return null; // No greeting stored for today
};

// Save the new greeting for the day
const saveGreetingForToday = (greeting: string) => {
  localStorage.setItem('greeting', greeting);
  localStorage.setItem('greetingDate', getCurrentDate()); // Save today's date
};

export { getGreetingForToday, saveGreetingForToday };