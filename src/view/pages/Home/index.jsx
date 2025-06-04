// src/view/pages/Home/index.jsx

import React from "react";
import { FaChartBar, FaBookOpen, FaPenNib, FaUsers, FaCog } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeCard from "../../components/Home/HomeCard";
import styles from "./style.module.css";

const features = [
  "Learning Management & Task Tracking",
  "Certified Summaries Library",
  "Academic Writing Assistant",
  "Social Interaction & Collaboration"
];

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <section className={styles.wrapper}>
      {/* HERO */}
      <header className={styles.hero}>
        <h1 className={styles.heading}>StudyBuddy</h1>
        <p className={styles.tagline}>
          Everything you need for smarter studying – in one place
        </p>
        <ul className={styles.featureList}>
          {features.map((t, i) => (
            <li key={i}>
              <span className={styles.dot}></span>
              {t}
            </li>
          ))}
        </ul>
        {/* כפתור התנתקות */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: 24,
            background: "#7b5cf0",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 32px",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1rem"
          }}
        >
          התנתקות
        </button>
      </header>

      {/* GRID OF CARDS */}
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
    </section>
  );
}