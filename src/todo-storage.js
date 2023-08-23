class TodoStorage {
  #fs;
  #storagePath;

  constructor(fs, storagePath) {
    this.#fs = fs;
    this.#storagePath = storagePath;
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
}

module.exports = { TodoStorage };
