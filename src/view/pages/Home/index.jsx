import React from "react";
import { FaChartBar, FaBookOpen, FaPenNib, FaUsers, FaCog } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/Common/PageHeader";
import HomeCard from "../../components/Home/HomeCard";
import styles from "./style.module.css";

export default function Home() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      <PageHeader
        title="Welcome to StudyBuddy"
        subtitle="Everything you need for smarter studying – in one place"
      />

      <section className={styles.wrapper}>

        <div className={styles.grid}>
          <HomeCard
            to="/tasks"
            icon={<FaChartBar />}
            title="Learning & Tasks"
            subtitle="Manage personal & group work"
          />
          <HomeCard
            to="/summaries"
            icon={<FaBookOpen />}
            title="Summaries Library"
            subtitle="Find & share course notes"
          />
          <HomeCard
            to="/writing-assistant"
            icon={<FaPenNib />}
            title="Writing Assistant"
            subtitle="Templates & AI feedback"
          />
          <HomeCard
            to="/social-hub"
            icon={<FaUsers />}
            title="Social Hub"
            subtitle="Collaborate with peers"
          />
          <HomeCard
            to="/help-settings"
            icon={<FaCog />}
            title="Help & Settings"
            subtitle="FAQ, profile & preferences"
            fullWidth
          />
        </div>

        <div className={styles.logoutContainer}>
            <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
            </button>
        </div>
      </section>
    </>
  );
}