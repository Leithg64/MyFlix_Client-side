import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ token }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    birthday: "",
  });
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://myflixparttwo-bcd374c2380d.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        // Find the logged-in user based on username
        const loggedInUser = data.find((u) => u.Username === user.username);
        setUser(loggedInUser);
        setUserData({
          username: loggedInUser.Username,
          email: loggedInUser.Email,
          dob: loggedInUser.Birthday,
        });
        setFavoriteMovies(loggedInUser.FavoriteMovies);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [token, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    fetch(`https://myflixparttwo-bcd374c2380d.herokuapp.com/users/${user.Username}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: userData.username,
        Email: userData.email,
        Birthday: userData.dob,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated successfully!");
        } else {
          throw new Error("Failed to update profile");
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleDeregister = () => {
    fetch(`https://myflixparttwo-bcd374c2380d.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("User deregistered successfully!");
          // Redirect to login page after deregistration
          navigate("/login");
        } else {
          throw new Error("Failed to deregister user");
        }
      })
      .catch((error) => console.error("Error deregistering user:", error));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={userData.birthday}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
        <Button variant="danger" onClick={handleDeregister}>
          Deregister
        </Button>
      </Form>
      <h3>Favorite Movies</h3>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie._id}>{movie.Title}</li>
        ))}
      </ul>
    </div>
  );
};