import { db } from '@/config/firebase'
import { DiagramRepository } from '../../ports/diagram/DiagramRepository'
import { Diagram } from '../../domain/diagram/types'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export class FirebaseDiagramRepository implements DiagramRepository {
  private collectionName = 'diagrams'

  async getDiagram(id: string): Promise<Diagram | null> {
    const docRef = doc(db, this.collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id,
        xml: data.xml || '',
      }
    }
    return null
  }

  async saveDiagram(id: string, xml: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id)
    await setDoc(docRef, { xml }, { merge: true })
  }
}
