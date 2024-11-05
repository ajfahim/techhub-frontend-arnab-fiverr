/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#309996",
        "hover-color": " #3BB3AF",
      },
    },
  },
  plugins: [require("daisyui")],
};
