import React from 'react';
import styles from './TurnControls.module.css';

const TurnControls = ({ round, onNextTurn, onReset, onClear }) => {
    return (
        <div className={styles.controlsBar}>
            <div className={styles.roundDisplay}>
                <span className={styles.roundLabel}>POTEZ</span>
                {round}
            </div>

            <div className={styles.btnGroup}>
                <button className={styles.resetBtn} onClick={onConvert => {
                    if (confirm('Clear all combatants?')) onClear();
                }}>
                    Očisti sve
                </button>
                <button className={styles.resetBtn} onClick={onReset}>
                    Resetiraj poteze
                </button>
                <button className={styles.nextBtn} onClick={onNextTurn}>
                    Sljedeći potez ➔
                </button>
            </div>
        </div>
    );
};

export default TurnControls;
