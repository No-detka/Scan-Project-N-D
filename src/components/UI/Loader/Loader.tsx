import { FC } from 'react';
import clsx from 'clsx';

import styles from './Loader.module.scss';

interface LoaderProps {
  bigLoad?: boolean;
}

const Loader: FC<LoaderProps> = ({ bigLoad = false }) => {
  return (
    <div className={styles.loader}>
      <img
        src="./loaderIcon.svg"
        alt="Loader"
        className={clsx(styles.loaderIcon, { [styles.loaderIconBig]: bigLoad })}
      />
      {bigLoad && <p className={styles.text}>Загружаем данные</p>}
    </div>
  );
};

export default Loader;
