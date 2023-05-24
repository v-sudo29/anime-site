export default function limitCharacters(sentence, charLimit = 250) {
  let newSentence = null;
  if (sentence.length > charLimit) {
    newSentence = sentence.substring(0, charLimit) + '...'
    return newSentence
  } 
  return sentence
}