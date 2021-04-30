![Build Status](https://github.com/neymanushka/mini-ecs/actions/workflows/build.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/neymanushka/mini-ecs/badge.svg?branch=master&service=github)](https://coveralls.io/github/neymanushka/mini-ecs)

# lightweight ECS library

## Installation

```
npm install @robatbobat/mini-ecs
```

## Usage

```ts
import { World } from '@robatbobat/mini-ecs';

const world = new World();
```

## Creating Entity

```ts
const entity = world.addEntity();
```

or with string id for fast retrival:

```ts
const entity = world.addEntity('someId');
```

## Components

Components must implements Component interface:

```ts
import { Component } from '@robatbobat/mini-ecs';

export class SomeComponent implements Component {
	prop: 'test';
}
```

```ts
entity.addComponent(new SomeComponent());
entity.addComponent(new SomeOtherComponent());
```

or with chaining:

```ts
entity.addComponent(new SomeComponent()).addComponent(new SomeOtherComponent());
```

## System and Querying

Creating query:

To get all entities that have a specific set of components you must pass array of constructors to createQuery method:

```ts
const query = world.createQuery([SomeComponent, AnotherComponent]);
```

Iterate through entities:

```ts
query.entities.forEach((enemy) => {
	...
});
```

System example:

```ts
import { World, System, Query } from '@robatbobat/mini-ecs';

import { PositionComponent } from '../components/PositionComponent';
import { EnemyComponent } from '../components/EnemyComponent';

export class CollisionSystem implements System {
	world: World;

	enemies: Query;

	constructor(world: World) {
		this.world = world;
		this.enemies = this.world.createQuery([PositionComponent, EnemyComponent]);
	}

	update(dt: number) {
		this.enemies.entities.forEach((enemy) => {
			...
		});
	}
}
```

register system in world:

```ts
world.registerSystem(new CollisionSystem(world));
```

loop through registred systems:

```ts
world.update();
```

## Remove Entity

Entity is not deleted immediately,but marked as removed.

```ts
world.removeEntity(entity);
```

entity will be removed only at the end of `world.update()`

## Example project:

```
coming soon..
```

## License

Released under the MIT license.
