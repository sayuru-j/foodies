/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#68BBE3",
        primary: "#141416",
        secondary: "#EC0051",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
