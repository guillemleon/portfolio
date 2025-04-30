import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { useTranslation } from 'react-i18next';
import './index.scss';
import { fetchWorkFromAPI } from '../../api/work';
import FadeBackground from '../../components/fade-background';
import { preloadImages } from '../../utils/preloadImages';
import PulseLoader from '../../components/pulse-loader';
import ArrowRightIcon from '../../icons/arrow-right';
import ArrowLeftIcon from '../../icons/arrow-left';
import { Link, useNavigate } from 'react-router-dom';
import useCurrentLang from '../../hooks/useCurrentLang';

const CARD_WIDTH = 270 + 20;

function Work() {
  const [data, setData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPreloadedImages, setIsPreloadedImages] = useState(false);
  const [startX, setStartX] = useState(null);

  const { t } = useTranslation();
  const currentLang = useCurrentLang();
  const navigate = useNavigate();

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
      if (direction === 'Enter' && data?.length > 0 && currentIndex >= 0) {
        navigateToProject(data[currentIndex]?.id, data[currentIndex]?.title);
      }
    },
    [data, currentIndex]
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

  const navigateToProject = useCallback(
    (id: number, title: string) => {
      navigate(`/${currentLang}/work/${id}_${title}`, {
        state: { id },
      });
    },
    [currentLang, navigate, currentIndex, data]
  );

  if (!data) {
    return (
      <Layout>
        <PulseLoader />;
      </Layout>
    );
  }

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
                <Link
                  className="work-list-navigation-button"
                  to={`/${currentLang}/work/${data[currentIndex]?.id}_${data[currentIndex]?.title}`}
                  state={{ id: data[currentIndex]?.id }}
                >
                  <div className="work-list-navigation-button-text">{`${t('SEE_MORE')}`}</div>{' '}
                  <ArrowRightIcon width={20} />
                </Link>
                <button
                  className="work-list-directional-button"
                  disabled={currentIndex === 0}
                  onClick={() => onDirectionalClick('ArrowLeft')}
                >
                  <ArrowLeftIcon width={20} />
                </button>
                <button
                  className="work-list-directional-button"
                  disabled={currentIndex === data?.length - 1}
                  onClick={() => onDirectionalClick('ArrowRight')}
                >
                  <ArrowRightIcon width={20} />
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
                    onClick={() => navigateToProject(item.id, item.title)}
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
