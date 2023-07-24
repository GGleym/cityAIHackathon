import styles from '/styles/office/Office.module.css';
import { DataIcon } from '../../public/DataIcon';
import { InputType } from '../../components/officePage/InputType';
import { useEffect, useState } from 'react';
import { ShowMoreButton } from '../../components/officePage/ShowMoreButton';
import { useReducer } from 'react';
import {
  INITIAL_STATE,
  officeReducer,
  ACTIONS
} from '../../functions/officeFunctions/officeReducer';
import inputStyles from '/styles/Input.module.css';
import { formatNumber } from '../../functions/officeFunctions/formatNumber';
import { getFMS } from '../../functions/officeFunctions/getFMS';
import AsyncSelect from 'react-select/async';
import { formatDate } from '../../functions/officeFunctions/formatDate';
import { handleSeriesChange } from '../../functions/officeFunctions/handleSeriesChange';
import { handleNumberPassportChange } from '../../functions/officeFunctions/handleNumberPassportChange';
import { AgreeSection } from '../../components/officePage/AgreeSection';
import { ButtonSection } from '../../components/officePage/ButtonSection';

const Office = () => {
  const [more, setMore] = useState(null);
  const [state, dispatch] = useReducer(officeReducer, INITIAL_STATE);
  const [issuedBy, setIssuedBy] = useState(null);

  function handleChange(e) {
    dispatch({
      type: ACTIONS.CHANGE_INPUT,
      payload: {
        name: e.target.name,
        value: `${
          e.target.name === 'number'
            ? formatNumber(e.target.value)
            : e.target.value
        }`
      }
    });
  }

  console.log(state)

  const handleSubmit = () => {
    //something
  };

  return (
    <div className={styles.dataBoxWrapper}>
      <div className={styles.dataBox}>
        <div className={styles.dataHeader}>
          <DataIcon />
          <h3>Персональные данные</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.dataInputs}>
            <InputType
              className={inputStyles.inputBox}
              value={state.surname}
              onChange={handleChange}
              placeholder={'Фамилия'}
              name={'surname'}
              required={true}
              type={'text'}
            />
            <InputType
              className={inputStyles.inputBox}
              value={state.name}
              onChange={handleChange}
              placeholder={'Имя'}
              name={'name'}
              required={true}
              type={'text'}
            />
            <InputType
              value={state.patronymic}
              className={inputStyles.inputBox}
              onChange={handleChange}
              placeholder={'Отчество'}
              name={'patronymic'}
              required={true}
              type={'text'}
            />
            <InputType
              className={inputStyles.inputBox}
              value={state.number}
              onChange={handleChange}
              placeholder={'Номер телефона'}
              name={'number'}
              required={true}
              type={'text'}
              maxLength={state.number[0] === '+' ? 16 : 17}
            />
            <InputType
              className={inputStyles.inputBox}
              value={state.job}
              onChange={handleChange}
              placeholder={'Должность'}
              name={'job'}
              required={true}
              type={'text'}
            />
            <InputType
              value={state.email}
              className={inputStyles.inputBox}
              onChange={handleChange}
              placeholder={'E-mail'}
              name={'email'}
              required={true}
              type={'text'}
            />
          </div>
          {more ? (
            <>
              <div className={styles.checkboxDiv}>
                <h3>Пол: </h3>
                <input
                  type="radio"
                  id={'male'}
                  name={'gender'}
                  value={'male'}
                  onChange={handleChange}
                />
                <label htmlFor="male">Мужской</label>
                <input
                  type="radio"
                  id={'woman'}
                  name={'gender'}
                  value={'woman'}
                  onChange={handleChange}
                />
                <label htmlFor="woman">Женский</label>
              </div>
              <div className={styles.showMoreSection}>
                <InputType
                  className={inputStyles.inputBox}
                  value={state.seriesPassport}
                  onChange={e => {
                    handleSeriesChange(e);
                    handleChange(e);
                  }}
                  placeholder={'Серия паспорта'}
                  required={true}
                  type={'number'}
                  name={'seriesPassport'}
                />
                <InputType
                  className={inputStyles.inputBox}
                  value={state.numPassport}
                  onChange={e => {
                    handleNumberPassportChange(e);
                    handleChange(e);
                  }}
                  placeholder={'Номер паспорта'}
                  required={true}
                  type={'text'}
                  name={'numPassport'}
                />
                <InputType
                  value={state.birthday}
                  className={inputStyles.inputBox}
                  onChange={e => {
                    formatDate(e);
                    handleChange(e);
                  }}
                  placeholder={'Дата рождения'}
                  required={true}
                  type={'text'}
                  name={'birthday'}
                />
                <div
                  className={`${styles.issuedByInput} ${inputStyles.inputBox}`}
                >
                  <AsyncSelect
                    inputId={'select'}
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
                    loadingMessage={() => 'Загрузка...'}
                    cacheOptions
                    placeholder={''}
                    loadOptions={getFMS}
                    defaultOptions
                    onChange={e => {
                      setIssuedBy(e['value']);
                      state.issuedBy = e['value'];
                    }}
                    noOptionsMessage={() => 'Просто введите код подразделения!'}
                  />
                  <label
                    htmlFor="select"
                    className={`${
                      issuedBy
                        ? `${inputStyles.inputFilled} ${inputStyles.inputBox}`
                        : inputStyles.inputBox
                    }`}
                  >
                    Кем выдан?
                  </label>
                </div>
                <InputType
                  value={state.dateOfIssue}
                  className={inputStyles.inputBox}
                  onChange={e => {
                    formatDate(e);
                    handleChange(e);
                  }}
                  placeholder={'Дата выдачи'}
                  required={true}
                  type={'text'}
                  name={'dateOfIssue'}
                />
              </div>
              <ShowMoreButton
                text={'Скрыть дополнительные данные'}
                onClick={() => setMore(!more)}
                svgStatus={more}
              />
              <AgreeSection />
              <ButtonSection />
            </>
          ) : (
            <>
              <ShowMoreButton
                text={'Показать дополнительные данные'}
                onClick={() => setMore(!more)}
                svgStatus={more}
              />
              <AgreeSection />
              <ButtonSection />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Office;
