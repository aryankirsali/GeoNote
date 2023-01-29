import React, { useState, useEffect } from "react";
import {Star} from "@material-ui/icons";
import axios from "axios";
import "./MenuButton.css";

export default function MenuButton({ viewport, setViewport }) {
  const [users, setUsers] = useState([]);
  const [selectedUserPins, userSetPins] = useState([]);
  const [filteredPins, setFilteredPins] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/users/all");
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        userSetPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setFilteredPins(
      selectedUserPins.filter((pin) => pin.username === user.username)
    );
  };
  const handleClose = () => {
    setSelectedUser(null);
  };
  const handlePinClick = (coordinates) => {
    setViewport({
      ...viewport,
      latitude: coordinates.lat,
      longitude: coordinates.long,
      zoom: 5,
    });
  };
  return (
    <>
      <button className="menuButton" onClick={handleClick}>
        User Menu
      </button>
      {showMenu && (
        <div className="menu-container">
          <div className="menu-header">USERS</div>
          <div className="user-list">
            {users.map((user) => (
              <div
                className="user-list-item"
                onClick={() => handleUserClick(user)}
                key={user._id}
              >
                <div class="user-container">
                  <p class="user-name">{user.username}</p>
                  <p class="user-email">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
          {selectedUser && (
            <div className="user-pins-container">
              <div className="user-pins-header">
                {selectedUser.username}: {filteredPins.length} pins
                <button
                  className="button menu-close-button"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
              <div className="user-pins-list">
                {filteredPins.map((p) => (
                  <div
                    className="user-pin-item"
                    onClick={() => handlePinClick(p)}
                    key={p._id}
                  >
                    <p>{p.title}</p>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
