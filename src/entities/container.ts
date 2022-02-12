import { Either, left, right } from '@/shared/either'
import { ExistingPartError } from './errors/existing-part-error'
import { UnexistingElementError } from './errors/unexisting-element-error'

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

  move (part: T, to: number): void {
    if (to > this.parts.length || to < 1) return
    const from = this.position(part)
    moveInArray(this.parts, from - 1, to - 1)
  }

  position (part: T): number {
    const partInContainer = this.parts.find(p => p.equals(part))
    if (partInContainer === undefined) {
      return undefined
    }
    return this.parts.indexOf(partInContainer) + 1
  }

  remove (part: T): Either<UnexistingElementError, void> {
    if (!this.includes(part)) return left(new UnexistingElementError())
    const positionInArray = this.position(part) - 1
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
