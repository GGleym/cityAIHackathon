import styles from '/styles/office/Office.module.css'

export const ButtonSection = (props) => {
    return (
        <div className={styles.buttonSection}>
            <button onClick={props.saveBtnClick}>Сохранить</button>
            <button onClick={props.cancelBtnClick}>Отмена</button>
        </div>
    )
}