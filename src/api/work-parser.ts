const getOptimizedCloudinaryUrl = (url: string, format = 'auto', quality = 'auto') => {
  return url?.replace('/upload/', `/upload/f_${format},q_${quality}/`);
};

const workParser = (data: any) => {
  return data?.map((item: any) => {
    return {
      ...item,
      image: getOptimizedCloudinaryUrl(item.image, 'webp', '50'),
      image_card: getOptimizedCloudinaryUrl(item.image_card, 'webp', '30'),
    };
  });
};

const projectParser = (data: any) => {
  return {
    ...data,
    image: getOptimizedCloudinaryUrl(data.image, 'webp', '50'),
    image_card: getOptimizedCloudinaryUrl(data.image_card, 'webp', '50'),
  };
};

export { getOptimizedCloudinaryUrl, workParser, projectParser };
