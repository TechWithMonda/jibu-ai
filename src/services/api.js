// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'https://web-production-d639.up.railway.app'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const documentService = {
  async getAllDocuments() {
    const response = await api.get('/documents/')
    return response.data
  },

  async createDocument(data) {
    const formData = new FormData()
    formData.append('title', data.title)
    if (data.content) formData.append('content', data.content)
    if (data.file) formData.append('file', data.file)

    const response = await api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async checkPlagiarism(documentId) {
    const response = await api.post(`/documents/${documentId}/check_plagiarism/`)
    return response.data
  },

  async searchDocuments(query) {
    const response = await api.get(`/documents/search/?q=${query}`)
    return response.data
  },
}

export const reportService = {
  async getReports(documentId = null) {
    const url = documentId ? `/reports/?document_id=${documentId}` : '/reports/'
    const response = await api.get(url)
    return response.data
  },

  async getReport(reportId) {
    const response = await api.get(`/reports/${reportId}/`)
    return response.data
  },
}