import css from "./RecipeContent.module.css";

export default function RecipeContent({ about, ingredients, ingredientsMap, steps }) {
  return (
    <div className={css.container}>
        <div className={css.wrapper}>
        <h3 className={css.title}>About recipe</h3>
        <p className={css.text}>{about}</p>
      </div>

      <div className={css.wrapper}>
        <h3 className={css.title}>Ingredients:</h3>
        <ul className={css.list}>
          {ingredients?.map((item, index) => (
            <li key={index} className={`${css.text} ${css.item}`}>
              {ingredientsMap[item.id] || "Unknown ingredient"} — {item.measure}
            </li>
          ))}
        </ul>
      </div>

      <div >
        <h3 className={css.instructionsTitle}>Preparation Steps:</h3>
        {steps?.split(". ").map((step, index) => (
          <p key={index} className={css.instructionsText}>{step}</p>
        ))}
      </div>
    </div>
  );
}
