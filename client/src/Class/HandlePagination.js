class HandlePagination {
  constructor(setPages, pages) {
    this.setPages = setPages;
    this.pages = pages;
  }
  change(event, value) {
    this.setPages({ ...this.pages, page: value });
  }
}

export { HandlePagination };
