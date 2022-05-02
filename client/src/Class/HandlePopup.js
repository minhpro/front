class HandlePopup {
  constructor(setIsOpen, message, title) {
    this.message = message;
    this.setIsOpen = setIsOpen;
    this.title = title;
  }

  setMessage = (mess) => {
    this.message = mess;
  };

  setTitle = (title) => {
    this.title = title;
  };
  open() {
    this.setIsOpen(true);
    console.log("open");
  }
  close() {
    this.setIsOpen(false);
    console.log("close");
  }
}
export { HandlePopup };
