import { FC } from 'react';
import clsx from 'clsx';
import { advantSliderItems } from '@/data/constants';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard } from 'swiper/modules';

import 'swiper/scss';
import styles from './AdvantSlider.module.scss';

const AdvantSlider: FC = () => {
  return (
    <section className={styles.advantSlider}>
      <h2 className={styles.heading}>Почему именно мы</h2>
      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Navigation, Autoplay, Keyboard]}
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          keyboard={{
            enabled: true,
          }}
          navigation={{
            nextEl: `.${styles.btnNext}`,
            prevEl: `.${styles.btnPrev}`,
            enabled: true,
            hideOnClick: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            807: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1135: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className={styles.swiper}
        >
          {advantSliderItems.map((advant, index) => (
            <SwiperSlide key={index} className={styles.advantCard}>
              <div className={styles.advantDiv} >
                <img src={advant.img} alt={advant.alt} className={styles.advantImg} />
                <p className={styles.advantText}>{advant.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={clsx(styles.navBtn, styles.btnPrev)}
          aria-label="Previous slide"
        ></button>
        <button className={clsx(styles.navBtn, styles.btnNext)} aria-label="Next slide"></button>
      </div>
    </section>
  );
};

export default AdvantSlider;
