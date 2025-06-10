# 🧠 Quiz App

An interactive and responsive **Quiz Application** built with **React**, **Redux Toolkit**, **Chakra UI**, and **Tailwind CSS**. This app allows users to set up custom quizzes using the [Open Trivia Database](https://opentdb.com/api_config.php), test their knowledge, and see results with dynamic feedback on a leaderboard.

---

## 🚀 Features

### 🎯 Quiz Setup Page
- Enter **name**, choose **category**, **difficulty**, and number of questions.
- Validation ensures all fields are filled before starting the quiz.
- Fetches questions from `https://opentdb.com/api.php`.

### ❓ Dynamic Quiz
- Multiple choice questions with randomized options.
- Real-time score updates based on user selections.
- Prevents re-selection once an answer is chosen.

### 🏆 Leaderboard & Feedback
- Displays **user name**, **score**, and **total questions**.
- Dynamically calculates performance level:
  - 🥇 **Expert** (80-100%)
  - 🥈 **Intermediate** (50-79%)
  - 🥉 **Beginner** (<50%)
- Shows **congratulations** or **try again** message based on performance.

### 💡 Additional Features
- Uses Chakra UI for component styling and theme consistency.
- Tailwind CSS for responsive design and layout utilities.
- Smooth transitions using React Router.
- Handles API loading and error states gracefully.

---

## 📸 Preview
[live Link]("https://quiz-ganarater.vercel.app/")

---

## 📦 Tech Stack

| Technology      | Role                          |
|-----------------|-------------------------------|
| React           | UI and component logic        |
| Redux Toolkit   | State management              |
| Chakra UI       | Accessible UI components      |
| Tailwind CSS    | Utility-first responsive UI   |
| React Router    | Client-side routing           |
| Open Trivia API | Source of quiz data           |

---



