import React from "react";
import styles from "./Switch.module.sass";
import cn from 'classnames';

export const Switch = ({isChecked = false, onChange, className = ""}) => {
  return (
    <div className={`${className}`}>
      <input
        checked={isChecked}
        onChange={onChange}
        type="checkbox"
        id={"react-switch-new"}
        className={styles.checkbox}
      />
      <label
        className={cn(styles.label, {
            "bg-emerald-100": isChecked
        })}
        htmlFor={"react-switch-new"}
      >
        <span className={styles.button} />
      </label>
    </div>
  );
};
