import styles from '/styles/panel/Panel.module.css';

export const PanelSheet = ({cityName, numberOfPeople, area}) => {
  return (
      <div className={styles.gridItemPanel}>
        <div>
          <h3>Название города</h3>
          <p>{cityName}</p>
        </div>
        <div className={styles.descriptionOfCity}>
          <span>Описание</span>
        </div>
        <div className={styles.infoOfCity}>
          <p>
            <strong>Население: </strong> {numberOfPeople} ч.
          </p>
          <p>
            <strong>Площадь: </strong> {area} км<sup>2</sup>
          </p>
        </div>
      </div>
  )
};