import React, { useState } from "react";
import { Button, InputGroup, Card } from "@blueprintjs/core";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error("Invalid credentials");
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="task-container">
      <Card elevation={2} className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <InputGroup
          className="login-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputGroup
          className="login-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button intent="primary" text="Login" onClick={handleLogin} />
      </Card>
    </div>
  );
}