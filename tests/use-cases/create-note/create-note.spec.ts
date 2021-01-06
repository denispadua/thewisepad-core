import { UserData } from '../../../src/entities/user-data'
import { CreateNote } from '../../../src/use-cases/create-note/create-note'
import { NoteData } from '../../../src/use-cases/ports/note-data'
import { UserRepository } from '../../../src/use-cases/ports/user-repository'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { InMemoryNoteRepository } from '../repositories/in-memory-note-repository'
import { UserBuilder } from '../builders/user-builder'
import { NoteBuilder } from '../builders/note-builder'

describe('Create note use case', () => {
  test('should create note with valid owner and title', async () => {
    const emptyNoteRepository = new InMemoryNoteRepository([])
    const singleUserUserRepository = getSingleUserUserRepository()
    const usecase = new CreateNote(emptyNoteRepository, singleUserUserRepository)
    const validCreateNoteRequest: NoteData = NoteBuilder.aNote().build()
    const response: NoteData = (await usecase.perform(validCreateNoteRequest)).value as NoteData
    const validRegisteredUser: UserData = UserBuilder.aUser().build()
    const addedNotes: NoteData[] = await emptyNoteRepository.findAllNotesFrom(validRegisteredUser.id)
    expect(addedNotes.length).toEqual(1)
    expect((addedNotes[0]).title).toEqual(validCreateNoteRequest.title)
    expect(response.id).not.toBeUndefined()
  })

  test('should not create note with unregistered owner', async () => {
    const emptyNoteRepository = new InMemoryNoteRepository([])
    const singleUserUserRepository = getSingleUserUserRepository()
    const usecase = new CreateNote(emptyNoteRepository, singleUserUserRepository)
    const createNoteRequestWithUnregisteredOwner: NoteData =
      NoteBuilder
        .aNote()
        .withUnregisteredOwner()
        .build()
    const response: Error = (await usecase.perform(createNoteRequestWithUnregisteredOwner)).value as Error
    expect(response.name).toEqual('UnregisteredOwnerError')
  })

  test('should not create note with invalid title', async () => {
    const emptyNoteRepository = new InMemoryNoteRepository([])
    const singleUserUserRepository = getSingleUserUserRepository()
    const usecase = new CreateNote(emptyNoteRepository, singleUserUserRepository)
    const createNoteRequestWithInvalidTitle: NoteData =
      NoteBuilder
        .aNote()
        .withInvalidTitle()
        .build()
    const response: Error = (await usecase.perform(createNoteRequestWithInvalidTitle)).value as Error
    expect(response.name).toEqual('InvalidTitleError')
  })

  test('should not create note with existing title', async () => {
    const emptyNoteRepository = new InMemoryNoteRepository([])
    const singleUserUserRepository = getSingleUserUserRepository()
    const usecase = new CreateNote(emptyNoteRepository, singleUserUserRepository)
    const validCreateNoteRequest: NoteData =
      NoteBuilder
        .aNote()
        .build()
    await usecase.perform(validCreateNoteRequest)
    const error: Error = (await usecase.perform(validCreateNoteRequest)).value as Error
    expect(error.name).toEqual('ExistingTitleError')
  })

  function getSingleUserUserRepository (): UserRepository {
    const validRegisteredUser: UserData =
    UserBuilder
      .aUser()
      .build()
    const userDataArrayWithSingleUser: UserData[] = new Array(validRegisteredUser)
    return new InMemoryUserRepository(userDataArrayWithSingleUser)
  }
})
