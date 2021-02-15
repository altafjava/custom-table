class SortingUtil {
  static sortAscending(products, thName, targetTh) {
    products.sort((a, b) => {
      return a[thName] < b[thName] ? -1 : 1
    })
    // targetTh.classList.add('sortby--opacity-asc')
    // targetTh.classList.remove('sortby--opacity-desc')
  }
  static addAscendingIcon(targetTh) {
    targetTh.classList.add('sortby--opacity-asc')
    targetTh.classList.remove('sortby--opacity-desc')
  }
  static sortDescending(products, thName, targetTh) {
    products.sort((a, b) => {
      return a[thName] > b[thName] ? -1 : 1
    })
    // targetTh.classList.add('sortby--opacity-desc')
    // targetTh.classList.remove('sortby--opacity-asc')
  }
  static addDescendingIcon(targetTh) {
    targetTh.classList.add('sortby--opacity-desc')
    targetTh.classList.remove('sortby--opacity-asc')
  }
}
export default SortingUtil
