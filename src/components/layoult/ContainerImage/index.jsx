import styles from "./containerimage.module.css";

export default function ContainerImage({ img, alt }) {
  return (
    <div className={styles.container_img}>
      <img src={img} alt={alt} />
    </div>
  );
}
