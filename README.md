# 🌳 Nested Comments App

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-5.0.1-purple.svg)](https://redux.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3.24-ff69b4.svg)](https://www.framer.com/motion/)

A modern, interactive nested comments application built with React, Redux, and enhanced with beautiful animations using Framer Motion.



## ✨ Features

- 📝 Create, edit, and delete comments
- 🌲 Nested replies support
- 🌓 Dark mode toggle
- 🔄 Sort comments by newest, oldest, or most replies
- 🎭 Smooth animations and transitions
- 📱 Responsive design for all devices
- 🚀 Performance optimized

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/nested-comments-app.git
   ```

2. Navigate to the project directory:
   ```sh
   cd nested-comments-app
   ```

3. Install the dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## 🛠️ Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons in your React projects
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications for React
- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library

## 📁 Project Structure

```
nested-comments-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Comment.js
│   │   ├── CommentForm.js
│   │   ├── CommentList.js
│   │   ├── ReplyForm.js
│   │   ├── ScrollToTop.js
│   │   └── ThemeToggle.js
│   ├── redux/
│   │   ├── actions/
│   │   │   └── commentActions.js
│   │   ├── reducers/
│   │   │   └── commentReducer.js
│   │   └── store.js
│   ├── utils/
│   │   ├── commentUtils.js
│   │   ├── dateUtils.js
│   │   └── validationUtils.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Customization

- Modify the color scheme in `tailwind.config.js`
- Adjust animations in individual components using Framer Motion
- Extend Redux state and actions for additional features

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/nested-comments-app/issues).

## 📜 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 👏 Acknowledgements

- [Create React App](https://create-react-app.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion API](https://www.framer.com/api/motion/)

---

Made with ❤️ by [Sushant](https://github.com/Sushant9473)
