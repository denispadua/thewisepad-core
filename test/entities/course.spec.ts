import { Course, Module, Lecture } from '../../src/entities'

describe('Course', () => {
  it('should be able to add modules to courses', () => {
    const course = new Course('azure-devops',
      'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const module = new Module('Fundamentals')
    const lecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    module.add(lecture)
    course.add(module)
    expect(course.includes(module)).toBeTruthy()
  })

  it('should be able to rearrange the order of modules', () => {
    const course = new Course('azure-devops', 'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const fundamentalModule = new Module('Fundamentals')
    const branchingLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    fundamentalModule.add(branchingLecture)

    const courseOverviewModule = new Module('Course Overview')
    const courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/789')
    courseOverviewModule.add(courseOverviewLecture)

    const gitModule = new Module('Source control with Git on Azure DevOps')
    const introductionLecture = new Lecture('Introduction Lecture', 'http://youtube.com/abcdef')
    gitModule.add(introductionLecture)

    course.add(fundamentalModule)
    course.add(courseOverviewModule)
    course.add(gitModule)

    course.move(courseOverviewModule, 1)

    expect(course.position(courseOverviewModule)).toBe(1)
    expect(course.position(fundamentalModule)).toBe(2)
    expect(course.position(gitModule)).toBe(3)
  })

  it('should handle exceeding position while rearranging', () => {
    const course = new Course('azure-devops', 'Continuous Delivery and DevOps with Azure DevOps: Source Control with Git')
    const fundamentalModule = new Module('Fundamentals')
    const branchingLecture: Lecture = new Lecture('Branching', 'https://youtube.com/1234')
    fundamentalModule.add(branchingLecture)

    const courseOverviewModule = new Module('Course Overview')
    const courseOverviewLecture = new Lecture('Course Overview', 'https://youtube.com/789')
    courseOverviewModule.add(courseOverviewLecture)

    const gitModule = new Module('Source control with Git on Azure DevOps')
    const introductionLecture = new Lecture('Introduction Lecture', 'http://youtube.com/abcdef')
    gitModule.add(introductionLecture)

    course.add(fundamentalModule)
    course.add(courseOverviewModule)
    course.add(gitModule)

    course.move(fundamentalModule, 10)

    expect(course.position(fundamentalModule)).toBe(1)
    expect(course.position(courseOverviewModule)).toBe(2)
    expect(course.position(gitModule)).toBe(3)
  })
})
