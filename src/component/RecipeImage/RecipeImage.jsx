import { useState, useEffect } from 'react';
import css from './RecipeImage.module.css';

export default function RecipeImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    if (!src) return;

    const updateSrc = () => {
      setImgSrc(
        window.innerWidth >= 1024
          ? src.replace('/preview/', '/preview/large/')
          : src.replace('/preview/large/', '/preview/')
      );
    };

    updateSrc();
    window.addEventListener('resize', updateSrc);

    return () => window.removeEventListener('resize', updateSrc);
  }, [src]);

  return (
    <div className={css.container}>
      <img src={imgSrc} alt={alt} className={css.img} />
    </div>
  );
}
