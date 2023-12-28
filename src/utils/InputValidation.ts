export const checkInputValid = (completeQuery: string) => {
  // 공백문자 입력 케이스 추가

  const consonantRegex = /^[ㄱ-ㅎ]+$/
  const vowelRegex = /^[ㅏ-ㅣ]+$/

  const isOnlyConsonant = consonantRegex.test(completeQuery)
  const isOnlyVowel = vowelRegex.test(completeQuery)
  const isValid = !isOnlyConsonant && !isOnlyVowel

  return isValid
}
