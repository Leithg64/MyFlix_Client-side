import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./signup-view.scss"

export const SignupView = () => {
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [birthday, setBirthday] = useState("");

const handleSubmit = (event) => {
event.preventDefault();
const isoDate = new Date(birthday).toISOString(); // Convert to ISO date string

const data = {
  Username: username, 
  Email: email,
  Birthday: isoDate,
  Password: password
};

fetch("https://myflixparttwo-bcd374c2380d.herokuapp.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
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
    alert("Signup successful");
    window.location.reload();
  })
  .catch((error) => {
    console.error('Signup failed:', error);
    alert("Signup failed: " + error.message);
  });
};

return (
  <div className="signup-form">
    <Form onSubmit={handleSubmit}>
      <br />
      <h1 className="signup-h1"> Create an Account: </h1>
      <br />
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        minLength={5}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Form.Group controlId="formEmail">
      <Form.Label> Email: </Form.Label>
      <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Form.Group controlId="formBirthday">
      <Form.Label> Birthday: </Form.Label>
      <Form.Control
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
      </Form.Group>
      <br />
      <Button variant="primary" type="submit"> Sign up </Button>
    </Form>
  </div>
    
  );
}