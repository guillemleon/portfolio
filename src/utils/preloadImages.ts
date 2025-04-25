const preloadImages = (urls: string[]) => {
  const images: HTMLImageElement[] = [];
  const promises = urls.map((url, i) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        images[i] = img;
        resolve(img);
      };
      img.onerror = (err) => {
        reject(new Error(`Error cargando imagen ${url}`));
      };
      img.src = url;
    });
  });

  return Promise.all(promises).then(() => images);
};

export { preloadImages };
