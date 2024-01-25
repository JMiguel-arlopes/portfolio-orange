import styles from "./projectCard.module.css";

export default function ProjectCard({ imgBackground, imgUser, name, tags }) {
  return (
    <div className={styles.card_project}>
      <img src={imgBackground} alt="Background card" />
      <div className={styles.row_information_project}>
        <div>
          <img src={imgUser} alt="image User"/>
          <h5>{name}</h5>
        </div>
        <div>
          {tags.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
