import { Diagram } from '../../domain/diagram/types'

export interface DiagramRepository {
  getDiagram(id: string): Promise<Diagram | null>
  saveDiagram(id: string, xml: string): Promise<void>
}
