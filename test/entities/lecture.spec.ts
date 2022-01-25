import { Lecture } from '@/entities'
import { Material } from '@/entities/Material'
import { Pdf } from '@/entities/Pdf'

describe('Lecture', () => {
  it('Should be able to add further material to lectures', () => {
    const lecture: Lecture = new Lecture('Branching', 'http://youtube.com/1234')
    const branchingPdf: Material = new Pdf('Branching', 'http://storage/branching.pdf')

    lecture.add(branchingPdf)

    expect(lecture.includes(branchingPdf)).toBeTruthy()
  })
})
