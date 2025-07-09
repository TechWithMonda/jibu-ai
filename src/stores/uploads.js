import { defineStore } from 'pinia'

export const useUploadStore = defineStore('uploads', {
  state: () => ({
    uploads: []
  }),
  getters: {
    stats: (state) => ({
      totalUploads: state.uploads.length
    })
  },
  actions: {
    addUpload(uploadData) {
      this.uploads.unshift({
        id: Date.now(),
        model: uploadData.model,
        timestamp: new Date().toISOString(),
        fileType: uploadData.fileType
      })
    }
  }
})