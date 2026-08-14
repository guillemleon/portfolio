import Button from "@/components/button";
import styles from "./page.module.css";
import ProfileRow from "@/components/profile-row";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.personalInfo}>
        <h1 className={styles.title}>Guillem León</h1>
        <span className={styles.subtitle}>
          Software Engineer · Smart TV Engineer at Filmin
        </span>

        <p className={styles.description}>
          Six years across the stack. I look after the television app at Filmin, taking features from the first conversation with product and design through to release on every device it runs on — and I've built backends and iOS apps either side of it.
        </p>
        <div className={styles.buttons}>
          <Button label="Selected Work"></Button>
          <Button label="Download CV" type='secondary'></Button>
        </div>
      </section >
      <section className={styles.profileContainer}>
        <aside className={styles.profile}>
          <h4>Profile</h4>
          <ProfileRow label="Now" text="Smart TV Engineer, Filmin" />
          <ProfileRow label="Focus" text="Multi-platform delivery" />
          <ProfileRow label="Side Work" text="Two iOS apps shipped" />
          <ProfileRow label="Reach Me" text="By email" />
          <ProfileRow label="Stack" text="React · TS · Node · Python · Swift" />
        </aside>
      </section>
    </div>
  );
}
