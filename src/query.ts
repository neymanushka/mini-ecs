import FastBitSet from 'fastbitset';
import { Entity } from './entity';
import { Observable } from './observable';
export class Query {
	mask: FastBitSet;
	entities: Map<string, Entity> = new Map();

	onAddObservable: Observable = new Observable();
	onRemoveObservable: Observable = new Observable();

	constructor(mask: FastBitSet) {
		this.mask = mask;
	}

	addEntity(entity: Entity): void {
		this.entities.set(entity.id, entity);
		this.onAddObservable.notify(entity);
	}

	removeEntity(entity: Entity): void {
		this.entities.delete(entity.id);
		this.onRemoveObservable.notify(entity);
	}
}
