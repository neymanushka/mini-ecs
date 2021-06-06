import FastBitSet from 'fastbitset';
import { Component } from './component';
import { Query } from './query';
import { Entity } from './entity';
import { System } from './system';

/*eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Constructor<T extends unknown> = new (...args: any[]) => T;
export class World {
	nextId = 1;

	components: Map<string, number> = new Map();
	entities: Map<string, Entity> = new Map();
	queries: Map<string, Query> = new Map();
	systems: Map<string, System> = new Map();

	removedEntities: Set<Entity> = new Set();

	registerSystem(system: System): void {
		this.systems.set(system.constructor.name, system);
	}

	update(...args: unknown[]): void {
		for (const system of this.systems.values()) {
			system.update(...args);
		}
		for (const entity of this.removedEntities.values()) {
			for (const query of this.queries.values()) {
				query.removeEntity(entity);
			}
			this.entities.delete(entity.id);
		}
		this.removedEntities.clear();
	}

	updateQueries(entity: Entity): void {
		for (const query of this.queries.values()) {
			const diff = query.mask.difference_size(entity.mask);
			const has = query.entities.has(entity.id);
			if (!has && diff === 0) {
				query.addEntity(entity);
			} else if (has && diff !== 0) {
				query.removeEntity(entity);
			}
		}
	}

	createQuery(ctors: Constructor<Component>[]): Query {
		const mask = new FastBitSet();
		ctors.forEach((ctor) => mask.add(this.registerComponent(ctor.name)));

		const queryKey = mask.toString();
		let query = this.queries.get(queryKey);

		if (!query) {
			query = new Query(mask);
			for (const entity of this.entities.values()) {
				if (mask.difference_size(entity.mask) === 0) query.addEntity(entity);
			}
			this.queries.set(queryKey, query);
		}
		return query;
	}

	registerComponent(componentId: string): number {
		let bit = this.components.get(componentId);
		if (bit === undefined) {
			bit = this.components.size;
			this.components.set(componentId, bit);
		}
		return bit;
	}

	removeEntity(entity: Entity): void {
		entity.removed = true;
		this.removedEntities.add(entity);
	}

	addEntity(entityId?: string): Entity {
		const id = entityId ? entityId : (this.nextId++).toString();
		const entity = new Entity(id, this);
		this.entities.set(id, entity);
		return entity;
	}
}
