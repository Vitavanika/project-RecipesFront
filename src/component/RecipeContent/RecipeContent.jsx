import css from "./RecipeContent.module.css";

export default function RecipeContent({ about, ingredients, steps }) {
  return (
    <div className={css.container}>
      {about && (
        <div className={css.wrapper}>
        <h3 className={css.title}>About recipe</h3>
        <p className={css.text}>{about}</p>
      </div>)}

      {Array.isArray(ingredients) && ingredients.length > 0 && (
      <div className={css.wrapper}>
        <h3 className={css.title}>Ingredients:</h3>
        <ul className={css.list}>
          {ingredients?.map((item) => (
            <li key={item.id} className={`${css.text} ${css.item}`}>
              {item.name || "Unknown ingredient"} — {item.measure || "N/A"}
            </li>
          ))}
        </ul>
      </div>)}

      {typeof steps === "string" && (
      <div >
        <h3 className={css.instructionsTitle}>Preparation Steps:</h3>
        {steps?.split(". ").map((step) => (
          <p key={step} className={css.instructionsText}>{step}</p>
        ))}
      </div>)}
    </div>
  );
}
