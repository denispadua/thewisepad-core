import { ExistingModuleError } from '@/entities/errors/existing-module-error'
import { UnexistingElementError } from '@/entities/errors/unexisting-element-error'
import { Lecture } from '../../src/entities'
import { Link } from '../../src/entities/link'
import { Material } from '../../src/entities/material'
import { Pdf } from '../../src/entities/pdf'

describe('Lecture', () => {
  it('should be able to add further material to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    lecture.add(branchingPdf)
    expect(lecture.includes(branchingPdf)).toBeTruthy()
  })

  it('should be able to remove further material from lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    lecture.add(branchingPdf)
    lecture.remove(branchingPdf)
    expect(lecture.includes(branchingPdf)).toBeFalsy()
  })

  it('should not be able to remove unexisting material', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    const error = lecture.remove(branchingPdf).value as Error
    expect(error).toBeInstanceOf(UnexistingElementError)
  })

  it('should be able to add further links to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingLink: Material = new Link('Branching', 'http://page.com/branching.html')
    lecture.add(branchingLink)
    expect(lecture.includes(branchingLink)).toBeTruthy()
  })

  it('should not be able to add existing material to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    lecture.add(branchingPdf)
    const error = lecture.add(branchingPdf).value as ExistingModuleError
    expect(error.message).toEqual('')
    expect(lecture.includes(branchingPdf)).toBeTruthy()
  })

  it('should not be able to determine position of unexisting material', () => {
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'https://storage/branching.pdf')
    const error = lecture.position(branchingPdf).value as Error
    expect(error).toBeInstanceOf(UnexistingElementError)
  })
})
