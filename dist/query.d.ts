import FastBitSet from 'fastbitset';
import { Entity } from './entity';
export declare class Query {
    mask: FastBitSet;
    entities: Map<string, Entity>;
    constructor(mask: FastBitSet);
}
