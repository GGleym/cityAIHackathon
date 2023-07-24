import BeatLoader from "react-spinners/BeatLoader";
import styles from '../../styles/map/Map.module.css'

export const MapLoader = (props) => {
    return (
        <div className={styles.mapLoaderWrapper}>
            <BeatLoader
                loading={props.loading}
                color={"black"}
                size={20}
                aria-label={"Loading map..."}
                data-testid={"loader"}
            />
        </div>
    )
}