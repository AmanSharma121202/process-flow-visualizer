# Process Flow Visualizer

An interactive platform for simulating and visualizing core operating system process scheduling algorithms, built with Vite, React, TypeScript, and Shadcn/ui.

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📖 About The Project

Process Flow Visualizer is an educational tool designed to demystify complex operating system concepts. It provides a hands-on environment where users can simulate process scheduling algorithms, input custom data, and instantly see the results. By generating clear Gantt charts and detailed performance metrics, this platform helps bridge the gap between theoretical knowledge and practical understanding, making it an ideal companion for students in operating systems courses.

---

## ✨ Key Features

* **🔄 Simulate Multiple Algorithms**: Interactively simulate four fundamental scheduling algorithms:
    * First-Come, First-Served (FCFS)
    * Shortest Job First (SJF)
    * Priority Scheduling (Non-Preemptive)
    * Round Robin

* **✍️ Custom Data Input**: Dynamically add, edit, or remove processes. Users can define custom values for Process ID, Arrival Time, Burst Time, and Priority.

* **📊 Dynamic Gantt Chart Generation**: Automatically generates a clean and intuitive Gantt chart that visually represents the timeline of process execution for the selected algorithm.

* **📈 Detailed Performance Analysis**: Calculates and displays a comprehensive table with key performance metrics for each process, including:
    * Completion Time
    * Turnaround Time
    * Waiting Time

* **Averages Calculation**: Instantly view the average Turnaround Time and average Waiting Time to easily compare the efficiency of different algorithms.

* **Modern & Responsive UI**: Built with Shadcn/ui and Tailwind CSS for a clean, accessible, and fully responsive user experience on any device.

---

## 🛠️ Tech Stack

This project is built with a modern, fast, and type-safe technology stack.

* **Build Tool**: [Vite](https://vitejs.dev/)
* **Framework**: [React.js](https://reactjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 💡 Future Enhancements

* Implement preemptive versions of algorithms (e.g., SRTF, Preemptive Priority).
* Add more scheduling algorithms like Highest Response Ratio Next (HRRN).
* Incorporate a step-by-step animation of the Gantt chart generation.
* Add a comparison view to analyze the performance of multiple algorithms side-by-side with the same data set.

---
