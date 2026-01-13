import React, { useState } from 'react';
import styles from './CreateEntityForm.module.css';

const CreateEntityForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [initiative, setInitiative] = useState('');
    const [hp, setHp] = useState('');
    const [isEnemy, setIsEnemy] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || initiative === '') return;

        onAdd({
            name,
            initiative: parseInt(initiative),
            hp: parseInt(hp) || 10,
            maxHp: parseInt(hp) || 10,
            isEnemy,
            conditions: []
        });

        // Reset some fields but maybe keep isEnemy?
        setName('');
        setInitiative('');
        setHp('');
    };

    return (
        <form className={styles.formCard} onSubmit={handleSubmit}>
            <h3 className={styles.title}>Add Combatant</h3>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Goblin Archer"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Initiative</label>
                    <input
                        type="number"
                        placeholder="d20 + Dex"
                        value={initiative}
                        onChange={e => setInitiative(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Max HP</label>
                    <input
                        type="number"
                        placeholder="10"
                        value={hp}
                        onChange={e => setHp(e.target.value)}
                    />
                </div>
                <div className={`${styles.inputGroup} ${styles.checkboxGroup}`}>
                    <input
                        type="checkbox"
                        id="isEnemy"
                        checked={isEnemy}
                        onChange={e => setIsEnemy(e.target.checked)}
                    />
                    <label htmlFor="isEnemy" style={{ cursor: 'pointer', color: isEnemy ? 'var(--accent-crimson)' : 'var(--text-secondary)' }}>
                        Is Enemy?
                    </label>
                </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Add to Combat</button>
        </form>
    );
};

export default CreateEntityForm;
