class Switch_Tab{
	constructor() {
		this.state = true;
		this.element_p = $("<p class='switch'>");
		this.element_span = $("<span class='circle'>");
		this.element = this.element_p.append(this.element_span);
		this.__init__();
	}
	__init__() {
		var _ = this;
		this.element_p.click(function() {
			if (_.state) {
				_.state = false;
				_.close();
			} else {
				_.state = true;
				_.open();
			}
		})
	}
	open() {
		this.element_p.css({
			backgroundColor: "#67C23A"
		})
		this.element_span.css({
			right: '3px'
		})
	}
	close() {
		this.element_p.css({
			backgroundColor: "#dcdfe6"
		})
		this.element_span.css({
			right: '21px'
		})
	}
}