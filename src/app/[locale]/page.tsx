import { useTranslations } from "next-intl";
import Button from "@/components/button";
import styles from "./page.module.css";
import ProfileRow from "@/components/profile-row";

const TITLE = "Guillem León";
const PROFILE_ROWS = ['now', 'focus', 'sideWork', 'reachMe', 'stack'] as const;

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className={styles.container}>
      <section className={styles.personalInfo}>
        <h1 className={styles.title}>
          {TITLE.split('').map((letter, index) => {
            if (letter === " ") {
              return <span key={index}>&nbsp;</span>
            }

            return <span key={index} className={styles.titleLetter}>{letter}</span>
          })}
        </h1>
        <span className={styles.subtitle}>
          {t('subtitle')}
        </span>

        <p className={styles.description}>
          {t('description')}
        </p>
        <div className={styles.buttons}>
          <Button label={t('selectedWork')}></Button>
          <Button label={t('downloadCV')} type='secondary'></Button>
        </div>
      </section>
      <section className={styles.profileContainer}>
        <aside className={styles.profile}>
          <h4>{t('profile.title')}</h4>
          {PROFILE_ROWS.map((row) => (
            <ProfileRow
              key={row}
              label={t(`profile.${row}.label`)}
              text={t(`profile.${row}.text`)}
            />
          ))}
        </aside>
      </section>
    </div>
  );
}
