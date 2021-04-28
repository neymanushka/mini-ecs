import FastBitSet from 'fastbitset';
import { Entity } from './entity';

export class Query {
	mask: FastBitSet;
	entities: Map<string, Entity> = new Map();

	constructor(mask: FastBitSet) {
		this.mask = mask;
	}
}
