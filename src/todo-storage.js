class TodoStorage {
  #fs;
  #storagePath;

  constructor(fs, storagePath) {
    this.#fs = fs;
    this.#storagePath = storagePath;
  }

  #isFileExists() {
    return this.#fs.existsSync(this.#storagePath);
  }

  store(todosDetails, { onSuccess, onError }) {
    this.#fs.writeFile(
      this.#storagePath,
      JSON.stringify(todosDetails),
      (err) => {
        if (err) {
          console.log("TodoStorage Error:", err);
          onError();
          return;
        }
        onSuccess();
      }
    );
  }

  restore(onData) {
    if (!this.#isFileExists()) {
      this.#fs.writeFileSync(this.#storagePath, "[]");
    }

    const rawTodos = this.#fs.readFileSync(this.#storagePath, "utf-8");
    onData(JSON.parse(rawTodos));
  }
}

module.exports = { TodoStorage };
