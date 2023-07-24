import styles from '/styles/panel/Panel.module.css';

export const PanelSheet = () => {
  return (
      <div className={styles.gridItemPanel}>
        <div>
          <h3>Название города</h3>
          <p>Архангельск</p>
        </div>
        <div className={styles.descriptionOfCity}>
          <span>Описание</span>
        </div>
        <div className={styles.infoOfCity}>
          <p>
            <strong>Население: </strong> 000 ч.
          </p>
          <p>
            <strong>Площадь: </strong> 000 м<sup><small></small></sup>
          </p>
        </div>
      </div>
  )
};