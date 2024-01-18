/**
 * Concatenates the first letters of the 2 provided strings in uppercase
 */
export function concatFirstLetters(word1: string, word2: string): string {
  return word1.charAt(0).toUpperCase() + word2.charAt(0).toUpperCase();
}
