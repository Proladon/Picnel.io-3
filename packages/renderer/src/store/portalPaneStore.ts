import { defineStore } from 'pinia'
import { useAppStore } from '/@/store/appStore'
import { map, flatten } from 'lodash-es'

interface PortalPaneStoreState {
  activePortals: ActivePortalRef[]
}

export const usePortalPaneStore = defineStore('portalPane', {
  state: (): PortalPaneStoreState => ({
    activePortals: []
  }),
  actions: {
    AddActivedPortal(portal: ActivePortalRef) {
      this.activePortals.push(portal)
    },
    RemoveActivePortal(index: number) {
      this.activePortals.splice(index, 1)
    }
  },
  getters: {
    portals(): PortalGroup[] {
      const appStore = useAppStore()
      if (!appStore.dbData) return []
      return appStore.dbData.portals
    },
    flattenPortals() {
      const portals = this.portals
      const childs = map(portals, 'childs')
      const flattenChilds = flatten(childs)
      return flattenChilds
    }
  }
})