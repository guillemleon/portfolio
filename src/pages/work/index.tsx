import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { fetchWorkFromAPI } from '../../api/work';
import FadeBackground from '../../components/fade-background';
import { preloadImages } from '../../utils/preloadImages';

const CARD_WIDTH = 270 + 20;

function Work() {
  const [data, setData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPreloadedImages, setIsPreloadedImages] = useState(false);
  const [startX, setStartX] = useState(null);

  const { t } = useTranslation();

  const fetchData = useCallback(async () => {
    const response = await fetchWorkFromAPI();
    setData(response);
  }, []);

  const onDirectionalClick = useCallback(
    (direction: string) => {
      setCurrentIndex((prevState) => {
        if (direction === 'ArrowLeft' && prevState > 0) {
          setTranslateX((tx) => tx + CARD_WIDTH);
          return prevState - 1;
        }
        if (direction === 'ArrowRight' && prevState < data.length - 1) {
          setTranslateX((tx) => tx - CARD_WIDTH);
          return prevState + 1;
        }
        return prevState;
      });
    },
    [data]
  );

  const handleTouchStart = (e: any) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    if (startX === null) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        onDirectionalClick('ArrowLeft');
      } else {
        onDirectionalClick('ArrowRight');
      }
      setStartX(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const imageUrls: string[] = data.map((item: any) => item.image);
      preloadImages(imageUrls).finally(() => setIsPreloadedImages(true));
    }
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => onDirectionalClick(e.key);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDirectionalClick]);

  return (
    <Layout>
      <div className="work-background-image-container">
        {!!data && <FadeBackground image={data[currentIndex]?.image} />}
      </div>
      <div className="work-container">
        {isPreloadedImages && (
          <>
            <h1 className="work-title">{data[currentIndex]?.title}</h1>
            <div className="work-list-container">
              <div className="work-list-buttons-container">
                <button className="work-list-navigation-button">{t('WIP_TITLE')}</button>
                <button
                  className="work-list-directional-button"
                  disabled={currentIndex === 0}
                  onClick={() => onDirectionalClick('ArrowLeft')}
                >
                  {'<'}
                </button>
                <button
                  className="work-list-directional-button"
                  disabled={currentIndex === data?.length - 1}
                  onClick={() => onDirectionalClick('ArrowRight')}
                >
                  {'>'}
                </button>
              </div>
              <ul
                className="work-list"
                style={{
                  transform: `translateX(${translateX}px)`,
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {data?.map((item: any, index: number) => (
                  <li
                    key={item.id}
                    className={`
                      work-list-item
                      ${index === currentIndex ? 'work-list-item-focused' : ''}
                      ${currentIndex > index ? 'work-list-item-dimmed' : ''}  
                    `}
                  >
                    {item?.image_card ? (
                      <img src={item.image_card} className="work-item-image" />
                    ) : (
                      <h2>{item.title}</h2>
                    )}
                  </li>
                ))}
              </ul>
              <div className="dot-container">
                {data?.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`dot ${currentIndex === index ? 'dot-selected' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Work;
