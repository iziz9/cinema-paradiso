export const checkInputValid = (completeQuery: string) => {
  const consonantRegex = /^[ㄱ-ㅎ]+$/
  const vowelRegex = /^[ㅏ-ㅣ]+$/

  const isInputConsonant = !consonantRegex.test(completeQuery)
  const isInputVowel = !vowelRegex.test(completeQuery)
  const isValid = isInputConsonant && isInputVowel

  return isValid
}
