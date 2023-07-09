import { useState } from 'react';
import styles from '/styles/panel/Panel.module.css';

export const PanelSheet = () => {
  const [checked, setChecked] = useState(null);

  return (
    <div
      className={
        checked ? `${styles.panelSheet} ${styles.checked}` : styles.panelSheet
      }
    >
      <div className={styles.panelSheetHeader}>
        {checked ? <p>Проверено</p> : <p>Не проверено</p>}
      </div>
      <div className={styles.panelSheetInfo}>
        <h3>г. Мурманск</h3>
        <p>
          <span>Оператор: </span>Аркадий Раскольников
        </p>
        <p>
          <span>Область: </span>Мурманская область
        </p>
      </div>
      <div className={styles.panelSheetSubmit}>
        <button
          onClick={(e) => {
            setChecked(true);
            e.preventDefault()
          }}
          className={
            checked
              ? `${styles.panelSheetBtn} ${styles.btnChecked}`
              : styles.panelSheetBtn
          }
        >
          <a href="#">Подробнее</a>
        </button>
      </div>
    </div>
  );
};