import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';
import Layout from '../../components/layout';
import './index.scss';
import PulseLoader from '../../components/pulse-loader';
import { fetchProjectFromAPI } from '../../api/work';
import ArrowRightIcon from '../../icons/arrow-right';
import Description from '../../components/description';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

function Project() {
  const [data, setData] = useState<any>(null);

  const { isBurgerMenuOpen } = useAppContext();
  const { t } = useTranslation();

  const location = useLocation();
  const { id } = location.state || {};

  const match = useMatch('/:lang/work/:idparam');
  const { idparam } = match?.params || {};

  const fetchData = useCallback(async () => {
    if (id || idparam) {
      const response = await fetchProjectFromAPI(id || idparam);
      setData(response);
    }
  }, [id, idparam]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      {!data && <PulseLoader />}
      <div className={`${isBurgerMenuOpen ? 'project-container-no-height' : 'project-container'}`}>
        <h1 className="project-title">{data?.title}</h1>
        <div className="project-url-container">
          {data?.url?.map((url: string, index: number) => (
            <div key={`${index}-${url}`} className="project-url-info">
              <div className="project-url-text">{t('GO_TO')}</div>
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
