import { Link } from "react-router";
import css from'./NotFound.module.css'

export default function NotFound() {
  return (
    <div className={css.container}>
       <picture className={css.picture}>
        <source
          media="(min-width: 1440px)"
          srcSet="/images/404Desk1x.webp 1x, /src/images/404Desk2x.webp 2x"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/404Tab1x.webp 1x, /src/images/404Tab2x.webp 2x"
        />
        <img
          src="/images/404Mob1x.webp"
          srcSet="/images/404Mob1x.webp 1x, /src/images/404Mob2x.webp 2x"
          alt="Not found"
          className={css.img}
        />
      </picture>
      <h2 className={css.title}>404</h2>
      <p className={css.text}>Recipe not found</p>
      <Link to="/" className={css.link}> 
      <svg width="11" height="10"  stroke="currentColor" className={css.icon}> 
      <use href="/sprite.svg#icon-left-short" />
    </svg> Back to Home</Link>
    </div>
  );
}