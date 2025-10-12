import { useState, useEffect } from "react";
import Layout from "../common/Layout";
import ApiService from "../../service/ApiService";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {

      try {
        const userData = await ApiService.getLoggedInUserInfo();
        setUser(userData);
      } catch (error) {
        showMessage(error.response?.data?.message || "Failed to get user: " + error.message);
      }
      
    }

    fetchUserInfo();
  }, [])

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  return (
    <Layout>

      {message && <div className="message">{message}</div>}

      <div className="profile-page">
        {user && (
          <div className="profile-card">
            
            <h1>Welcome back, {user.name} 😊</h1>
            <div className="profile-info">

              <div className="profile-item">
                <label>Name</label>
                <span>{user.name}</span>
              </div>

              <div className="profile-item">
                <label>Email</label>
                <span>{user.email}</span>
              </div>

              <div className="profile-item">
                <label>Phone Number</label>
                <span>{user.phoneNumber}</span>
              </div>

              <div className="profile-item">
                <label>Role</label>
                <span>{user.role}</span>
              </div>
            </div>

          </div>
        )}
      </div>

    </Layout>
  );

}

export default ProfilePage;