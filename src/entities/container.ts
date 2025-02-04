import { Either, left, right } from '@/shared/either'
import { ExistingPartError } from './errors/existing-part-error'
import { UnexistingElementError } from './errors/unexisting-element-error'
import { InvalidPositionError } from './errors/invalid-position-error'

import { Part } from './part'

export class Container<T extends Part> {
  private readonly parts: Array<T> = []

  get numberOfParts (): number {
    return this.parts.length
  }

  add (part: T): Either<ExistingPartError, void> {
    if (!this.includes(part)) {
      return right(this.push(part))
    }
    return left(new ExistingPartError())
  }

  private push (part: T): void {
    this.parts.push(part)
  }

  includes (part: T): boolean {
    return this.parts.find(p => p.equals(part) === true) !== undefined
  }

  move (part: T, to: number): Either<UnexistingElementError, void> {
    if (to > this.parts.length || to < 1) return left(new InvalidPositionError())
    if (!this.includes(part)) return left(new UnexistingElementError())
    const from = this.position(part).value as number
    return right(moveInArray(this.parts, from - 1, to - 1))
  }

  position (part: T): Either<UnexistingElementError, number> {
    const partInContainer = this.parts.find(p => p.equals(part))
    if (partInContainer === undefined) {
      return left(new UnexistingElementError())
    }
    return right(this.parts.indexOf(partInContainer) + 1)
  }

  remove (part: T): Either<UnexistingElementError, void> {
    if (!this.includes(part)) return left(new UnexistingElementError())
    const positionInArray = this.position(part).value as number - 1
    return right(this.splice(positionInArray, 1))
  }

  private splice (position: number, numberOfElements: number): void {
    this.parts.splice(position, numberOfElements)
  }
}

function moveInArray<T> (array: Array<T>, from: number, to: number): void {
  const element = array.splice(from, 1)[0]
  array.splice(to, 0, element)
}
