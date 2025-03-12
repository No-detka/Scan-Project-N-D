import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import clsx from 'clsx';

import { getRandomImage, formatDate, normalizeCountText, parceText, } from '@/utils/supportFunctions';
import { wordsArray } from '@/data/constants';

import styles from './DocumentCard.module.scss';
import { IDocumentCardProps, IRandomImage } from '@/interfaces/documentcard.interface';



const DocumentCard: FC<IDocumentCardProps> = ({ data }) => {
  const [randomImage, setRandomImage] = useState<IRandomImage>(() => getRandomImage());
  const { attributes, date, source, text, title, url } = data;
  const sanitizedText = DOMPurify.sanitize(text);
  const parsedText = parceText(sanitizedText);

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  return (
    <article className={styles.documentCard}>
      <div className={styles.infoContainer}>
        <p className={styles.date}>{formatDate(date)}</p>
        <a href="#" className={styles.link}>
          {source}
        </a>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.typesContainer}>
        {attributes.isDigest && <p className={clsx(styles.type, styles.turquoise)}>Дайджест</p>}
        {attributes.isAnnouncement && <p className={clsx(styles.type, styles.green)}>Анонс</p>}
        {attributes.isTechNews && (
          <p className={clsx(styles.type, styles.yellow)}>Технические новости</p>
        )}
      </div>
      <img src={randomImage.src} alt={randomImage.alt} className={styles.img} />
      <p className={styles.text} dangerouslySetInnerHTML={{ __html: parsedText }}></p>
      <div className={styles.additionalInfoContainer}>
        <Link to={url} target="_blank" className={styles.sourceLink}>
          Читать в источнике
        </Link>
        <p className={styles.wordCount}>{`${attributes.wordCount} ${normalizeCountText(
          attributes.wordCount,
          wordsArray
        )}`}</p>
      </div>
    </article>
  );
};

export default DocumentCard;
