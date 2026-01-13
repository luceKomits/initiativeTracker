import React from 'react';
import styles from './EntityCard.module.css';
import { CONDITIONS, CONDITION_COLORS } from '../data/conditions';

const EntityCard = ({ entity, active, onDelete, onUpdate }) => {
    const hpPercent = Math.min(100, Math.max(0, (entity.hp / entity.maxHp) * 100));
    const isLowHp = hpPercent < 50;

    const handleHpChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        onUpdate(entity.id, { hp: val });
    };

    const addCondition = (e) => {
        const condition = e.target.value;
        if (condition && !entity.conditions.includes(condition)) {
            onUpdate(entity.id, { conditions: [...entity.conditions, condition] });
        }
        e.target.value = ""; // Reset select
    };

    const removeCondition = (condToRemove) => {
        onUpdate(entity.id, {
            conditions: entity.conditions.filter(c => c !== condToRemove)
        });
    };

    return (
        <div className={`${styles.card} ${active ? styles.active : ''} ${entity.isEnemy ? styles.enemy : styles.player}`}>
            <div className={styles.header}>
                <div className={styles.nameInfo}>
                    <div className={styles.initiative}>{entity.initiative}</div>
                    <div className={styles.name}>{entity.name}</div>
                </div>
                <button className={styles.deleteBtn} onClick={() => onDelete(entity.id)} title="Remove combatant">✕</button>
            </div>

            <div className={styles.healthSection}>
                <div className={styles.hpControls}>
                    <span>HP</span>
                    <div>
                        <input
                            className={styles.hpInput}
                            type="number"
                            value={entity.hp}
                            onChange={handleHpChange}
                        />
                        <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>/ {entity.maxHp}</span>
                    </div>
                </div>
                <div className={styles.hpBarContainer}>
                    <div
                        className={`${styles.hpBar} ${isLowHp ? styles.hpBarLow : ''}`}
                        style={{ width: `${hpPercent}%` }}
                    />
                </div>
            </div>

            <div className={styles.conditions}>
                {entity.conditions.map(c => (
                    <span
                        key={c}
                        className={styles.conditionTag}
                        style={{ borderColor: CONDITION_COLORS[c] || CONDITION_COLORS.default }}
                    >
                        {c}
                        <span className={styles.removeCondition} onClick={() => removeCondition(c)}>×</span>
                    </span>
                ))}
            </div>

            <div className={styles.actions}>
                <select className={styles.addConditionSelect} onChange={addCondition} defaultValue="">
                    <option value="" disabled>+ Add Condition</option>
                    {CONDITIONS.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default EntityCard;
