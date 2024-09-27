import fs from 'node:fs'
import Papa from 'papaparse'
import { Word } from '../types/word.js'

export const loadWordListCsv = () => {
  const content = fs.readFileSync('assets/small_wordlist.csv', 'utf-8')
  const { data } = Papa.parse<Word>(content, { header: true, skipEmptyLines: true })

  return data
}
