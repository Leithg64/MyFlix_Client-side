import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (event) => {
// this prevents the default behavior of the form which is to reload the entire page
event.preventDefault();

const data = {
  "Username": username, 
  "Password": password  
};

fetch("https://myflixparttwo-bcd374c2380d.herokuapp.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"  // Add this header to indicate JSON payload
  },
  body: JSON.stringify(data)
})
.then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    return response.text().then(text => { throw new Error(text) });
  }
})
.then((data) => {
  console.log('Login successful:', data);
  onLoggedIn(data.user); // Pass the user data instead of just the username
})
.catch((error) => {
  console.error('Login failed:', error);
  alert("Login failed: " + error.message);
});
};
  
return (
    <Form onSubmit={handleSubmit}>
      <br />
      <h1>Login to your account</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>
      <br />
      
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
