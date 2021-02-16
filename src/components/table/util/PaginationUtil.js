class PaginationUtil {
  static activePage = (pageNoText) => {
    const pageItems = document.querySelectorAll('.page-item')
    for (let pageItem of pageItems) {
      pageItem.classList.remove('active')
    }
    if (pageItems.length > 0) {
      const li = Array.from(pageItems).find((pageItemElement) => pageItemElement.textContent === pageNoText)
      li.classList.add('active')
    }
  }
  static enableDisablePagination = (pageNo, totalPages) => {
    const previousElement = document.getElementById('previous')
    if (previousElement) {
      if (pageNo === 1) {
        previousElement.classList.add('disabled')
      } else {
        previousElement.classList.remove('disabled')
      }
    }
    const nextElement = document.getElementById('next')
    if (nextElement) {
      if (pageNo === totalPages) {
        nextElement.classList.add('disabled')
      } else {
        nextElement.classList.remove('disabled')
      }
    }
  }
  static doPagination(pageNo, totalPages) {
    this.activePage(pageNo.toString())
    this.enableDisablePagination(pageNo, totalPages)
  }
}
export default PaginationUtil
