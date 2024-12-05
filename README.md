
# **Task Manager Application**

A simple and sleek Task Manager application built with **React**, **Redux**, and **Node.js**. The app allows users to log in, manage tasks (add, edit, delete), and securely store data with **JWT authentication**.

---

## **Features**

- **User Authentication**: Secure login using JWT tokens.
- **Task Management**: Add, edit, and delete tasks.
- **Real-Time Updates**: Reflects changes immediately in the UI.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- **Sleek Animations**: Smooth animations for task actions (powered by Framer Motion).

---

## **Technologies Used**

### **Frontend**
- **React**: Component-based library for building the user interface.
- **Redux Toolkit**: State management for tasks and authentication.
- **Blueprint.js**: UI components for a sleek and professional design.
- **Framer Motion**: Animation library for interactive experiences.

### **Backend**
- **Node.js**: Runtime for building the server.
- **Express**: Lightweight web framework.
- **jsonwebtoken**: For generating and validating JWT tokens.
- **CORS**: Enables cross-origin requests.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### **2. Install Dependencies**

#### **Frontend**
```bash
cd frontend
npm install
```

#### **Backend**
```bash
cd backend
npm install
```

### **3. Start the Application**

#### **Frontend**
```bash
npm start
```

Frontend runs on [http://localhost:3000](http://localhost:3000).

#### **Backend**
```bash
node server.js
```

Backend runs on [http://localhost:5000](http://localhost:5000).

---

## **API Endpoints**

### **Authentication**

- **POST /login**
  - **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "your-jwt-token"
    }
    ```

---

### **Tasks**

- **GET /tasks**
  - **Authorization**: Bearer `<your-jwt-token>`
  - **Response**:
    ```json
    [
      { "task": "Task 1" },
      { "task": "Task 2" }
    ]
    ```

- **POST /tasks**
  - **Authorization**: Bearer `<your-jwt-token>`
  - **Request Body**:
    ```json
    {
      "task": "New Task"
    }
    ```
  - **Response**:
    ```json
    201 Task added
    ```

- **PUT /tasks/:index**
  - **Authorization**: Bearer `<your-jwt-token>`
  - **Request Body**:
    ```json
    {
      "task": "Updated Task"
    }
    ```
  - **Response**:
    ```json
    200 Task updated
    ```

- **DELETE /tasks/:index**
  - **Authorization**: Bearer `<your-jwt-token>`
  - **Response**:
    ```json
    200 Task deleted
    ```

---

## **How to Use**

### **Login**
1. Use `admin` as the username and `password` as the password.
2. Upon successful login, you'll receive a JWT token that is automatically managed by the app.

### **Manage Tasks**
1. **Add Tasks**: Type the task name and click "Add."
2. **Edit Tasks**: Click the edit icon, modify the task, and save it.
3. **Delete Tasks**: Click the trash icon to delete a task.

---

## **Folder Structure**

```
task-manager/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components (Login, TaskList)
│   │   ├── features/       # Redux slices
│   │   ├── store/          # Redux store setup
│   │   ├── styles/         # Custom CSS styles
│   ├── package.json
│   └── README.md
├── backend/
│   ├── server.js           # Node.js backend logic
│   ├── package.json
├── README.md
```

---

## **License**

This project is licensed under the [MIT License](LICENSE).
