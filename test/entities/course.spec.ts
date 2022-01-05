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
    
    it('should not be able to add the same lectures twice in a module', ()=>{
        const module = new Module('Fundamentals')
        const lecture: Lecture = new Lecture({
            description: 'Branching',
            videoUrl: 'http://youtube.com/1234'
        })

        const sameLecture = new Lecture({
            description: 'Branching',
            videoUrl: 'http://youtube.com/1234'
        })

        module.add(lecture)
        module.add(sameLecture)
        expect(module.includes(lecture)).toBeTruthy()
        expect(module.numberOfLectures).toBe(1)
    })

    it('Should be able to add modules to courses', ()=>{
        const course = new Course('azure-devops', 'Continous Delivery and DevOps with Azure DevOps: Source control with git')
        const module = new Module('Fundamentals')
        const lecture: Lecture = {
            description: 'Branching',
            videoUrl: 'http://youtube.com/1234'
        }
        module.add(lecture)
        course.add(module)
        expect(course.includes(module)).toBeTruthy()
    })
})

