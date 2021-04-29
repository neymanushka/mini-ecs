import { World } from '../src/world';
import { System } from '../src/system';
import { Component } from '../src/component';

const world = new World();
class TestComponent0 implements Component {
	value = 'some value zero';
}
class TestComponent1 implements Component {
	value = 'some value one';
}
class TestComponent3 implements Component {
	value = 'some value two';
}

describe('World', () => {
	it('init', () => {
		expect(world).toBeDefined();
	});
	describe('Entity', () => {
		const entity = world.addEntity();
		it('add entity', () => {
			expect(entity).toBeDefined();
		});
		it('add component to entity', () => {
			entity.addComponent(new TestComponent0());
			const component = entity.getComponent(TestComponent0);
			expect(component).toBeDefined();
			expect(component.constructor.name).toBe('TestComponent0');
			expect(component.value).toBe('some value zero');
		});
		it('remove component from entity', () => {
			entity.removeComponent(TestComponent0);
			const component = entity.getComponent(TestComponent0);
			expect(component).toBeUndefined();
		});
		it('add entity by id', () => {
			const id = 'myEntityId';
			const entity = world.addEntity(id);
			expect(entity).toBeDefined();
			expect(world.entities.has(id)).toBe(true);
		});
	});
	describe('Query', () => {
		const entity0 = world.addEntity();
		entity0.addComponent(new TestComponent0());
		entity0.addComponent(new TestComponent1());
		const entity1 = world.addEntity();
		entity1.addComponent(new TestComponent0());
		entity1.addComponent(new TestComponent3());
		it('create query for one component', () => {
			const query = world.createQuery([TestComponent0]);
			expect(query).toBeDefined();
			expect(query.entities.size).toBe(2);
		});
		it('create query for two components', () => {
			const query = world.createQuery([TestComponent0, TestComponent1]);
			expect(query).toBeDefined();
			expect(query.entities.size).toBe(1);
		});
		it('is query cached', () => {
			const queriesCount = world.queries.size;
			const query = world.createQuery([TestComponent0]);
			expect(query).toBeDefined();
			expect(query.entities.size).toBe(2);
			expect(world.queries.size).toBe(queriesCount);
		});
		it('is query updated on entity add', () => {
			const query = world.createQuery([TestComponent0, TestComponent1]);
			const entity2 = world.addEntity();
			entity2.addComponent(new TestComponent0());
			entity2.addComponent(new TestComponent1());
			expect(query).toBeDefined();
			expect(query.entities.size).toBe(2);
		});
		it('is query updated on entity remove', () => {
			const query = world.createQuery([TestComponent0]);
			expect(query).toBeDefined();
			expect(query.entities.size).toBe(3);
			world.removeEntity(entity0);
			expect(query.entities.size).toBe(3);
			world.update();
			expect(query.entities.size).toBe(2);
		});
		it('is query updated on remove components', () => {
			const query = world.createQuery([TestComponent0]);
			expect(query).toBeDefined();
			expect(query.entities.size).toBe(2);
			entity1.removeComponent(TestComponent0);
			expect(query.entities.size).toBe(1);
		});
	});
	describe('System', () => {
		let testValue: string;
		class TestSystem implements System {
			world: World;
			constructor(world: World) {
				this.world = world;
			}
			update(someValue: string) {
				testValue = someValue;
			}
		}

		it('register system', () => {
			world.registerSystem(new TestSystem(world));
			expect(world.systems).toBeDefined();
			expect(world.systems.size).toBe(1);
			expect(world.systems.has(TestSystem.name)).toBe(true);
		});
		it('run system and pass value to update method', () => {
			const testString = 'someTestValue';
			world.update(testString);
			expect(testValue).toBe(testString);
		});
	});
});
