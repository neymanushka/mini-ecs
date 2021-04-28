import { World } from './world';
import { Component } from './component';
import FastBitSet from 'fastbitset';

export class Entity {
	world: World;
	mask: FastBitSet;
	id: string;
	components: Map<string, Component>;
	removed: boolean = false;

	constructor(id: string, world: World) {
		this.world = world;
		this.id = id;
		this.mask = new FastBitSet();
		this.components = new Map();
	}

	getComponent<T extends Component>(ctor: new (...args: any[]) => T): T {
		return this.components.get(ctor.name) as T;
	}

	addComponent(component: Component): Entity {
		const bit = this.world.registerComponent(component.constructor.name);
		this.mask.add(bit);
		this.components.set(component.constructor.name, component);
		this.world.updateQueries(this);
		return this;
	}

	removeComponent<T extends Component>(ctor: new () => T): void {
		const bit = this.world.registerComponent(ctor.name);
		this.mask.remove(bit);
		this.components.delete(ctor.name);
		this.world.updateQueries(this);
	}
}
