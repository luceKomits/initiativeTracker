import React, { useState, useEffect, useMemo } from 'react';
import EntityCard from './components/EntityCard';
import CreateEntityForm from './components/CreateEntityForm';
import TurnControls from './components/TurnControls';

const App = () => {
  // Load from local storage or default
  const [entities, setEntities] = useState(() => {
    const saved = localStorage.getItem('dnd_tracker_entities');
    return saved ? JSON.parse(saved) : [];
  });

  const [round, setRound] = useState(() => {
    return parseInt(localStorage.getItem('dnd_tracker_round')) || 1;
  });

  const [activeEntityId, setActiveEntityId] = useState(() => {
    return localStorage.getItem('dnd_tracker_activeId') || null;
  });

  // Save on change
  useEffect(() => {
    localStorage.setItem('dnd_tracker_entities', JSON.stringify(entities));
    localStorage.setItem('dnd_tracker_round', round);
    localStorage.setItem('dnd_tracker_activeId', activeEntityId || '');
  }, [entities, round, activeEntityId]);

  // Derived sorted list
  const sortedEntities = useMemo(() => {
    return [...entities].sort((a, b) => {
      if (b.initiative !== a.initiative) {
        return b.initiative - a.initiative;
      }
      // Stable sort fallback or by name? Let's just use insertion order (id roughly time)
      // or just keep it simple.
      return 0;
    });
  }, [entities]);

  const addEntity = (entityData) => {
    const newEntity = {
      ...entityData,
      id: crypto.randomUUID()
    };
    setEntities(prev => [...prev, newEntity]);
    // If first entity, maybe set active? No, let user start combat manually.
  };

  const updateEntity = (id, updates) => {
    setEntities(prev => prev.map(ent =>
      ent.id === id ? { ...ent, ...updates } : ent
    ));
  };

  const deleteEntity = (id) => {
    setEntities(prev => prev.filter(ent => ent.id !== id));
    if (activeEntityId === id) {
      setActiveEntityId(null); // Or advance? simplified to null/reset for now/active logic handles it next click logic potentially, but keeps it safe.
    }
  };

  const nextTurn = () => {
    if (sortedEntities.length === 0) return;

    if (!activeEntityId) {
      // Start combat
      setActiveEntityId(sortedEntities[0].id);
      setRound(1);
      return;
    }

    const currentIndex = sortedEntities.findIndex(e => e.id === activeEntityId);
    if (currentIndex === -1) {
      // Current active was deleted or lost, restart from top
      setActiveEntityId(sortedEntities[0].id);
      return;
    }

    const nextIndex = (currentIndex + 1) % sortedEntities.length;

    if (nextIndex === 0) {
      setRound(r => r + 1);
    }

    const nextEntity = sortedEntities[nextIndex];

    // Auto-apply bleeding
    let damage = 0;
    if (nextEntity.conditions.includes('Light Bleeding')) damage += 10;
    if (nextEntity.conditions.includes('Heavy Bleeding')) damage += 20;

    if (damage > 0) {
      updateEntity(nextEntity.id, { hp: nextEntity.hp - damage });
    }

    setActiveEntityId(nextEntity.id);
  };

  const resetRound = () => {
    setRound(1);
    setActiveEntityId(null);
  };

  const clearAll = () => {
    setEntities([]);
    resetRound();
  };

  return (
    <div className="app-layout">
      <div className="container">
        <h1>INITIATIVE TRACKER</h1>

        <CreateEntityForm onAdd={addEntity} />

        <div className="entity-list">
          {sortedEntities.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
              No combatants yet. Add some above!
            </div>
          ) : (
            sortedEntities.map(entity => (
              <EntityCard
                key={entity.id}
                entity={entity}
                active={activeEntityId === entity.id}
                onUpdate={updateEntity}
                onDelete={deleteEntity}
              />
            ))
          )}
        </div>

        {/* Spacer for bottom bar */}
        <div style={{ height: '100px' }}></div>
      </div>

      <TurnControls
        round={round}
        onNextTurn={nextTurn}
        onReset={resetRound}
        onClear={clearAll}
      />
    </div>
  );
};

export default App;
