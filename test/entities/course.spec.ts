import { Course, Module, Lecture} from '../../src/entities'

describe('Course',()=>{
    it('should be able to add  lectures to modules', ()=>{
        const module = new Module('Fundamentals')
        const lecture: Lecture = new Lecture({
            description: 'Branching',
            videoUrl: 'http://youtube.com/1234'
        })
        module.add(lecture)
        expect(module.includes(lecture)).toBeTruthy()
    })
    

})

