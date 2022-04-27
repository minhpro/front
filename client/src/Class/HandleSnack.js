class HandleSnack {
  constructor(setIsOpen, message) {
    this.message = message;
    this.setIsOpen = setIsOpen;
  }

  setMessage = (addM, deleteM, errorM, customM) => {
    this.message = {
      add: addM,
      delete: deleteM,
      error: errorM,
      custom: customM,
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

  custom(id) {
    this.setIsOpen({
      isOpen: true,
      message: this.message.custom,
      severity: "error",
    });
  }
}
export { HandleSnack };
