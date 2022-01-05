import { Lecture } from "./lecture"
import { Module } from "./Module"

export class Course{
    public reference: string
    public description: string
    private modules: Array<Module> = []
    
    constructor(reference: string, description: string){
        this.reference = reference
        this.description = description
    }
    
    add(module: Module){
        this.modules.push(module)
    }

    includes(module: Module): boolean{
        return this.modules.includes(module)
    }
}