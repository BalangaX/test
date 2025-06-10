import React from "react";
import styles from "./SubmitButton.module.css";

export default function SubmitButton({ onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      Submit
    </button>
  );
}