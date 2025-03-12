import { format } from 'date-fns';
import { articlesImg } from '@/data/constants';

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * articlesImg.length);
  return articlesImg[randomIndex];
};

export const getAccessToken = (): string | null => {
  const tokenData = localStorage.getItem('tokenData');
  if (tokenData) {
    const { accessToken } = JSON.parse(tokenData);
    return accessToken;
  }
  return null;
};

export const formatDate = (date: Date | string | null | undefined) =>
  date !== null && date !== undefined ? format(new Date(date), 'dd.MM.yyyy') : '';

export const formRequestData = (
  formData: FormData,
  startDate: Date | null,
  endDate: Date | null,
  inn: string
) => {
  return {
    issueDateInterval: {
      startDate: startDate,
      endDate: endDate,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            sparkId: null,
            entityId: null,
            inn: inn,
            maxFullness: formData.get('fullness') === 'on' ? true : false,
            inBusinessNews: formData.get('context') === 'on' ? true : false,
          },
        ],
        onlyMainRole: formData.get('role') === 'on' ? true : false,
        tonality: formData.get('tonality') as string,
        onlyWithRiskFactors: formData.get('riskFactors') === 'on' ? true : false,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: formData.get('techNews') === 'on' ? false : true,
      excludeAnnouncements: formData.get('announcements') === 'on' ? false : true,
      excludeDigests: formData.get('digests') === 'on' ? false : true,
    },
    similarMode: 'duplicates',
    limit: parseInt(formData.get('documentsCount') as string),
    sortType: 'sourceInfluence',
    sortDirectionType: 'asc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  };
};

export const normalizeCountText = (number: number, wordsArr: string[]) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const options = [2, 0, 1, 1, 1, 2];
    return wordsArr[
      number % 100 > 4 && number % 100 < 20 ? 2 : options[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return wordsArr[1];
};

export const parceText = (textData: string) => {
  const xml = textData;
  const div = document.createElement('div');
  div.innerHTML = xml;
  const text = div.textContent || div.innerText || '';

  return text.replace(/<\/*?["^"]*["^"]*[^>]*>(>|\$)/g, '');
};
