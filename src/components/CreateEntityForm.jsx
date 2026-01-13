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
            <h3 className={styles.title}>Dodaj osobu</h3>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Vatreni Komunjara"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Initiative</label>
                    <input
                        type="number"
                        placeholder="d20 Roll"
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
                        placeholder="HP"
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
                        Neprijatelj
                    </label>
                </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Dodaj u borbu</button>
        </form>
    );
};

export default CreateEntityForm;
