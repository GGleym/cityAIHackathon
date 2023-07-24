import styles from '/styles/panel/Panel.module.css';
import { useState } from 'react';
import Select from 'react-select';
import { PanelSheet } from '../../components/panelSheets/PanelSheet';

const Panel = () => {
  const [value, setValue] = useState(null);

  const mockOptions = [
    {
      value: 'hello',
      label: 'hello'
    }
  ];

  const handleClick = e => {
    e.preventDefault();
    //setData(filteredData)
  };

  return (
    <div className={styles.panelWrapper}>
      <div className={styles.headerPanel}>
        <h2>Обзорная панель</h2>
        <p>
          Здесь вы сможете увидеть общую информацию о системе мониторинга и
          основные показатели, такие как количество проанализированных городов,
          областей, районов и другую сводную информацию.
        </p>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder={'Введите город, который хотите найти'}
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <button className={styles.btnChecked} onClick={handleClick}>
            <div className={styles.btnBox}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 7.30435C0 3.27027 3.27027 0 7.30435 0C11.3384 0 14.6087 3.27027 14.6087 7.30435C14.6087 9.13361 13.9363 10.8058 12.8251 12.0873L15.8472 15.1093C16.0509 15.3131 16.0509 15.6434 15.8472 15.8472C15.6434 16.0509 15.3131 16.0509 15.1093 15.8472L12.0873 12.8251C10.8058 13.9363 9.13361 14.6087 7.30435 14.6087C3.27027 14.6087 0 11.3384 0 7.30435ZM7.30435 1.04348C3.84657 1.04348 1.04348 3.84657 1.04348 7.30435C1.04348 10.7621 3.84657 13.5652 7.30435 13.5652C10.7621 13.5652 13.5652 10.7621 13.5652 7.30435C13.5652 3.84657 10.7621 1.04348 7.30435 1.04348Z"
                  fill="white"
                />
              </svg>
              <span>Найти</span>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.settingsPanel}>
        <Select
          placeholder={'Выбрать область'}
          options={mockOptions}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: '1px solid #364AF6',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#364AF6'
              }
            })
          }}
        />
        <Select
          placeholder={'Выбрать область'}
          options={mockOptions}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              border: '1px solid #364AF6',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#364AF6'
              }
            })
          }}
        />
      </div>
      <div className={styles.sectionsPanel}>
        {
          //data.map(() => {<PanelSheet props/>})
        }
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
        <PanelSheet />
      </div>
    </div>
  );
};

export default Panel;
