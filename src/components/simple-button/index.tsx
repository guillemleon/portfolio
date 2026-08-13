import styles from "./index.module.css";

type SimpleButtonProps = {
    label: string;
    onClick: () => void;
    active?: boolean;
}

const SimpleButton = ({ label, onClick, active = false }: SimpleButtonProps) => {
    return (
        <button className={`${styles.simpleButton} ${active ? styles.active : ''}`} onClick={onClick}>
            <label className={styles.simpleButtonLabel}>{label}</label>
        </button>
    )
}

export default SimpleButton;