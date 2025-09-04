import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { getCategories } from '../../redux/categories/operations';
import { getIngredients } from '../../redux/ingredients/operations';
import { fetchAddRecipe } from '../../redux/recipes/operations';
import {
  getIngredientsSlice,
  getIsLoadedIngredients,
  getIsLoadingIngredients,
  getIsErrorLoadIngredients,
} from '../../redux/ingredients/selectors';
import {
  getCategoriesSlice,
  getIsLoadedCategories,
  getIsLoadingCategories,
  getIsErrorLoadCategories,
} from '../../redux/categories/selectors';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { AddRecipeModal } from '../AddRecipeModal/AddRecipeModal';

import styles from './AddRecipeForm.module.css';

const AddRecipeForm = () => {
  const dispatch = useDispatch();

  const categories = useSelector(getCategoriesSlice);
  const ingredients = useSelector(getIngredientsSlice);

  const isLoadingCategories = useSelector(getIsLoadingCategories);
  const isLoadingIngredients = useSelector(getIsLoadingIngredients);
  const isLoadedCategories = useSelector(getIsLoadedCategories);
  const isLoadedIngredients = useSelector(getIsLoadedIngredients);
  const isErrorCategories = useSelector(getIsErrorLoadCategories);
  const isErrorIngredients = useSelector(getIsErrorLoadIngredients);

  const loading = isLoadingCategories || isLoadingIngredients;
  const error = isErrorCategories || isErrorIngredients;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModalState = useCallback(() => setIsModalOpen(prev => !prev), []);
  const modalRef = useRef(null);
  const [recipeId, setRecipeId] = useState(null);

  useLockBodyScroll(isModalOpen);

  useEffect(() => {
    const handleClick = event => {
      if (
        modalRef.current &&
        event.target &&
        !modalRef.current.contains(event.target)
      ) {
        toggleModalState();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isModalOpen, toggleModalState]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!isLoadedCategories) {
          await dispatch(getCategories()).unwrap();
        }

        if (!isLoadedIngredients) {
          await dispatch(getIngredients()).unwrap();
        }
      } catch (err) {
        toast.error(err?.message || 'Failed to load recipe data');
      }
    };

    loadData();
  }, [dispatch, isLoadedCategories, isLoadedIngredients]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .required('Title is required'),

    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .required('Description is required'),

    cookingTime: Yup.string()
      .matches(/^\d+$/, 'Time should not have letters')
      .test('min-value', 'Time must be at least 1 minute', value => {
        const num = Number(value);
        return num >= 1;
      })
      .required('Time is required'),

    foodEnergy: Yup.number()
      .positive('Calories must be a positive number')
      .integer('Calories must be an integer')
      .nullable(),

    category: Yup.string().required('Category is required'),

    instructions: Yup.string()
      .min(20, 'Instructions must be at least 20 characters')
      .required('Instructions are required'),

    photo: Yup.mixed().required('Photo is required'),

    ingredients: Yup.array()
      .min(2, 'At least two ingredient is required')
      .required('Ingredients are required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const fieldMap = {
      title: 'name',
      time: 'cookingTime',
      calories: 'foodEnergy',
    };

    const formData = new FormData();

    Object.entries(values).forEach(([key, val]) => {
      if (val !== null && val !== '' && key !== 'ingredients') {
        const mappedKey = fieldMap[key] || key;
        formData.append(mappedKey, val);
      }
    });

    const mappedIngredients = values.ingredients.map(({ name, amount }) => ({
      name,
      quantity: amount,
    }));

    formData.append('ingredients', JSON.stringify(mappedIngredients));

    try {
      const response = await dispatch(fetchAddRecipe(formData)).unwrap();
      toast.success('Recipe added successfully!');
      setRecipeId(response.data._id);
      toggleModalState();
      resetForm();
    } catch (error) {
      const errorMessage =
        error?.message ||
        error?.response?.data?.message ||
        'Error adding recipe';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const IngredientSelector = ({ values, setFieldValue }) => {
    const [ingredientId, setIngredientId] = useState('');
    const [amount, setAmount] = useState('');

    const addIngredient = () => {
      if (!ingredientId || !amount.trim()) {
        toast.error('Select the ingredient and specify the quantity');
        return;
      }

      if (values.ingredients.some(i => i.id === ingredientId)) {
        toast.error('This ingredient has already been added');
        return;
      }

      const ingredient = ingredients.find(i =>
        [i._id, i.id].includes(ingredientId)
      );
      if (!ingredient) {
        toast.error('Ingredient not found');
        return;
      }

      const updated = [
        ...values.ingredients,
        {
          id: ingredient._id || ingredient.id,
          name: ingredient.name,
          amount: amount.trim(),
        },
      ];
      setFieldValue('ingredients', updated);
      setIngredientId('');
      setAmount('');
    };

    const removeIngredient = id => {
      const updated = values.ingredients.filter(i => i.id !== id);
      setFieldValue('ingredients', updated);
    };

    const handleKeyPress = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addIngredient();
      }
    };

    return (
      <div className={styles.ingredientSelector}>
        <h2 className={styles.ingredientHead}>Ingredients</h2>

        <div className={styles.ingredientControls}>
          <div className={styles.ingredientField}>
            <label htmlFor="ingredientSelect" className={styles.labelText}>
              Name
            </label>
            <div className={styles.selectWithArrow}>
              <select
                id="ingredientSelect"
                value={ingredientId}
                onChange={e => setIngredientId(e.target.value)}
                className={styles.ingredientSelect}
              >
                <option value="">Select ingredient</option>
                {ingredients.map(ingredient => (
                  <option
                    key={ingredient._id || ingredient.id}
                    value={ingredient._id || ingredient.id}
                  >
                    {ingredient.name}
                  </option>
                ))}
              </select>
              <svg className={styles.selectArrow} width="24" height="24">
                <use href="/sprite.svg#icon-chevron-down" />
              </svg>
            </div>
          </div>

          <div className={styles.ingredientField}>
            <label htmlFor="ingredientAmount" className={styles.labelText}>
              Amount
            </label>
            <input
              id="ingredientAmount"
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="100g"
              className={styles.ingredientAmountInput}
            />
          </div>

          <button
            type="button"
            onClick={addIngredient}
            className={styles.addIngredientButton}
          >
            Add new Ingredient
          </button>
          <ErrorMessage
            name="ingredients"
            component="div"
            className={styles.fieldError}
          />
        </div>

        <div className={styles.selectedIngredients}>
          <table className={styles.ingredientsTable}>
            <thead>
              <tr>
                <th>Name:</th>
                <th>Amount:</th>
                <th className={styles.actionsColumn}></th>
              </tr>
            </thead>
            <tbody>
              {values.ingredients.length > 0 ? (
                values.ingredients.map(ingredient => (
                  <tr key={ingredient.id}>
                    <td>{ingredient.name}</td>
                    <td>{ingredient.amount}</td>
                    <td className={styles.actionsColumn}>
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient.id)}
                        className={styles.removeIngredientButton}
                        title="Delete"
                      >
                        <svg
                          className={styles.uploadIcon}
                          width="52"
                          height="52"
                        >
                          <use href="/sprite.svg#icon-delete" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className={styles.emptyRow}>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: 'center',
                      color: '#999',
                      padding: '20px',
                    }}
                  >
                    No ingredients added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const PhotoUpload = ({ values, setFieldValue }) => (
    <div className={styles.formField}>
      <h2 className={styles.uploadHead}>Upload Photo</h2>
      <div
        className={`${styles.photoUploadContainer} ${
          values.photo ? styles.hasImage : ''
        } `}
      >
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          onChange={e => setFieldValue('photo', e.currentTarget.files[0])}
          className={styles.fileInput}
        />

        {!values.photo ? (
          <div className={styles.uploadPlaceholder}>
            <svg className={styles.uploadIcon} width="52" height="52">
              <use href="/sprite.svg#icon-photo" />
            </svg>
          </div>
        ) : (
          <div className={styles.imagePreview}>
            <img
              src={URL.createObjectURL(values.photo)}
              alt="Recipe preview"
              className={styles.previewImage}
            />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayText}>Click to change photo</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`${styles.addRecipeForm} ${styles.loadingContainer}`}>
        <h1>Loading...</h1>
        <p>Loading data recipe form...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.addRecipeForm} ${styles.errorContainer}`}>
        <h1>Error</h1>
        <p className={styles.errorMessage}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try again!
        </button>
      </div>
    );
  }

  return (
    <div className={styles.addRecipeForm}>
      <h1>Add Recipe</h1>

      <Formik
        initialValues={{
          name: '',
          description: '',
          cookingTime: '',
          foodEnergy: '',
          category: '',
          instructions: '',
          photo: null,
          ingredients: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, status }) => (
          <Form className={styles.recipeForm}>
            {status && <div className={styles.formStatus}>{status}</div>}

            <div className={styles.formColumn}>
              <PhotoUpload values={values} setFieldValue={setFieldValue} />

              <div className={styles.formField}>
                <h2 className={styles.generalHead}>General Information</h2>
                <label className={styles.labelText} htmlFor="title">
                  Recipe Title
                </label>
                <Field
                  name="name"
                  id="name"
                  placeholder="Enter the name of your recipe"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.fieldError}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.labelText} htmlFor="description">
                  Recipe Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter a brief description of your recipe"
                  rows={3}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.fieldError}
                />
              </div>

              <div className={`${styles.formField} ${styles.timeField}`}>
                <label className={styles.labelText} htmlFor="time">
                  Cooking time in minutes
                </label>
                <Field
                  name="cookingTime"
                  id="cookingTime"
                  type="text"
                  min="1"
                  placeholder="10"
                />
                <ErrorMessage
                  name="cookingTime"
                  component="div"
                  className={styles.fieldError}
                />
              </div>

              <div className={styles.caloriesCategoryRow}>
                <div className={styles.formField}>
                  <label className={styles.labelText} htmlFor="calories">
                    Calories
                  </label>
                  <Field
                    name="foodEnergy"
                    id="calfoodEnergyories"
                    type="number"
                    min="1"
                    placeholder="150"
                  />
                  <ErrorMessage
                    name="foodEnergy"
                    component="div"
                    className={styles.fieldError}
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.labelText} htmlFor="category">
                    Category
                  </label>
                  <div className={styles.selectWithArrow}>
                    <Field as="select" name="category" id="category">
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option
                          key={cat._id || cat.id}
                          value={cat._id || cat.id}
                        >
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <svg className={styles.selectArrow} width="24" height="24">
                      <use href="/sprite.svg#icon-chevron-down" />
                    </svg>
                  </div>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className={styles.fieldError}
                  />
                </div>
              </div>

              <IngredientSelector
                values={values}
                setFieldValue={setFieldValue}
              />

              <div className={styles.formField}>
                <label className={styles.instrHead} htmlFor="instructions">
                  Instructions
                </label>
                <Field
                  as="textarea"
                  name="instructions"
                  id="instructions"
                  placeholder="Enter a text"
                  rows={6}
                />
                <ErrorMessage
                  name="instructions"
                  component="div"
                  className={styles.fieldError}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitButton} ${styles.mobileTabletOnly}`}
              >
                {isSubmitting ? 'Published...' : 'Publish Recipe'}
              </button>
            </div>

            <div className={styles.photoColumn}>
              <PhotoUpload values={values} setFieldValue={setFieldValue} />

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Published...' : 'Publish Recipe'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {isModalOpen && (
        <AddRecipeModal
          ref={modalRef}
          onClick={toggleModalState}
          recipeId={recipeId}
        />
      )}
    </div>
  );
};

export default AddRecipeForm;
