/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_main: "#01959F",
        primary_border: "#4DB5BC",
        primary_surface: "#F7FEFF",
        secondary_main: "#FA9810",
        secondary_border: "#FEEABC",
        secondary_surface: "#FFFCF5",
        success_main: "#43936C",
        success_border: "#B8DBCA",
        success_surface: "#F8FBF9",
        danger_main: "#E11428",
        danger_border: "#F5B1B7",
        danger_surface: "#FFFAFA",
        primmary_blue: "#3751FF",

        neutral: {
          100: "#1D1F20",
          90: "#404040",
          70: "#757575",
          40: "#E0E0E0",
          30: "#EDEDED",
          20: "#FAFAFA",
          10: "#FFFFFF",
        },
        input_border: "EDEDED",
        utilities: "#333333",
        overlay: "#9F9F9F",
      },
    },
  },
  plugins: [],
};
