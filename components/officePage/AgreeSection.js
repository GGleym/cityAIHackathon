import styles from '/styles/office/Office.module.css'

export const AgreeSection = () => {
    return (
        <div className={styles.agreeBox}>
            <div>
                <input type="checkbox" id={"politics"}/>
                <label htmlFor={"politics"}>Ознакомлен c <a href="#">Политикой сбора персональных данных</a></label>
            </div>
            <div>
                <input type="checkbox" id={"personalData"}/>
                <label htmlFor={"personalData"}>Даю согласие на обработку <a href="#">персональных данных</a></label>
            </div>
        </div>
    )
}