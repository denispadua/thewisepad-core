import { Lecture } from './lecture'

export class Module{    
    private readonly lectures: Array<Lecture> = []
    private name: string

    constructor(name: string){
        this.name = name
    }

    add (lecture: Lecture): void{
        this.lectures.push(lecture)
    }

    includes(lecture: Lecture): boolean{
        return this.lectures.includes(lecture)
    }
}