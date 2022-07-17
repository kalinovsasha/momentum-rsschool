class ElementCreator {
  constructor(parent, tag = 'div,', styles, content = '') {
      (this.parent = parent), (this.tag = tag);
      this.styles = styles;
      this.content = content;
      this.element = document.createElement(`${tag}`);
      if (this.styles !== null) {
        this.element.classList.add(...this.styles);
      }
      this.element.innerText = this.content;
      if (parent !== null) {
          this.parent?.append(this.element);
      } else {
          document.body.append(this.element);
      }
  }
}