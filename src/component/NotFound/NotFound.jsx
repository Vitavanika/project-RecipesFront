import { Link } from 'react-router';
import desk1x from '../../images/404Desk1x.webp';
import desk2x from '../../images/404Desk2x.webp';
import tab1x from '../../images/404Tab1x.webp';
import tab2x from '../../images/404Tab2x.webp';
import mob1x from '../../images/404Mob1x.webp';
import mob2x from '../../images/404Mob2x.webp';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <picture className={css.picture}>
        <source
          media="(min-width: 1440px)"
          srcSet={`${desk1x} 1x, ${desk2x} 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${tab1x} 1x, ${tab2x} 2x`}
        />
        <img
          src={mob1x}
          srcSet={`${mob1x} 1x, ${mob2x} 2x`}
          alt="Not found"
          className={css.img}
        />
      </picture>
      <h2 className={css.title}>404</h2>
      <p className={css.text}>Recipe not found</p>
      <Link to="/" className={css.link}>
        <svg width="11" height="10" stroke="currentColor" className={css.icon}>
          <use href="/sprite.svg#icon-left-short" />
        </svg>{' '}
        Back to Home
      </Link>
    </div>
  );
}
