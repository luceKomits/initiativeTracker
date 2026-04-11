import React, { useState } from 'react';
import styles from './EntityCard.module.css';
import { CONDITIONS, CONDITION_COLORS } from '../data/conditions';

const EntityCard = ({ entity, active, onDelete, onUpdate }) => {
    const hpPercent = Math.min(100, Math.max(0, (entity.hp / entity.maxHp) * 100));
    const isLowHp = hpPercent < 50;
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        initiative: entity.initiative,
        ac: entity.ac || ''
    });

    const handleEditSave = () => {
        onUpdate(entity.id, {
            initiative: parseInt(editForm.initiative) || 0,
            ac: parseInt(editForm.ac) || 0
        });
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setEditForm({
            initiative: entity.initiative,
            ac: entity.ac || ''
        });
        setIsEditing(false);
    };

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
                    {isEditing ? (
                        <>
                            <input
                                type="number"
                                className={styles.editInput}
                                value={editForm.initiative}
                                onChange={e => setEditForm({ ...editForm, initiative: e.target.value })}
                                style={{ width: '40px' }}
                                title="Initiative"
                            />
                            <div className={styles.name}>
                                {entity.name}
                                <span style={{ marginLeft: '8px' }}>🛡️</span>
                                <input
                                    type="number"
                                    className={styles.editInput}
                                    value={editForm.ac}
                                    onChange={e => setEditForm({ ...editForm, ac: e.target.value })}
                                    placeholder="AC"
                                    style={{ width: '40px', marginLeft: '4px' }}
                                    title="Armor Class"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.initiative}>{entity.initiative}</div>
                            <div className={styles.name}>
                                {entity.name}
                                {entity.ac && <span style={{ fontSize: '0.8em', opacity: 0.7, marginLeft: '8px' }}>🛡️{entity.ac}</span>}
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.headerActions}>
                    {isEditing ? (
                        <>
                            <button className={styles.actionBtn} onClick={handleEditSave} title="Spremi">✓</button>
                            <button className={styles.actionBtn} onClick={handleEditCancel} title="Odustani">✕</button>
                        </>
                    ) : (
                        <>
                            <button className={styles.actionBtn} onClick={() => setIsEditing(true)} title="Uredi">✎</button>
                            <button className={styles.deleteBtn} onClick={() => onDelete(entity.id)} title="Remove combatant">✕</button>
                        </>
                    )}
                </div>
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
