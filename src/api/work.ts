import { projectParser, workParser } from './work-parser';

const fetchWorkFromAPI = async () => {
  try {
    const res = await fetch('https://back.guillemleon.com/api/projects/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const work = await res.json();
    return workParser(work);
  } catch (err) {
    console.error('Error trying GET:', err);
  }
};

const fetchProjectFromAPI = async (id: number) => {
  try {
    const res = await fetch(`https://back.guillemleon.com/api/projects/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const project = await res.json();
    return projectParser(project);
  } catch (err) {
    console.error('Error trying GET:', err);
  }
};

export { fetchWorkFromAPI, fetchProjectFromAPI };
