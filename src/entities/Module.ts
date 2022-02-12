import { Either } from '@/shared/either'
import { Container } from './container'
import { ExistingPartError } from './errors/existing-part-error'
import { UnexistingElementError } from './errors/unexisting-element-error'
import { Lecture } from './lecture'
import { Part } from './part'

export class Module implements Part {
  private readonly lectures: Container<Lecture> = new Container<Lecture>()
  public readonly name: string
  constructor (name: string) {
    this.name = name
  }

  get numberOfLectures (): number {
    return this.lectures.numberOfParts
  }

  add (lecture: Lecture): Either<ExistingPartError, void> {
    return this.lectures.add(lecture)
  }

  includes (lecture: Lecture): boolean {
    return this.lectures.includes(lecture)
  }

  move (lecture: Lecture, position: number): void {
    this.lectures.move(lecture, position)
  }

  position (lecture: Lecture): Either<UnexistingElementError,number> {
    return this.lectures.position(lecture)
  }

  remove (lecture: Lecture): Either<UnexistingElementError,void> {
    return this.lectures.remove(lecture)
  }

  equals (module: Module): boolean {
    return this.name === module.name
  }
}
