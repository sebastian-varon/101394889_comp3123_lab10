import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, deleteTask, editTask } from "../features/tasksSlice";
import { Button, InputGroup, Card, Elevation, UL } from "@blueprintjs/core";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList({ token }) {
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks(token));
  }, [dispatch, token]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ task: newTask, token }));
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask({ index, token }));
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setUpdatedTask(tasks[index]);
  };

  const saveTask = (index) => {
    if (updatedTask.trim()) {
      dispatch(editTask({ index, updatedTask, token })); // Dispatch the editTask thunk
      setEditingIndex(null); // Exit edit mode
    } else {
      alert("Task name cannot be empty"); // Handle empty input gracefully
    }
  };  

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="task-container">
      <Card elevation={Elevation.TWO} className="task-card">
        <h2 className="task-title">My Tasks</h2>
        <UL className="task-list">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
                className="task-item"
              >
                {editingIndex === index ? (
                  <InputGroup
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                    rightElement={
                      <Button
                        minimal
                        intent="success"
                        icon="floppy-disk"
                        onClick={() => saveTask(index)}
                      />
                    }
                  />
                ) : (
                  <>
                    {task}
                    <Button
                      minimal
                      intent="primary"
                      icon="edit"
                      onClick={() => handleEditTask(index)}
                    />
                    <Button
                      minimal
                      intent="danger"
                      icon="trash"
                      onClick={() => handleDeleteTask(index)}
                    />
                  </>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </UL>
        <div className="task-input-group">
          <InputGroup
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            intent="primary"
            icon="add"
            text="Add"
            onClick={handleAddTask}
          />
        </div>
      </Card>
    </div>
  );
}