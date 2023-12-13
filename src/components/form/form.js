import { React, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  useField,
} from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "../../css/form.css";
import "react-datepicker/dist/react-datepicker.css";
import crustationImage from "../../icons/crustation.png";
import celeryImage from "../../icons/celery.png";
import crabImage from "../../icons/crab.png";
import eggImage from "../../icons/eggs.png";
import fishImage from "../../icons/fish.png";
import lupinImage from "../../icons/lupin.png";
import milkImage from "../../icons/milk.png";
import nutsImage from "../../icons/nuts.png";
import sesameImage from "../../icons/sesame.png";
import sulpherImage from "../../icons/sulpher.png";
import glutenImage from "../../icons/gluten.png";
import soyaImage from "../../icons/soya.png";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const RecipeForm = () => {
  const [formData, setFormData] = useState(null);
  console.log("Form Values:", formData);
  // Define the initial form values
  const initialValues = {
    title: "",
    ingredients: [],
    instructions: "",
    allergens: [],
    serving: "",
    price: 0,
    date: null,
    percentage: 0,
    dishPrice: 0,
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Recipe name is required"),
    ingredients: Yup.array().min(1, "At least one ingredient is required."),
    instructions: Yup.string().required("Instructions are required"),
    dishPrice: Yup.number().required("DishPrice is required"),
  });

  // Handle form submission
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setFormData(values);
    setSubmitting(false);
    resetForm();
  };

  const allergenOptions = [
    "Celery",
    "Gluten",
    "Crustaceans",
    "Eggs",
    "Fish",
    "Lupin",
    "Milk",
    "Molluscs",
    "Mustard",
    "Nuts",
    "Peanuts",
    "Sesame",
    "Soya",
    "Sulphur",
  ];

  const allergenIcon = [
    celeryImage,
    glutenImage,
    crabImage,
    eggImage,
    fishImage,
    lupinImage,
    milkImage,
    crustationImage,
    sesameImage,
    nutsImage,
    nutsImage,
    sesameImage,
    soyaImage,
    sulpherImage,
  ];

  const MyDatePicker = ({ name = "" }) => {
    const [field, meta, helpers] = useField(name);

    const { value } = meta;
    const { setValue } = helpers;

    return (
      <DatePicker
        {...field}
        selected={value}
        onChange={(date) => setValue(date)}
      />
    );
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="form-container">
              <div className="input-feilds">
                <div className="requiered-feild">
                  <label>Date</label>
                  <br />
                  <MyDatePicker name="date" />

                  <br />
                  <label className="text-feild" htmlFor="title">
                    Recipe name
                  </label>
                  <Field
                    className="input-feild-css"
                    type="text"
                    id="title"
                    name="title"
                  />
                  <ErrorMessage
                    style={{
                      fontSize: "medium",
                      color: "red",
                      textDecoration: "underline",
                    }}
                    name="title"
                    component="div"
                  />
                </div>
                <div className="requiered-feild">
                  <label className="text-feild" htmlFor="ingredients">
                    Ingredients
                  </label>
                  <label className="price-text-feild">Price</label>
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <div>
                        {values.ingredients.map((ingredient, index) => (
                          <div key={index}>
                            <div className="ingredient-input-layout">
                              <Field
                                className="text-field with-placeholder-color"
                                name={`ingredients.${index}`}
                                placeholder={`Ingredient #${index + 1}`}
                                style={{ width: "370%", marginRight: "5px" }}
                              />

                              <Field
                                className="number-feild"
                                type="number"
                                id="price"
                                name="price"
                                step="any"
                                inputMode="numeric"
                              />
                            </div>
                            {index > 0 && (
                              <Button
                                style={{
                                  marginTop: "10px",
                                  marginBottem: "10px",
                                }}
                                type="button"
                                variant="contained"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button
                          style={{ marginTop: "10px", marginBottem: "10px" }}
                          type="button"
                          variant="contained"
                          onClick={() => push("")}
                        >
                          Add ingredent
                        </Button>
                        <ErrorMessage
                          style={{
                            fontSize: "medium",
                            color: "red",
                            textDecoration: "underline",
                          }}
                          name="ingredients"
                          component="div"
                        />
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="requiered-feild">
                  {/* method */}
                  <div className="price-container">
                    <label className="price-labels">Mark up</label>
                    <br />
                    <Field
                      className="markup-percentage-feild"
                      type="number"
                      id="percentage"
                      name="percentage"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <br />
                    <label
                      className="dish-price-label"
                      style={{ marginTop: "20px" }}
                    >
                      Dish Price
                    </label>
                    <br />
                    <Field
                      className="dish-price-feild"
                      type="number"
                      id="dishPrice"
                      name="dishPrice"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="allergens">
                <label className="al-label">Allergens</label>
                <FieldArray name="allergens">
                  {() => (
                    <div
                      className="allergen-group"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      {allergenOptions.map((option, index) => (
                        <div className="allergen-card" key={option}>
                          <Field
                            className="checkbox-checkbox-rect"
                            type="checkbox"
                            name="allergens"
                            value={option}
                          />
                          <label className="allergen-label">{option}</label>
                          <div className="img-container">
                            <img
                              className="allergen-img"
                              src={allergenIcon[index]}
                              alt={``}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>
              <span style={{ paddingLeft: "30px" }}>
                <label style={{ width: "165px" }}>Method details</label>
                <Field
                  className="serving-detail"
                  as="textarea"
                  id="instructions"
                  name="instructions"
                  rows="4"
                  cols="50"
                  style={{ resize: "none", marginTop: "20px" }}
                />
                <br />
                <label htmlFor="instructions">Serving-detail</label>
                <br />
                <Field
                  className="input-feild-css"
                  as="textarea"
                  id="serving"
                  name="serving"
                  rows="4"
                  cols="50"
                  style={{ resize: "none", marginTop: "20px" }}
                />
                <ErrorMessage
                  style={{
                    fontSize: "medium",
                    color: "red",
                    textDecoration: "underline",
                  }}
                  name="instructions"
                  component="div"
                />
                <br />
                <Button
                  className="submit-button"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RecipeForm;
