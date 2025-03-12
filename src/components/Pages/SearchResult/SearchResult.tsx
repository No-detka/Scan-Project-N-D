import { FC, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import Layout from '../../Layout/Layout';
import Loader from '@/components/UI/Loader/Loader';
import DocumentCard from './DocumentCard/DocumentCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Navigation, Keyboard } from 'swiper/modules';
import { OverviewData } from '@/interfaces/data.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {resetData,resetArticles,fetchOverviewData, fetchDocumentsIds,fetchArticles,mergedArticles,} from '@/redux/dataSlice';
import { variantsArray } from '@/data/constants';
import { normalizeCountText, formatDate } from '@/utils/supportFunctions';
import 'swiper/css';
import styles from './SearchResult.module.scss';

const SearchResult: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const overviewData = useAppSelector((state) => state.data.overviewData);
  const idList = useAppSelector((state) => state.data.ids);
  const articles = useAppSelector((state) => state.data.articles);
  const { data } = location.state;
  const { overviewIsLoading, idsAreLoading, articlesAreLoading } = useAppSelector(
    (state) => state.data
  );
  const variantsCount = useMemo(() => {
    return overviewData.reduce((acc: number, item: OverviewData) => acc + item.documentsCount, 0);
  }, [overviewData]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isButtonDisplayed, setIsButtonDisplayed] = useState<boolean>(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState<boolean>(false);

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(overviewData.length <= 8);
  const [isBigLoader, setIsBigLoader] = useState<boolean>(true);

  const handleSwiper = (swiper: SwiperClass) => {
    setSwiperInstance(swiper);
  };

  const handleSlideChange = () => {
    if (!swiperInstance) return;

    setIsPrevDisabled(swiperInstance.isBeginning);
    setIsNextDisabled(swiperInstance.isEnd);
  };

  const handleLoadMore = () => {
    const updatedIndex = currentIndex + 10;
    const updatedList = idList.slice(currentIndex, updatedIndex);

    if (updatedList.length === 0) {
      setIsButtonDisplayed(false);
      return;
    }

    dispatch(mergedArticles());

    dispatch(fetchArticles({ ids: updatedList }));

    setCurrentIndex(updatedIndex);

    if (updatedList.length < 10) setIsButtonDisplayed(false);
  };

  useEffect(() => {
    dispatch(resetData());
    setIsLoadingComplete(false);
    Promise.all([dispatch(fetchOverviewData(data)), dispatch(fetchDocumentsIds(data))])
      .then(() => {
        setIsLoadingComplete(true);
      })
      .catch((error) => {
        console.log('Ошибка получения данных: ', error);
        setIsLoadingComplete(true);
      });
  }, [dispatch, data]);

  useEffect(() => {
    if (!idsAreLoading && !overviewIsLoading && isLoadingComplete) {
      if (idList.length > 0) {
        if (idList.length <= 10) {
          dispatch(fetchArticles({ ids: idList }));
          setIsButtonDisplayed(false);
        } else {
          dispatch(fetchArticles({ ids: idList.slice(0, 10) }));
          setCurrentIndex(10);
          setIsButtonDisplayed(true);
        }
      } else {
        dispatch(resetArticles());
      }
    }
  }, [dispatch, idList, idsAreLoading, overviewIsLoading, isLoadingComplete]);

  useEffect(() => {
    const handleResize = () => {
      setIsBigLoader(window.innerWidth > 525);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
      <div className="container">
        <section className={styles.resultWelcome}>
          <div className={styles.headingContainer}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Ищем. Скоро будут результаты</h1>
              <p className={styles.text}>
                Поиск может занять некоторое время, просим сохранять терпение.
              </p>
            </div>
            <div className={styles.imgWrapper}>
              <img
                src="./searchResultImg.svg"
                alt="The girl with the glass"
                className={styles.img}
              />
            </div>
          </div>
        </section>
        <section className={styles.resultSlider}>
          <h2 className={styles.heading}>Общая сводка</h2>
          <p className={styles.text}>
            Найдено {`${variantsCount} ${normalizeCountText(variantsCount, variantsArray)}`}
          </p>
          <div className={styles.swiperWrapper}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>Период</h3>
              <h3 className={styles.title}>Всего</h3>
              <h3 className={styles.title}>Риски</h3>
            </div>
            {overviewIsLoading ? (
              <Loader bigLoad={isBigLoader} />
            ) : !overviewData || overviewData.length === 0 ? (
              <p className={styles.textNoData}>Данные не найдены</p>
            ) : (
              <Swiper
                modules={[Navigation, Keyboard]}
                slidesPerView={Math.min(overviewData.length, 8)}
                spaceBetween={10}
                keyboard={{
                  enabled: true,
                }}
                navigation={{
                  prevEl: `.${styles.btnPrev}`,
                  nextEl: `.${styles.btnNext}`,
                  enabled: true,
                  hideOnClick: false,
                }}
                onInit={handleSwiper}
                onSlideChange={handleSlideChange}
                breakpoints={{
                  0: {
                    slidesPerView: Math.min(overviewData.length, 1),
                    spaceBetween: 42,
                  },
                  526: {
                    slidesPerView: Math.min(overviewData.length, 2),
                  },
                  768: {
                    slidesPerView: Math.min(overviewData.length, 4),
                  },
                  1063: {
                    slidesPerView: Math.min(overviewData.length, 6),
                  },
                  1370: {
                    slidesPerView: Math.min(overviewData.length, 8),
                  },
                }}
                className={styles.swiper}
              >
                {overviewData.map((item, index) => (
                  <SwiperSlide key={index} className={styles.resultCard}>
                    <p className={styles.text}>{formatDate(item.date)}</p>
                    <p className={styles.text}>{item.documentsCount}</p>
                    <p className={styles.text}>{item.riskCount}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <button
              className={clsx(styles.navBtn, styles.btnPrev)}
              disabled={isPrevDisabled}
            ></button>
            <button
              className={clsx(styles.navBtn, styles.btnNext)}
              disabled={isNextDisabled}
            ></button>
          </div>
        </section>
        <section className={styles.resultDocuments}>
          <h2 className={styles.heading}>Список документов</h2>
          <div className={styles.documentsWrapper}>
            {isLoadingComplete &&
              articles.map((article, index) => <DocumentCard key={index} data={article} />)}
          </div>
          {articlesAreLoading && <Loader bigLoad={true} />}
          {isButtonDisplayed && !articlesAreLoading && articles.length > 0 && (
            <button className={styles.btnLoadMore} onClick={handleLoadMore}>
              Показать больше
            </button>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default SearchResult;
