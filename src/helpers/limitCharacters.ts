export default function limitCharacters(sentence: string, charLimit = 250): string {
  let newSentence = null;

  if (sentence.length > charLimit) {
    newSentence = sentence.substring(0, charLimit).trim() + '...'
    return newSentence
  } 
  return sentence
}