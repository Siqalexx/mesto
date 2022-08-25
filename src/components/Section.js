class Section {
	constructor({ renderer, containerSelector }) {
		this._renderer = renderer;
		this._containerSelector = containerSelector;
	}

	addItem(item) {
		this._containerSelector.prepend(item);
	}

	appendItem(item) {
		this._containerSelector.append(item);
	}

	prependItem(item) {
		this._containerSelector.prepend(item);
	}

	renderItems(items) {
		items.forEach(item => {
			const templateItem = this._renderer(item);

			this.appendItem(templateItem);
		});
	}
}
export default Section;
