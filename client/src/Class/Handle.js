class Handle {
  constructor(
    setIsOpen,
    isOpen,
    data,
    paginationData,
    funcPagination,
    message
  ) {
    this.isOpen = isOpen;
    this.setIsOpen = setIsOpen;
    this.data = data;
    this.message = message;
    this.paginationData = paginationData;
    this.funcPagination = funcPagination;
  }

  setPagination(paginationData, funcPagination) {
    this.paginationData = paginationData;
    this.funcPagination = funcPagination;
  }
  setData(data) {
    this.data = data;
  }

  setToggle(setIsOpen, isOpen) {
    this.isOpen = isOpen;
    this.setIsOpen = setIsOpen;
  }
  open() {
    this.setIsOpen(true);
    console.log("open");
  }
  close() {
    this.setIsOpen(false);
    console.log("close");
  }
  toggle() {
    this.setIsOpen(!this.isOpen);
  }
  change(e) {
    this.data((s) => ({ ...s, [e.target.name]: e.target.value }));
  }
  pagination(e, v) {
    console.log(v);
    this.funcPagination(v);
  }
}
export { Handle };
