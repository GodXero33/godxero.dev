export default class ScrollTimeLine {
	constructor (scrollHeight) {
		this.scrollHeight = scrollHeight;
		this.scrollPos = 0;
		this.lastScroll = 0;
		this.touchStartY = 0;
		this.scrollProgress = 0;
		this.smoothFactor = 0.05;

		this.scrollPositionCallback = null;
	}

	#handleScrollDelta (delta) {
		this.scrollPos += delta;
		this.scrollPos = Math.max(0, Math.min(this.scrollHeight, this.scrollPos));
	}

	init (eventTrigger) {
		if (
			!(eventTrigger instanceof Window) &&
			!(eventTrigger instanceof HTMLElement)
		) return;

		eventTrigger.addEventListener('wheel', event => {
			this.#handleScrollDelta(event.deltaY * 1);
		});

		eventTrigger.addEventListener("touchstart", event => {
			this.touchStartY = event.touches[0].clientY;
		});

		eventTrigger.addEventListener("touchmove", event => {
			let deltaY = this.touchStartY - event.touches[0].clientY;
			this.touchStartY = event.touches[0].clientY;

			this.#handleScrollDelta(deltaY * 5);
		});

		eventTrigger.addEventListener("keydown", event => {
			const deltaMap = {
				ArrowDown: 100,
				ArrowUp: -100,
				ArrowRight: 100,
				ArrowLeft: -100,
				PageDown: 400,
				PageUp: -400,
				Home: -this.scrollHeight,
				End: this.scrollHeight
			};

			if (deltaMap[event.key]) {
				this.#handleScrollDelta(deltaMap[event.key]);
				event.preventDefault();
			}
		});
	}

	update () {
		this.lastScroll += (this.scrollPos - this.lastScroll) * this.smoothFactor;

		this.scrollProgress = this.lastScroll / this.scrollHeight;
	}
}
