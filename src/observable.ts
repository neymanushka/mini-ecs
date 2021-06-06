export class Observable {
	observers: Set<CallableFunction> = new Set();
	add(callback: CallableFunction): void {
		this.observers.add(callback);
	}
	remove(callback: CallableFunction): void {
		this.observers.delete(callback);
	}
	notify<T>(value: T): void {
		for (const observer of this.observers.values()) {
			observer(value);
		}
	}
}
