class StringUtil {
  static camelCaseToSentenceCase(inputText) {
    var result = inputText.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
  static camelize(inputText) {
    return inputText.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  }
}
export default StringUtil
