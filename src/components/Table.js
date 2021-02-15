import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import products from '../data/products'
import CsvUtil from '../util/CsvUtil'
import PaginationUtil from '../util/PaginationUtil'
import SortingUtil from '../util/SortingUtil'
import './Table.css'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredProducts: products,
      searchedProducts: products,
      tableHeading: {
        name: {
          asc: true,
          desc: false,
        },
      },
      page: 1,
      start: 0,
      end: 0,
      showNoOfRecords: 10,
      totalRecords: 0,
      totalPages: 1,
    }
  }
  componentDidMount() {
    const { searchedProducts, showNoOfRecords } = this.state
    const tr = searchedProducts.length
    const tp = Math.ceil(tr / showNoOfRecords)
    PaginationUtil.doPagination(1, tp)
    SortingUtil.sortAscending(searchedProducts, 'name')
    SortingUtil.addAscendingIcon(document.getElementById('name'))
    this.setState({
      totalRecords: tr,
      totalPages: tp,
      start: 1,
      end: showNoOfRecords > tr ? tr : showNoOfRecords,
      filteredProducts: searchedProducts.slice(0, showNoOfRecords),
    })
  }

  handleShowNoOfRecords = (e) => {
    const { searchedProducts } = this.state
    const noOfRecords = parseInt(e.target.value)
    const tr = searchedProducts.length
    const tp = Math.ceil(tr / noOfRecords)
    PaginationUtil.doPagination(1, tp)
    this.setState({
      showNoOfRecords: noOfRecords,
      page: 1,
      totalPages: tp,
      start: 1,
      end: noOfRecords > tr ? tr : noOfRecords,
      filteredProducts: searchedProducts.slice(0, noOfRecords),
    })
  }

  handleSearch = (e) => {
    const { tableHeading, showNoOfRecords, page } = this.state
    const searchText = e.target.value
    for (const [key, value] of Object.entries(tableHeading)) {
      if (value['asc']) {
        SortingUtil.sortAscending(products, key)
        break
      } else if (value['desc']) {
        SortingUtil.sortDescending(products, key)
        break
      }
    }
    const sp = products.filter((obj) => Object.values(obj).some((val) => val.toString().includes(searchText)))
    const tr = sp.length
    const tp = Math.ceil(tr / showNoOfRecords)
    const startIndex = (page - 1) * showNoOfRecords
    let endIndex = page * showNoOfRecords
    endIndex = endIndex > tr ? tr : endIndex
    PaginationUtil.doPagination(page, tp)
    this.setState({
      totalRecords: tr,
      totalPages: tp,
      end: endIndex,
      searchedProducts: sp,
      filteredProducts: sp.slice(startIndex, endIndex),
    })
  }

  handleExport = (e, type) => {
    const { filteredProducts } = this.state
    if (type === 'EXCEL') {
      CsvUtil.convertJsonToCsv(filteredProducts, 'Electronics Products', true)
    }
  }

  handleSorting = (e) => {
    const { tableHeading, searchedProducts, start, end } = this.state
    const targetTh = e.target
    const thName = targetTh.innerText.toLowerCase()
    const tableHeadingKeys = Object.keys(tableHeading)
    const oldTableHeading = {}
    if (tableHeadingKeys.length > 0) {
      for (let key of tableHeadingKeys) {
        oldTableHeading[key] = {
          asc: false,
          desc: false,
        }
      }
    }
    const newTableHeading = {
      ...oldTableHeading,
      [thName]:
        tableHeading[thName] === undefined
          ? {
              asc: true,
              desc: false,
            }
          : tableHeading[thName].asc
          ? {
              asc: false,
              desc: true,
            }
          : {
              asc: true,
              desc: false,
            },
    }
    this.removeSortIconOpacity()
    if (newTableHeading[thName].desc) {
      SortingUtil.sortDescending(searchedProducts, thName)
      SortingUtil.addDescendingIcon(targetTh)
    } else {
      SortingUtil.sortAscending(searchedProducts, thName)
      SortingUtil.addAscendingIcon(targetTh)
    }
    this.setState({
      filteredProducts: searchedProducts.slice(start - 1, end),
      tableHeading: { ...newTableHeading },
    })
  }

  handlePagination = (e) => {
    const { page, totalPages, showNoOfRecords, totalRecords, searchedProducts } = this.state
    const pageText = e.target.innerText
    let pageNo = page
    if (pageText.toLowerCase() === 'previous') {
      if (pageNo > 1) {
        pageNo = pageNo - 1
      }
    } else if (pageText.toLowerCase() === 'next') {
      if (pageNo < totalPages) {
        pageNo = pageNo + 1
      }
    } else {
      pageNo = parseInt(pageText)
    }
    PaginationUtil.doPagination(pageNo, totalPages)
    const startIndex = (pageNo - 1) * showNoOfRecords
    let endIndex = pageNo * showNoOfRecords
    endIndex = endIndex > totalRecords ? totalRecords : endIndex
    this.setState({
      start: startIndex + 1,
      end: endIndex,
      filteredProducts: searchedProducts.slice(startIndex, endIndex),
      page: pageNo,
    })
  }
  removeSortIconOpacity = () => {
    const sortbyElements = document.querySelectorAll('.sortby')
    for (let sortbyElement of sortbyElements) {
      sortbyElement.classList.remove('sortby--opacity-asc')
      sortbyElement.classList.remove('sortby--opacity-desc')
    }
  }

  render() {
    const { totalPages, page, filteredProducts, start, end, totalRecords } = this.state
    const liElements = []
    const maxDisplayPage = 8
    const additionNo = page - (Math.floor(maxDisplayPage / 2) + 1)
    const maxAddition = totalPages > maxDisplayPage ? totalPages - maxDisplayPage : 0
    let startsFrom = 1
    let endTo = totalPages > maxDisplayPage ? maxDisplayPage : totalPages
    if (additionNo > maxAddition) {
      startsFrom = maxAddition + 1
      endTo = totalPages
    } else if (additionNo > 0) {
      startsFrom = startsFrom + additionNo
      endTo = endTo + additionNo
    }
    for (let i = startsFrom; i <= endTo; i++) {
      liElements.push(
        <li className='page-item' key={i}>
          <button className='page-link' onClick={this.handlePagination}>
            {i}
          </button>
        </li>
      )
    }
    return (
      <div className='container'>
        <div className='toolbar-heading'>
          <div>
            <span>Show</span>
            <select onChange={this.handleShowNoOfRecords}>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
            <span>Records</span>
          </div>
          <div className='search'>
            <input type='text' className='searchBox' placeholder='Search' onKeyUp={this.handleSearch} />
          </div>
          <div className='export-container'>
            <div className='export' onClick={(e) => this.handleExport(e, 'EXCEL')}>
              <img src='/assets/excel-sheet.svg' alt='Excel' width='100%' height='100%' />
            </div>
            <div className='export' onClick={(e) => this.handleExport(e, 'PDF')}>
              <img src='/assets/adobe-reader.svg' alt='PDF' width='100%' height='100%' />
            </div>
          </div>
        </div>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th id='id' className='sortby' onClick={this.handleSorting}>
                Id
              </th>
              <th id='name' className='sortby' onClick={this.handleSorting}>
                Name
              </th>
              <th id='price' className='sortby' onClick={this.handleSorting}>
                Price
              </th>
              <th id='quantity' className='sortby' onClick={this.handleSorting}>
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, i) => {
              return (
                <tr key={i}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filteredProducts.length === 0 && <div className='text-center'>No matching records found</div>}
        {filteredProducts.length > 0 && (
          <div className='row'>
            <div className='col-md-5'>
              Showing {start} to {end} of {totalRecords} records
            </div>
            <div className='col-md-7'>
              <div className='pagination-container'>
                <ul className='pagination'>
                  <li className='page-item' id='previous'>
                    <button className='page-link' onClick={this.handlePagination}>
                      Previous
                    </button>
                  </li>
                  {liElements}
                  <li className='page-item' id='next'>
                    <button className='page-link' onClick={this.handlePagination}>
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Table
