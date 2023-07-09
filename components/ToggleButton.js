import styles from '/styles/Toggle.module.css'
import {useReducer} from "react";
import {toggleReducer} from "../functions/toggleReducer";

export const ToggleButton = ({title}) => {
    const [state, dispatch] = useReducer(toggleReducer, {"сделай": "reducer"})

    const handleChange = () => {
        dispatch({

        })
    }

    return (
        <>
            <input type="checkbox" id={title} className={styles.toggleCheckbox} onChange={handleChange}/>
            <label htmlFor={title}></label>
        </>
    )
}