import styles from '/styles/office/Office.module.css';

export const ShowMoreButton = ({ onClick, svgStatus, text }) => {
  return (
    <button className={styles.showMoreBtn} onClick={onClick}>
      <div className={styles.textBtn}>
          {
              svgStatus ? (
                  <p>{text}</p>
              ) : (
                  <p>{text}</p>
              )
          }
        {svgStatus ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1069FF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.043 9.00004L6.25009 14.7929C5.9351 15.1079 6.15819 15.6465 6.60364 15.6465L18.1894 15.6465C18.6349 15.6465 18.858 15.1079 18.543 14.7929L12.7501 9.00004C12.5548 8.80478 12.2382 8.80477 12.043 9.00004Z"
              fill="#212121"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#1069FF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.043 15L6.25009 9.20707C5.9351 8.89209 6.15819 8.35352 6.60364 8.35352L18.1894 8.35352C18.6349 8.35352 18.858 8.89209 18.543 9.20707L12.7501 15C12.5548 15.1952 12.2382 15.1952 12.043 15Z"
              fill="#212121"
            />
          </svg>
        )}
      </div>
    </button>
  );
};
