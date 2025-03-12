import { FC } from 'react';
import SearchForm from '@/components/UI/SearchForm/SearchForm';
import Layout from '@/components/Layout/Layout';
import styles from './Search.module.scss';

const Search: FC = () => {
  return (
    <Layout>
      <section className={styles.searchForm}>
        <div className={styles.headingContainer}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Найдите необходимые данные в пару кликов.</h1>
            <p className={styles.text}>
              Задайте параметры поиска.
              <br />
              Чем больше заполните, тем точнее поиск
            </p>
          </div>
          <div className={styles.imgWrapper}>
            <img className={styles.documentIcon} src="./documentIcon.svg" alt="Document" />
            <img className={styles.foldersIcon} src="./foldersIcon.svg" alt="Folders" />
          </div>
        </div>
        <div className={styles.formContainer}>
          <SearchForm />
          <div className={styles.searchImgWrapper}>
            <img
              className={styles.searchImg}
              src="./searchBlockImg.svg"
              alt="A man with a magnifying glass"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Search;
