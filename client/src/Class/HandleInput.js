class HandleInput {
  constructor(setChange, data) {
    this.setChange = setChange;
    this.data = data;
  }
  change(e) {
    this.setChange({ ...this.data, [e.target.name]: e.target.value });
  }
}

export { HandleInput };
