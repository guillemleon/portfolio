import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/layout';
import './index.scss';
import PulseLoader from '../../components/pulse-loader';
import { fetchProjectFromAPI } from '../../api/work';
import ArrowRightIcon from '../../icons/arrow-right';
import Description from '../../components/description';
import { useAppContext } from '../../context/AppContext';

function Project() {
  const [data, setData] = useState<any>(null);

  const { isBurgerMenuOpen } = useAppContext();
  const location = useLocation();
  const { id } = location.state || {};

  const fetchData = useCallback(async () => {
    if (id) {
      const response = await fetchProjectFromAPI(id);
      setData(response);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) {
    return (
      <Layout>
        <PulseLoader />;
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`${isBurgerMenuOpen ? 'project-container-no-height' : 'project-container'}`}>
        <h1 className="project-title">{data?.title}</h1>
        <div className="project-url-container">
          {data?.url?.map((url: string, index: number) => (
            <div key={`${index}-${url}`} className="project-url-info">
              <div className="project-url-text">{`_Go To`}</div>
              <div className="project-url-arrow-container">
                <ArrowRightIcon width={20} />
              </div>
              <Link className="project-url" to={url} target="_blank">{`${url}`}</Link>
            </div>
          ))}
        </div>
        <div className="project-image-container">
          <img src={data?.image} />
        </div>
        <Description text={data?.description} />
      </div>
    </Layout>
  );
}

export default Project;
