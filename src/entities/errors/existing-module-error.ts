export class ExistingModuleError extends Error{

    constructor(){
        super('Module alredy exists in course');
    }
}