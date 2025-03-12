import { FC, useState, useEffect } from 'react';
import { tariffs } from '@/data/constants';
import TariffCard from './TariffCard/TariffCard';
import { useAppSelector } from '@/redux/hooks';

import styles from './Tariffs.module.scss';

const Tariffs: FC = () => {
  const [activeTariff, setActiveTariff] = useState<string | null>(null);
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  useEffect(() => {
    setActiveTariff('Beginner');
  }, []);

  return (
    <section className={styles.tariffs}>
      <h2 className={styles.heading}>Наши тарифы</h2>
      {isAuthorized ? (
        <div className={styles.tariffsWrapper}>
          {tariffs.map((tariff, index) => (
            <TariffCard key={index}
              tariff={tariff}
              isActive={activeTariff === tariff.name} />
          ))}
        </div>
      ) : (<div className={styles.tariffsWrapper}>
        {tariffs.map((tariff, index) => (
          <TariffCard key={index}
            tariff={tariff}
            isActive={activeTariff === null} />
        ))}
      </div>
      )}

    </section>
  );
};

export default Tariffs;
