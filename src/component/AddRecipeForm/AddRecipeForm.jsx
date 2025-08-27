import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { fetchRecipeMeta } from '../../redux/recipes/operations';
import { fetchAddRecipe } from '../../redux/recipes/operations';
import {
  selectCategories,
  selectIngredients,
  selectLoading,
  selectError
} from '../../redux/recipes/selectors';

import styles from './AddRecipeForm.module.css';

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const loadMeta = async () => {
      try {
        await dispatch(fetchRecipeMeta()).unwrap();
      } catch (err) {
        toast.error(err || 'Failed to load recipe data');
      }
    };

    loadMeta();
  }, [dispatch]);

  const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),

  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),

  time: Yup.number()
    .positive('Time must be a positive number')
    .integer('Time must be an integer')
    .min(1, 'Time must be at least 1 minute')
    .required('Time is required'),

  calories: Yup.number()
    .positive('Calories must be a positive number')
    .integer('Calories must be an integer')
    .nullable(),

  category: Yup.string()
    .required('Category is required'),

  instructions: Yup.string()
    .min(20, 'Instructions must be at least 20 characters')
    .required('Instructions are required'),

  photo: Yup.mixed()
    .required('Photo is required'),
});

const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  setSubmitting(true);

  if (selectedIngredients.length === 0) {
    toast.error('Add at least one ingredient');
    setSubmitting(false);
    return;
  }

  const formData = new FormData();

  Object.entries(values).forEach(([key, val]) => {
    if (val !== null && val !== '') {
      formData.append(key, val);
    }
  });

  formData.append('ingredients', JSON.stringify(selectedIngredients));

  try {
    const response = await dispatch(fetchAddRecipe(formData)).unwrap();
    toast.success('Recipe added successfully!');
    navigate(`/recipes/${response._id || response.id}`);
    resetForm();
  } catch (error) {
    const errorMessage =
      error?.message || error?.response?.data?.message || 'Error adding recipe';
    toast.error(errorMessage);
  } finally {
    setSubmitting(false);
  }
};

  const IngredientSelector = () => {
    const [ingredientId, setIngredientId] = useState('');
    const [amount, setAmount] = useState('');

    const addIngredient = () => {
      if (!ingredientId || !amount.trim()) {
        alert('Select the ingredient and specify the quantity');
        return;
      }

      if (selectedIngredients.some(i => i.id === ingredientId)) {
        alert('This ingredient has already been added');
        return;
      }

      const ingredient = ingredients.find(i => i._id === ingredientId || i.id === ingredientId);
      if (!ingredient) {
        alert('Ingredient not found');
        return;
      }

      setSelectedIngredients([
        ...selectedIngredients, 
        { 
          id: ingredientId, 
          name: ingredient.name, 
          amount: amount.trim() 
        }
      ]);
      
      setIngredientId('');
      setAmount('');
    };

    const removeIngredient = (id) => {
      setSelectedIngredients(selectedIngredients.filter(i => i.id !== id));
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addIngredient();
      }
    };

    return (
      <div className={styles.ingredientSelector}>
        <h2>Ingredients</h2>

        <div className={styles.ingredientControls}>
          <select 
            value={ingredientId} 
            onChange={(e) => setIngredientId(e.target.value)}
            className={styles.ingredientSelect}
          >
            <option value="">Name</option>
            {ingredients.map((ingredient) => (
              <option key={ingredient._id || ingredient.id} value={ingredient._id || ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="100g"
            className={styles.ingredientAmountInput}
          />

          <button type="button" onClick={addIngredient} className={styles.addIngredientButton}>
            Add new Ingredient
          </button>
        </div>

        {selectedIngredients.length > 0 && (
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
                {selectedIngredients.map((ingredient) => (
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
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

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
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
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
          title: '',
          description: '',
          time: '',
          calories: '',
          category: '',
          instructions: '',
          photo: null
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, status }) => (
          <Form className={styles.recipeForm}>
            {status && (
              <div className={styles.formStatus}>
                {status}
              </div>
            )}            
            <div className={styles.formField}>
  <h2>Upload Photo</h2>
  
  <div 
    className={`${styles.photoUploadContainer} ${values.photo ? styles.hasImage : ''} `}
  >
    <input
      type="file"
      name="photo"
      id="photo"
      accept="image/*"
      onChange={(e) => setFieldValue('photo', e.currentTarget.files[0])}
      className={styles.fileInput}
    />
    
    {!values.photo ? (
      <div className={styles.uploadPlaceholder}>
        <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
        </svg>
        <div className={styles.uploadText}>Click to upload photo</div>
        <div className={styles.uploadSubtext}>PNG, JPG up to 10MB</div>
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
  
  <ErrorMessage name="photo" component="div" className={styles.fieldError} />
</div>

            <div className={styles.formField}>
              <h2>General Information</h2>
              <label htmlFor="title">Recipe Title</label>
              <Field name="title" id="title" placeholder="Enter the name of your recipe" />
              <ErrorMessage name="title" component="div" className={styles.fieldError} />
            </div>

            <div className={styles.formField}>
              <label htmlFor="description">Recipe Description</label>
              <Field 
                as="textarea" 
                name="description"
                id="description"
                placeholder="Enter a brief description of your recipe" 
                rows={3}
              />
              <ErrorMessage name="description" component="div" className={styles.fieldError} />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label htmlFor="time">Cooking time in minutes</label>
                <Field name="time" id="time" type="number" min="1" placeholder="10" />
                <ErrorMessage name="time" component="div" className={styles.fieldError} />
              </div>

              <div className={styles.formField}>
                <label htmlFor="calories">Calories</label>
                <Field name="calories" id="calories" type="number" min="1" placeholder="150 cals" />
                <ErrorMessage name="calories" component="div" className={styles.fieldError} />
              </div>
            </div>

            <div className={styles.formField}>
              <label htmlFor="category">Category</label>
              <Field as="select" name="category" id="category">
                <option value="" disabled>-- Select category --</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.id} value={cat._id || cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className={styles.fieldError} />
            </div>

            <IngredientSelector />

            <div className={styles.formField}>
              <label htmlFor="instructions">Instructions</label>
              <Field 
                as="textarea" 
                name="instructions"
                id="instructions"
                placeholder="Enter a text" 
                rows={6}
              />
              <ErrorMessage name="instructions" component="div" className={styles.fieldError} />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Published...' : 'Publish Recipe'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;