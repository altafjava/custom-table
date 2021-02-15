class CsvUtil {
  static convertJsonToCsv(data, fileName, showHeader) {
    var arrData = data
    let csvData = ''
    if (showHeader) {
      let row = ''
      for (let index in arrData[0]) {
        row += index + ','
      }
      row = row.slice(0, -1)
      csvData += row + '\r\n'
    }
    for (var i = 0; i < arrData.length; i++) {
      let row = ''
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",'
      }
      row.slice(0, row.length - 1)
      csvData += row + '\r\n'
    }
    if (csvData === '') {
      console.log('Invalid Json Data')
      return
    }
    this.downloadFile(fileName, csvData)
  }
  static downloadFile(fileName, csvData) {
    fileName = fileName.replace(/ /g, '_')
    var uri = 'data:text/csv;charset=utf-8,' + escape(csvData)
    var link = document.createElement('a')
    link.href = uri
    link.style = 'visibility:hidden'
    link.download = fileName + '.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
export default CsvUtil
