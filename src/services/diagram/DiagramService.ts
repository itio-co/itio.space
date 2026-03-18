import { DiagramRepository } from '../../ports/diagram/DiagramRepository'
import { Diagram } from '../../domain/diagram/types'

export class DiagramService {
  constructor(private readonly repository: DiagramRepository) {}

  async getDiagram(id: string): Promise<Diagram | null> {
    try {
      return await this.repository.getDiagram(id)
    } catch (error) {
      console.error('Error fetching diagram:', error)
      throw error
    }
  }

  async saveDiagram(id: string, xml: string): Promise<void> {
    try {
      await this.repository.saveDiagram(id, xml)
    } catch (error) {
      console.error('Error saving diagram:', error)
      throw error
    }
  }
}
