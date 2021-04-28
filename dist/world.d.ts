import { Component } from './component';
import { Query } from './query';
import { Entity } from './entity';
import { System } from './system';
export declare class World {
    nextId: number;
    components: Map<string, number>;
    entities: Map<string, Entity>;
    queries: Map<string, Query>;
    systems: Map<string, System>;
    removedEntities: Set<Entity>;
    registerSystem(system: System): void;
    update(...args: any): void;
    updateQueries(entity: Entity): void;
    createQuery(ctors?: (new (...args: any[]) => Component)[]): Query;
    registerComponent(componentId: string): number;
    removeEntity(entity: Entity): void;
    addEntity(entityId?: string): Entity;
}
