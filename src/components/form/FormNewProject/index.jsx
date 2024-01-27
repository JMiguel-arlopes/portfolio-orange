import { useState } from "react";
import styles from "./formnewproject.module.css";
import Input from "../Input";

const FormNewProject = ({ handleChange, formData }) => {
  return (
    <div className={styles.form}>
      <Input
        text="Título"
        name="title"
        value={formData.title}
        handleOnChange={handleChange}
        required
      />

      <Input
        text="tags"
        name="tags"
        type="text"
        value={formData.tags}
        handleOnChange={handleChange}
        required
      />

      <Input
        text="Link"
        name="link"
        type="text"
        value={formData.link}
        handleOnChange={handleChange}
        required
      />

      <textarea
        placeholder="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        required
      ></textarea>
    </div>
  );
};

export default FormNewProject;
