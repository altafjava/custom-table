class StringUtil {
  static camelCaseToSentenceCase(inputText) {
    var result = inputText.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
}
export default StringUtil
