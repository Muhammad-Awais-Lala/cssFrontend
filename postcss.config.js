import tailwindcss from 'tailwindcss'; // Import the main tailwindcss package
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(), // Call tailwindcss as a function
    autoprefixer,
  ],
};