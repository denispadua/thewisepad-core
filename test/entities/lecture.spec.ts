import { Lecture } from '@/entities'
import { Link } from '@/entities/Link'
import { Material } from '@/entities/Material'
import { Pdf } from '@/entities/Pdf'

describe('Lecture', () => {
  it('Should be able to add further material to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'http://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'http://storage/branching.pdf')

    lecture.add(branchingPdf)

    expect(lecture.includes(branchingPdf)).toBeTruthy()
  })

  it('Should be able to remove further material to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'http://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'http://storage/branching.pdf')

    lecture.add(branchingPdf)
    lecture.remove(branchingPdf)

    expect(lecture.includes(branchingPdf)).toBeFalsy()
  })

  it('Should be able to add further links to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'http://youtube.com/1234')
    const branchingLink: Material = new Link('Branching', 'http://storage/branching.html')

    lecture.add(branchingLink)

    expect(lecture.includes(branchingLink)).toBeTruthy()
  })
})
