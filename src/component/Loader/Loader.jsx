import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <div className={css.loadingspinner}>
        <div className={css.square1}></div>
        <div className={css.square2}></div>
        <div className={css.square3}></div>
        <div className={css.square4}></div>
        <div className={css.square5}></div>
      </div>
    </div>
  );
}
