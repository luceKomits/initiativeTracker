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
        if (condition) {
            if (condition === "Light Bleeding") {
                // Allow stacking for Light Bleeding
                onUpdate(entity.id, { conditions: [...entity.conditions, condition] });
            } else if (!entity.conditions.includes(condition)) {
                onUpdate(entity.id, { conditions: [...entity.conditions, condition] });
            }
        }
        e.target.value = ""; // Reset select
    };

    const removeCondition = (condToRemove, indexToRemove) => {
        // Remove only the specific instance by index
        const newConditions = [...entity.conditions];
        newConditions.splice(indexToRemove, 1);
        onUpdate(entity.id, {
            conditions: newConditions
        });
    };

    return (
        <div className={`${styles.card} ${active ? styles.active : ''} ${entity.isEnemy ? styles.enemy : styles.player}`}>
            <div className={styles.header}>
                <div className={styles.nameInfo}>
                    <div className={styles.initiative}>{entity.initiative}</div>
                    <div className={styles.name}>
                        {entity.name}
                        {entity.ac && <span style={{ fontSize: '0.8em', opacity: 0.7, marginLeft: '8px' }}>🛡️{entity.ac}</span>}
                    </div>
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
                {entity.conditions.map((c, index) => (
                    <span
                        key={`${c}-${index}`}
                        className={styles.conditionTag}
                        style={{ borderColor: CONDITION_COLORS[c] || CONDITION_COLORS.default }}
                    >
                        {c}
                        <span className={styles.removeCondition} onClick={() => removeCondition(c, index)}>×</span>
                    </span>
                ))}
            </div>

            <div className={styles.actions}>
                <select className={styles.addConditionSelect} onChange={addCondition} defaultValue="">
                    <option value="" disabled>+ Dodaj stanje</option>
                    {CONDITIONS.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default EntityCard;
