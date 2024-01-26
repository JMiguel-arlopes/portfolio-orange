
import { useState } from "react";
import styles from "./formnewproject.module.css"

const FormNewProject = () => {
    const [formData, setFormData] = useState({
      titulo: '',
      tag: '',
      link: '',
      descricao: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      console.log('Dados do formulário:', formData);
    };
  
    return (
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder ="Título"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
  
         
          <input
            type="text"
            placeholder ="Tags"
            value={formData.tag}
            onChange={handleChange}
            required
          />
  
          
          <input
            type="Link"
            placeholder ="Email adress"
            value={formData.link}
            onChange={handleChange}
            required
          />
  
          
          <textarea
            placeholder ="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
  
        </form>
      </div>
    );
  };
  
  export default FormNewProject;