class HandleSnack {
  constructor(setIsOpen, message) {
    this.message = message;
    this.setIsOpen = setIsOpen;
  }

  setMessage = (addM, deleteM, errorM) => {
    this.message = {
      add: addM,
      delete: deleteM,
      error: errorM,
    };
  };
  close() {
    this.setIsOpen({
      isOpen: false,
      message: "",
      severity: null,
    });
  }
  add(id) {
    this.setIsOpen({
      isOpen: true,
      message: this.message.add + id,
      severity: null,
    });
  }

  delete(id) {
    this.setIsOpen({
      isOpen: true,
      message: this.message.delete + id,
      severity: "warning",
    });
  }

  error(id) {
    this.setIsOpen({
      isOpen: true,
      message: this.message.error + id,
      severity: "error",
    });
  }
}
export { HandleSnack };
