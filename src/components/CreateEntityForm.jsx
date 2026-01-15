import React, { useState } from 'react';
import { PRELOADED_ENEMIES } from '../data/enemies';
import styles from './CreateEntityForm.module.css';

const CreateEntityForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [initiative, setInitiative] = useState('');
    const [hp, setHp] = useState('');
    const [ac, setAc] = useState('');
    const [isEnemy, setIsEnemy] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || initiative === '') return;

        onAdd({
            name,
            initiative: parseInt(initiative),
            hp: parseInt(hp) || 10,
            maxHp: parseInt(hp) || 10,
            ac: parseInt(ac) || 10,
            isEnemy,
            conditions: []
        });

        // Reset some fields but maybe keep isEnemy?
        setName('');
        setInitiative('');
        setHp('');
        setAc('');
    };

    const handleQuickAdd = (enemy) => {
        setName(enemy.name);
        setHp(enemy.hp);
        setAc(enemy.ac);
        setIsEnemy(true);
        // Reset initiative so user rolls for it
        setInitiative('');
    };

    return (
        <form className={styles.formCard} onSubmit={handleSubmit}>
            <h3 className={styles.title}>Dodaj osobu</h3>

            <div className={styles.quickAdd}>
                <span className={styles.label} style={{ display: 'block', marginBottom: '8px', fontSize: '0.8em' }}>Brzi odabir:</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {PRELOADED_ENEMIES.map(enemy => (
                        <button
                            key={enemy.name}
                            type="button"
                            onClick={() => handleQuickAdd(enemy)}
                            style={{
                                padding: '4px 8px',
                                fontSize: '0.8em',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '4px',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {enemy.name}
                        </button>
                    ))}
                </div>
            </div>

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
                <div className={styles.inputGroup}>
                    <label className={styles.label}>AC</label>
                    <input
                        type="number"
                        placeholder="10"
                        value={ac}
                        onChange={e => setAc(e.target.value)}
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
