import styles from './SubmitButton.module.css';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export default function SubmitButton({ onClick, disabled, label = 'Submit' }: SubmitButtonProps) {
  return (
    <button type="button" className={styles.btn} onClick={onClick} disabled={disabled} aria-label="Submit solution">
      <span className={styles.ripple} />
      <span className={styles.btnText} data-text={label}>
        {label}
      </span>
      <span className={styles.icon} />
    </button>
  );
}
