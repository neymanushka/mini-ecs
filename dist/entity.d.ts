import { World } from './world';
import { Component } from './component';
import FastBitSet from 'fastbitset';
export declare class Entity {
    world: World;
    mask: FastBitSet;
    id: string;
    components: Map<string, Component>;
    removed: boolean;
    constructor(id: string, world: World);
    getComponent<T extends Component>(ctor: new (...args: any[]) => T): T;
    addComponent(component: Component): Entity;
    removeComponent<T extends Component>(ctor: new () => T): void;
}
