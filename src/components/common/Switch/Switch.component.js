import React from "react";
import styles from "./Switch.module.sass";
import cn from 'classnames';

export const Switch = ({isChecked, onClick, id, className = ""}) => {
  return (
    <div className={`${className}`}>
      <input
        checked={isChecked}
        onClick={onClick}
        type="checkbox"
        id={id + "Switch"}
        className={styles.checkbox}
      />
      <label
        className={cn(styles.label, {
            "bg-emerald-100": isChecked
        })}
        htmlFor={id + "Switch"}
      >
        <span className={styles.button} />
      </label>
    </div>
  );
};