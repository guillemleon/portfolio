import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import DummyList from '../../components/dummy-list';
import DummyDots from '../../components/dummy-dots';

const CARD_WIDTH = 270 + 20;

function Work() {
  const [data, setData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPreloadedImages, setIsPreloadedImages] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [startX, setStartX] = useState(null);

  const { t } = useTranslation();
  const currentLang = useCurrentLang();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const response = await fetchWorkFromAPI();
    setData(response);
  }, []);

  const currentItem = useMemo(() => {
    if (data) {
      return data[currentIndex];
    }

    return null;
  }, [currentIndex, data]);

  const isAllReady = useMemo(() => {
    return !!data && isPreloadedImages;
  }, [isPreloadedImages, data]);

  const onDirectionalClick = useCallback(
    (direction: string) => {
      if (isAllReady) {
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
          navigateToProject(currentItem?.id);
        }
      }
    },
    [data, currentIndex, currentItem, isAllReady]
  );

  const handleTouchStart = useCallback((e: any) => {
    setStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e: any) => {
      if (isAllReady) {
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
      }
    },
    [startX, onDirectionalClick, setStartX, isAllReady]
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const imageUrls: string[] = data.map((item: any) => item.image);
      preloadImages(imageUrls).finally(() => {
        setIsPreloadedImages(true);
        setTimeout(() => {
          setIsLoaderVisible(false);
        }, 200);
      });
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
    (id: number) => {
      if (isAllReady) {
        navigate(`/${currentLang}/work/${id}`, {
          state: { id },
        });
      }
    },
    [currentLang, navigate, currentIndex, data, isAllReady]
  );

  return (
    <Layout>
      {isLoaderVisible && <PulseLoader />}
      <div className="work-background-image-container">
        {isAllReady && <FadeBackground image={currentItem?.image} />}
      </div>
      <div className="work-container">
        <h1 className="work-title">{currentItem?.title}</h1>
        <div className="work-list-container">
          <div className="work-list-buttons-container">
            <Link
              className={
                isAllReady ? 'work-list-navigation-button' : 'dummy-work-list-navigation-button'
              }
              to={`/${currentLang}/work/${currentItem?.id}`}
              state={{ id: currentItem?.id }}
            >
              <div className="work-list-navigation-button-text">{`${t('SEE_MORE')}`}</div>{' '}
              <ArrowRightIcon width={20} />
            </Link>
            <button
              className="work-list-directional-button"
              disabled={currentIndex === 0 || !isAllReady}
              onClick={() => onDirectionalClick('ArrowLeft')}
            >
              <ArrowLeftIcon width={20} />
            </button>
            <button
              className="work-list-directional-button"
              disabled={currentIndex === data?.length - 1 || !isAllReady}
              onClick={() => onDirectionalClick('ArrowRight')}
            >
              <ArrowRightIcon width={20} />
            </button>
          </div>
          {!isAllReady ? (
            <DummyList length={8} />
          ) : (
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
                  onClick={() => navigateToProject(item.id)}
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
          )}
          {isAllReady ? (
            <div className="dot-container">
              {data?.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`dot ${currentIndex === index ? 'dot-selected' : ''}`}
                ></div>
              ))}
            </div>
          ) : (
            <DummyDots length={7} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Work;
