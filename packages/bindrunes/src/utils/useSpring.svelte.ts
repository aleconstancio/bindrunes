import { isBrowser } from "./isBrowser";

type SpringOptions = {
	stiffness?: number;
	damping?: number;
	mass?: number;
};

export function useSpring(initial: number, options: SpringOptions = {}) {
	const { stiffness = 170, damping = 26, mass = 1 } = options;

	if (!isBrowser) {
		let _value = $state(initial);
		return {
			get value() {
				return _value;
			},
			set value(v: number) {
				_value = v;
			},
			set(_target: number) {
				_value = _target;
			},
			destroy() {},
		};
	}

	let value = $state(initial);
	let velocity = 0;
	let target = initial;
	let rafId = 0;
	let running = false;

	function tick() {
		const displacement = value - target;
		const springForce = -stiffness * displacement;
		const dampingForce = -damping * velocity;
		const acceleration = (springForce + dampingForce) / mass;

		velocity += acceleration * 0.016;
		value += velocity * 0.016;

		if (Math.abs(velocity) < 0.01 && Math.abs(displacement) < 0.01) {
			value = target;
			velocity = 0;
			running = false;
			return;
		}

		rafId = requestAnimationFrame(tick);
	}

	function set(newTarget: number) {
		target = newTarget;
		if (!running) {
			running = true;
			rafId = requestAnimationFrame(tick);
		}
	}

	return {
		get value() {
			return value;
		},
		set value(v: number) {
			target = v;
			if (!running) {
				running = true;
				rafId = requestAnimationFrame(tick);
			}
		},
		set,
		destroy() {
			cancelAnimationFrame(rafId);
			running = false;
		},
	};
}
