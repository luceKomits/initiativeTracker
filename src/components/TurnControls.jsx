import React from 'react';
import styles from './TurnControls.module.css';

const TurnControls = ({ round, onNextTurn, onReset, onClear }) => {
    return (
        <div className={styles.controlsBar}>
            <div className={styles.roundDisplay}>
                <span className={styles.roundLabel}>ROUND</span>
                {round}
            </div>

            <div className={styles.btnGroup}>
                <button className={styles.resetBtn} onClick={onConvert => {
                    if (confirm('Clear all combatants?')) onClear();
                }}>
                    Clear All
                </button>
                <button className={styles.resetBtn} onClick={onReset}>
                    Reset Round
                </button>
                <button className={styles.nextBtn} onClick={onNextTurn}>
                    Next Turn ➔
                </button>
            </div>
        </div>
    );
};

export default TurnControls;
