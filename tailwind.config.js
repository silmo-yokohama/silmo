import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/ts/**/*.tsx",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
    },
  },

  plugins: [forms, require("@tailwindcss/typography"), require("daisyui")], // eslint-disable-line
  daisyui: {
    themes: [
      {
        "light-theme": {
          primary: "#00a197",
          "primary-content": "#8ce2dc",
          secondary: "#f8b62b",
          "secondary-content": "#ffdbb3",
          accent: "#ed6d36",
          "accent-content": "#ffd2be",
          neutral: "#181818",
          "neutral-content": "#f3f4f6",
          "base-100": "#f5f5f4",
          "base-200": "#d6d3d1",
          "base-300": "#dcfce7",
          "base-content": "#111827",
          info: "#1d4ed8",
          "info-content": "#dbeafe",
          success: "#15803d",
          "success-content": "#d1fae5",
          warning: "#ea580c",
          "warning-content": "#f3f4f6",
          error: "#be123c",
          "error-content": "#f3f4f6",
        },
        "dark-theme": {
          primary: "#00a197",
          "primary-content": "#8ce2dc",
          secondary: "#f8b62b",
          "secondary-content": "#ffdbb3",
          accent: "#ed6d36",
          "accent-content": "#ffd2be",
          neutral: "#f3f4f6",
          "neutral-content": "#181818",
          "base-100": "#181818",
          "base-200": "#303030",
          "base-300": "#404040",
          "base-content": "#e6e7eb",
          info: "#1d4ed8",
          "info-content": "#dbeafe",
          success: "#15803d",
          "success-content": "#d1fae5",
          warning: "#ea580c",
          "warning-content": "#f3f4f6",
          error: "#be123c",
          "error-content": "#f3f4f6",
        },
      },
    ],
  },
};
