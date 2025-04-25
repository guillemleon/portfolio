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
    const projects = await res.json();
    return projects;
  } catch (err) {
    console.error('Error trying GET:', err);
  }
};

export { fetchWorkFromAPI };
