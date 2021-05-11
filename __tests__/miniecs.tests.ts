import { World } from '../src/world';
import { System } from '../src/system';
import { Component } from '../src/component';

class TestComponent0 implements Component {
	value = 'some value zero';
}
class TestComponent1 implements Component {
	value = 'some value one';
}
class TestComponent3 implements Component {
	value = 'some value two';
}
class TestComponentWithArgs implements Component {
	numberValue: number;
	stringValue: string;
	constructor(numberValue: number, stringValue: string) {
		this.numberValue = numberValue;
		this.stringValue = stringValue;
	}
}

describe('World', () => {
	const world = new World();
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
		it('add components with args', () => {
			const entity = world.addEntity();
			entity
				.addComponent(new TestComponent0())
				.addComponent(new TestComponentWithArgs(12345, 'test12345'));
			const component = entity.getComponent(TestComponentWithArgs);
			expect(entity).toBeDefined();
			expect(entity.components.size).toBe(2);
			expect(component).toBeDefined();
			expect(component.numberValue).toBe(12345);
			expect(component.stringValue).toBe('test12345');
		});
		it('does entity have this component', () => {
			const entity = world.addEntity();
			entity.addComponent(new TestComponent0()).addComponent(new TestComponent3());
			expect(entity.hasComponent(TestComponent0)).toBe(true);
			expect(entity.hasComponent(TestComponent3)).toBe(true);
			expect(entity.hasComponent(TestComponent1)).toBe(false);
		});
	});
	describe('Query', () => {
		const world = new World();
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
		test('iterate through entities', () => {
			const entity = world.addEntity();
			entity
				.addComponent(new TestComponent0())
				.addComponent(new TestComponentWithArgs(12345, 'test12345'));
			const query = world.createQuery([TestComponent0, TestComponentWithArgs]);

			query.entities.forEach((entity) => {
				const testComponent0 = entity.getComponent(TestComponent0);
				expect(testComponent0).toBeDefined();
				const testComponent1 = entity.getComponent(TestComponent0);
				expect(testComponent1).toBeDefined();
			});
		});
	});
	describe('System', () => {
		const world = new World();

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
