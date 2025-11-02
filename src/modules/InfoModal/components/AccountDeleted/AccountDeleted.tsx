import styles from "./styles.module.css";

const AccountDeleted = () => {
  return (
    <div className={styles["wrapper"]}>
      <h2>Ərizə göndərildi</h2>
      <p>
        Rəyiniz üçün təşəkkür edirik! Ətraflı məlumat üçün əlaqə saxlayın:
        <a href="mailto:info@azpul.az">info@azpul.az</a>
      </p>
    </div>
  );
};

export default AccountDeleted;
