import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatternFormat, NumberFormatValues } from 'react-number-format';
import { ru } from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';

import { validateInnNumber } from '@/utils/validateFunctions';
import { formRequestData } from '@/utils/supportFunctions';
import { useAppDispatch } from '@/redux/hooks';
import { checkUserAuthorization } from '@/redux/userSlice';
import { ErrorStates } from '@/interfaces/general.interfaces';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './SearchForm.module.scss';

const SearchForm: FC = () => {
  const [inn, setInn] = useState<string>('');
  const [innIsValid, setInnIsValid] = useState<boolean>(false);
  const [documentsCountIsValid, setDocumentsCountIsValid] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);
  const [datesAreValid, setDatesAreValid] = useState<boolean>(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [errorStates, setErrorStates] = useState<ErrorStates>({
    inn: { error: false, message: '' },
    documentsCount: { error: false, message: '' },
    dates: { error: false, message: '' },
  });
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const updateErrorState = (field: keyof ErrorStates, isValid: boolean, message = 'Введите корректные данные') => {
    setErrorStates((prevState) => ({
      ...prevState,
      [field]: {
        error: !isValid,
        message: isValid ? '' : message,
      },
    }));
  };

  const validateInn = (value: string) => {
    const isValid = validateInnNumber(value);
    setInnIsValid(isValid);
    updateErrorState('inn', isValid);
  };

  const validDocCount = (value: string) => {
    const isValid = parseInt(value) > 0 && parseInt(value) <= 1000;
    setDocumentsCountIsValid(isValid);
    updateErrorState('documentsCount', isValid);
  };

  const validDates = (startDate: Date | null, endDate: Date | null) => {
    const currentDate = new Date();
    const isValid = startDate && endDate ? startDate <= endDate && endDate <= currentDate : false;
    setDatesAreValid(isValid);
    updateErrorState('dates', isValid);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(checkUserAuthorization());
    const formData = new FormData(e.currentTarget);
    const data = formRequestData(formData, startDate, endDate, inn);
    navigate('/result', { state: { data } });
  };

  const handleInnChange = (values: NumberFormatValues) => {
    const { value } = values;
    setInn(value);
    validateInn(value);
  };

  const handleDocCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    validDocCount(value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate) validDates(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (startDate) validDates(startDate, date);
  };

  useEffect(() => {
    setFormIsValid(innIsValid && documentsCountIsValid && datesAreValid);
  }, [innIsValid, documentsCountIsValid, datesAreValid]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor="inn" className={styles.label}>
            ИНН компании{' '}
            <span className={clsx({ [styles.errorMarker]: errorStates.inn.error })}>*</span>
          </label>
          <PatternFormat
            className={clsx(styles.input, { [styles.errorInput]: errorStates.inn.error })}
            format="## ### ### ##"
            type="text"
            name="inn"
            id="inn"
            placeholder="10 цифр"
            onValueChange={(values) => handleInnChange(values)}
            required
          />
          <span className={styles.errorMsg}>{errorStates.inn.message}</span>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="tonality" className={styles.label}>
            Тональность
          </label>
          <select className={`${styles.input} ${styles.select}`} name="tonality" id="tonality">
            <option value="any">Любая</option>
            <option value="negative">Негативная</option>
            <option value="positive">Положительная</option>
          </select>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="documentsCount" className={styles.label}>
            Количество документов в выдаче{' '}
            <span className={clsx({ [styles.errorMarker]: errorStates.documentsCount.error })}>
              *
            </span>
          </label>
          <input
            className={clsx(styles.input, {
              [styles.errorInput]: errorStates.documentsCount.error,
            })}
            type="text"
            name="documentsCount"
            id="documentsCount"
            placeholder="от 1 до 1000"
            onChange={handleDocCountChange}
          />
          <span className={styles.errorMsg}>{errorStates.documentsCount.message}</span>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="startDate" className={styles.label}>
            Диапозон поиска{' '}
            <span className={clsx({ [styles.errorMarker]: errorStates.dates.error })}>*</span>
          </label>
          <div className={styles.datePickerWrapper}>
            <DatePicker
              className={clsx(styles.datePicker, {
                [styles.errorDatePicker]: errorStates.dates.error,
              })}
              name="startDate"
              id="startDate"
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={(date) => handleStartDateChange(date)}
              selectsStart
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              placeholderText="Дата начала"
              locale={ru}
            />
            <DatePicker
              className={clsx(styles.datePicker, {
                [styles.errorDatePicker]: errorStates.dates.error,
              })}
              name="endDate"
              id="endDate"
              dateFormat="yyyy-MM-dd"
              selected={endDate}
              onChange={(date) => handleEndDateChange(date)}
              selectsEnd
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              minDate={startDate ?? undefined}
              placeholderText="Дата конца"
              locale={ru}
            />
          </div>
          <span className={styles.errorMsg}>{errorStates.dates.message}</span>
        </div>
      </div>
      <div className={styles.checkboxContainer}>
        <ul className={styles.checkboxList}>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="fullness"
              id="fullness" />
            <label htmlFor="fullness" className={styles.label}>
              Признак максимальной полноты
            </label>
          </li>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="context"
              id="context" />
            <label htmlFor="context" className={styles.label}>
              Упоминания в бизнес-контексте
            </label>
          </li>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="role"
              id="role" />
            <label htmlFor="role" className={styles.label}>
              Главная роль в публикации
            </label>
          </li>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="riskFactors"
              id="riskFactors"
            />
            <label htmlFor="riskFactors" className={styles.label}>
              Публикации только с риск-факторами
            </label>
          </li>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="techNews"
              id="techNews" />
            <label htmlFor="techNews" className={styles.label}>
              Включать технические новости рынков
            </label>
          </li>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="announcements"
              id="announcements"
            />
            <label htmlFor="announcements" className={styles.label}>
              Включать анонсы и календари
            </label>
          </li>
          <li className={styles.checkboxItem}>
            <input
              className={styles.checkbox}
              type="checkbox"
              name="digests"
              id="digests" />
            <label htmlFor="digests" className={styles.label}>
              Включать сводки новостей
            </label>
          </li>
        </ul>
        <div className={styles.btnWrapper}>
          <button className={styles.submitBtn} type="submit" disabled={!formIsValid}>
            Поиск
          </button>
          <span className={styles.requiredFields}>* Обязательные к заполнению поля</span>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
