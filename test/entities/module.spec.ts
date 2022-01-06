import { Course, Module, Lecture} from '../../src/entities'

describe('Module', ()=>{
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


        
    it('should not be able to add two lectures with same name', ()=>{
        const module = new Module('Fundamentals')
        const lecture: Lecture = new Lecture({
            description: 'Branching',
            videoUrl: 'http://youtube.com/1234'
        })

        const sameLecture = new Lecture({
            description: 'Branching',
            videoUrl: 'http://youtube.com/12'
        })

        module.add(lecture)
        module.add(sameLecture)
        expect(module.includes(lecture)).toBeTruthy()
        expect(module.includes(sameLecture)).toBeFalsy()
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

    it('should be able to rearrange lectures order', ()=>{
        const module = new Module('Fundamentals')
        const Branching: Lecture = new Lecture('Branching', 'http://youtube.com/Branching')
        const Commiting: Lecture = new Lecture('Commiting', 'http://youtube.com/Commiting')
        const Pushing: Lecture = new Lecture('Pushing', 'http://youtube.com/Pushing')
        
        module.add(Branching)
        module.add(Commiting)
        module.add(Pushing)

        module.move(Branching, 3)

        expect(module.position(Commiting)).toBe(1)
        expect(module.position(Pushing)).toBe(2)
        expect(module.position(Branching)).toBe(2)
    
    })


    it('should handle unexisting lecture',()=>{
        const module = new Module('Fundamentals')
        const Branching: Lecture = new Lecture('Branching', 'http://youtube.com/Branching')

        expect(module.position(Branching)).toBeUndefined()
    })

    it('should handle invalid lecture position while rearranging',()=>{
        const module = new Module('Fundamentals')
        const Branching: Lecture = new Lecture('Branching', 'http://youtube.com/Branching')
        const Commiting: Lecture = new Lecture('Commiting', 'http://youtube.com/Commiting')
        const Pushing: Lecture = new Lecture('Pushing', 'http://youtube.com/Pushing')

        module.add(Branching)
        module.add(Commiting)
        module.add(Pushing)

        module.move(Branching, 10)

        expect(module.position(Branching)).toBe(1)
        expect(module.position(Commiting)).toBe(2)
        expect(module.position(Pushing)).toBe(3)

    })

    
    it('should handle invalid lecture position (negative) while rearranging',()=>{
        const module = new Module('Fundamentals')
        const Branching: Lecture = new Lecture('Branching', 'http://youtube.com/Branching')
        const Commiting: Lecture = new Lecture('Commiting', 'http://youtube.com/Commiting')
        const Pushing: Lecture = new Lecture('Pushing', 'http://youtube.com/Pushing')

        module.add(Branching)
        module.add(Commiting)
        module.add(Pushing)

        module.move(Branching, 0)

        expect(module.position(Branching)).toBe(1)
        expect(module.position(Commiting)).toBe(2)
        expect(module.position(Pushing)).toBe(3)

    })


})