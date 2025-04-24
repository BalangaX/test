import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdOutlineEventNote, MdOutlineMenuBook } from "react-icons/md";
import { PiPenNibStraightDuotone } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import styles from "./style.module.css";

const icons = {
  tasks: <MdOutlineEventNote />,
  summaries: <MdOutlineMenuBook />,
  writing: <PiPenNibStraightDuotone />,
  social: <HiOutlineUsers />,
  settings: <FiSettings />,
};

export default function HomeCard({ to, type, title, subtitle }) {
  return (
    <IconContext.Provider value={{ size: "3rem" }}>
      <NavLink to={to} className={styles.card}>
        {icons[type]}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </NavLink>
    </IconContext.Provider>
  );
}