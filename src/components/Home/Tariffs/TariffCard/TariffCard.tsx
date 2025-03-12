import { FC } from 'react';
import clsx from 'clsx';

import styles from './TariffCard.module.scss';
import { TariffCardProps } from '@/interfaces/tariff.card.interface';



const TariffCard: FC<TariffCardProps> = ({ tariff, isActive }) => {
  const borderColorClass = isActive ? styles[`${tariff.color}Border`] : '';
  const backgroundColorClass = styles[`${tariff.color}Background`];
  const textColorClass = tariff.color === 'black' ? styles.whiteText : '';

  return (
    <article className={clsx(styles.tariffCard, borderColorClass)}>
      <div className={clsx(styles.titleBlock, backgroundColorClass)}>
        <div className={clsx(styles.titleWrapper, textColorClass)}>
          <h3 className={styles.title}>{tariff.name}</h3>
          <p className={styles.text}>{tariff.description}</p>
        </div>
        <img className={styles.icon} src={tariff.icon} alt={tariff.alt} />
      </div>
      <div className={styles.infoBlock}>
        {isActive && <p className={styles.currentTariff}>Текущий тариф</p>}
        <div className={styles.priceWrapper}>
          <p className={styles.currentPrice}>
            {tariff.currentPrice} &#x20bd;
            <span className={styles.oldPrice}>{tariff.oldPrice} &#x20bd;</span>
          </p>
          <p className={styles.text}>{tariff.discountDescription}</p>
        </div>
        <div className={styles.descriptionWrapper}>
          <h4 className={styles.descriptionHeading}>В тариф входит:</h4>
          <ul className={styles.descriptionList}>
            {tariff.included.map((item, index) => (
              <li className={styles.descriptionItem} key={index}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className={styles.tariffBtn} disabled={isActive}>
        {isActive ? 'Перейти в личный кабинет' : 'Подробнее'}
      </button>
    </article>
  );
};

export default TariffCard;
