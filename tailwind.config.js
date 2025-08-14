const { Container } = require('lucide-react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // important for Vite
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      
      Container:{
        center:true,
        padding: {
          DEFAULT:"1rem",
          sm:"2rem",
          lg:"4rem",
          xl:"5rem",
          "2xl":"6rem",
        }
      }
    
    },
  },
  plugins: [],
};
