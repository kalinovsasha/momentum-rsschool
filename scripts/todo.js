class Todo {
  constructor(rootId) {
    if (document.getElementById(rootId)) {
      if (localStorage.getItem("todo")) {
        this.todos = JSON.parse(localStorage.getItem("todo"));
      } else {
        this.todos = [{ name: "Тест", done: true }];
      }
      this.isVisible = false;
      this.root = new ElementCreator(document.getElementById(rootId), "div", [
        "todo",
      ]).element;
      this.todoBtn = new ElementCreator(this.root, "div", ["todo-btn"]).element;
      this.todoBtnTxt = new ElementCreator(
        this.todoBtn,
        "div",
        ["todo-btn__txt"],
        "TODOList"
      ).element;
      this.ulContainer = new ElementCreator(this.root, "ul", [
        "todo-list",
      ]).element;
      this.render();
      this.todoBtn.onclick = () => {
        this.isVisible = !this.isVisible;
        this.ulContainer.classList.toggle("todo-list_visible");
      };
    }
  }

  render() {
    const input = new ElementCreator(this.ulContainer, "input", ["todosInput"])
      .element;
    input.setAttribute("placeholder", "Добавить [enter]");
    input.addEventListener("blur", () => {
      this.todos.push({ name: input.value, done: false });
      localStorage.setItem("todo", JSON.stringify(this.todos));
      this.ulContainer.innerHTML = "";
      this.render();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        //this.todos.push({ name: input.value, done: false });
        localStorage.setItem("todo", JSON.stringify(this.todos));
        this.ulContainer.innerHTML = "";
        this.render();
      }
    });
    for (let i = 0; i < this.todos.length; i++) {
      const todoStyles = !this.todos[i].done
        ? [`todo-list__item`, `todo-list__item${i}`]
        : [`todo-list__item`, `todo-list__item${i}`, "todo-list__item_done"];
      const todo = new ElementCreator(
        this.ulContainer,
        "li",
        todoStyles,
        `${this.todos[i].name}`
      ).element;
      const div = document.createElement("div");
      div.classList.add("todo-list__item__delete");
      div.onclick = () => {
        this.todos.splice(i, 1);
        this.ulContainer.innerHTML = "";
        this.render();
        localStorage.setItem("todo", JSON.stringify(this.todos));
      };
      todo.append(div);
      todo.onclick = () => {
        if (this.todos[i] != undefined && !this.todos[i].done) {
          this.todos[i].done = !this.todos[i].done;
          todo.classList.add("todo-list__item_done");
          localStorage.setItem("todo", JSON.stringify(this.todos));
        } else {
          if (this.todos[i] != undefined) {
            this.todos[i].done = !this.todos[i].done;
            todo.classList.remove("todo-list__item_done");
            localStorage.setItem("todo", JSON.stringify(this.todos));
          }
        }
      };
    }
  }
}
