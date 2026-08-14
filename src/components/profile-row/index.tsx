import styles from "./index.module.css";

interface ProfileRowProps {
    label: string,
    text: string
};

const ProfileRow = ({ label, text }: ProfileRowProps) => {
    return (
        <div className={styles.profileRow}>
            <label>{label}</label>
            <span>{text}</span>
        </div>
    )
}

export default ProfileRow;