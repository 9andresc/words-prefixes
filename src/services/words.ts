import axios from 'axios'

async function getWords(prefix: string): Promise<string[]> {
  const wordsTextUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt'

  const response = await axios.get(wordsTextUrl, {
    responseType: 'stream'
  })
  const stream = response.data

  const words: string[] = []
  const filteredWords: string[] = []

  stream.on('data', (chunk: Buffer) => {
    const parsedWords = chunk
      .toString()
      .split('\n')
      .map((pw) => pw.trim())
    words.push(...parsedWords)
    for (const parsedWord of parsedWords) {
      if (filteredWords.length > 0 && !parsedWord.startsWith(prefix)) {
        stream.destroy()
        break
      }

      if (parsedWord.startsWith(prefix)) {
        filteredWords.push(parsedWord)
      }
    }
  })

  const onEnding = new Promise((resolve) => {
    stream.on('end', () => resolve())
  })
  await onEnding

  if (!prefix) {
    return words
  }

  return filteredWords
}

const wordsService = {
  getWords
}

export default wordsService
