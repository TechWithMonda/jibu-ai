<!-- src/components/Dashboard.vue -->
<template>
  <NavBar/>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">AI-Powered Plagiarism Checker</h1>
        <p class="text-gray-600 mt-2">Detect copied assignments and compare against Kenyan student papers</p>
      </div>

      <!-- Upload Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Upload Document</h2>
        <form @submit.prevent="uploadDocument" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Document Title</label>
            <input
              v-model="newDocument.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter document title"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Content (optional)</label>
            <textarea
              v-model="newDocument.content"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste text content here"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <input
              @change="handleFileUpload"
              type="file"
              accept=".txt,.docx,.pdf"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-sm text-gray-500 mt-1">Supported formats: .txt, .docx, .pdf</p>
          </div>

          <button
            type="submit"
            :disabled="uploading"
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {{ uploading ? 'Uploading...' : 'Upload Document' }}
          </button>
        </form>
      </div>

      <!-- Documents List -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Documents</h2>
          <div class="flex space-x-4">
            <input
              v-model="searchQuery"
              @input="searchDocuments"
              type="text"
              placeholder="Search documents..."
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-gray-600">Loading documents...</p>
        </div>

        <div v-else-if="documents.length === 0" class="text-center py-8">
          <p class="text-gray-600">No documents found</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="document in documents"
            :key="document.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ document.title }}</h3>
                <p class="text-gray-600 text-sm mt-1">
                  Created: {{ formatDate(document.created_at) }}
                </p>
                <p class="text-gray-700 mt-2 line-clamp-2">
                  {{ document.content.substring(0, 200) }}...
                </p>
              </div>
              
              <div class="flex space-x-2 ml-4">
                <button
                  @click="checkPlagiarism(document.id)"
                  :disabled="checkingPlagiarism[document.id]"
                  class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 text-sm"
                >
                  {{ checkingPlagiarism[document.id] ? 'Checking...' : 'Check Plagiarism' }}
                </button>
                
                <button
                  @click="viewReport(document.id)"
                  class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Modal -->
    <div v-if="showReport" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold">Plagiarism Report</h3>
            <button @click="showReport = false" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div v-if="currentReport">
            <div class="mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">{{ currentReport.document.title }}</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <span class="text-sm text-gray-600">Overall Similarity:</span>
                    <span class="ml-2 text-lg font-bold" :class="getSimilarityColor(currentReport.overall_similarity)">
                      {{ Math.round(currentReport.overall_similarity * 100) }}%
                    </span>
                  </div>
                  <div>
                    <span class="text-sm text-gray-600">Total Matches:</span>
                    <span class="ml-2 text-lg font-bold">{{ currentReport.total_matches }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentReport.matches.length > 0">
              <h4 class="font-semibold mb-4">Similar Sections Found:</h4>
              <div class="space-y-4">
                <div
                  v-for="(match, index) in currentReport.matches"
                  :key="index"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex justify-between items-start mb-2">
                    <h5 class="font-medium">{{ match.source_document.title }}</h5>
                    <span class="text-sm px-2 py-1 rounded" :class="getSimilarityBadgeClass(match.similarity_score)">
                      {{ Math.round(match.similarity_score * 100) }}% similar
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600 mb-1">Your text:</p>
                      <p class="text-sm bg-red-50 p-2 rounded border-l-4 border-red-400">
                        {{ match.matched_text }}
                      </p>
                    </div>
                    
                    <div>
                      <p class="text-sm text-gray-600 mb-1">Source text:</p>
                      <p class="text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                        {{ match.source_text }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-green-600 font-medium">No plagiarism detected!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import { documentService, reportService } from '../services/api'

export default {
  name: 'Dashboard',
  data() {
    return {
      documents: [],
      newDocument: {
        title: '',
        content: '',
        file: null
      },
      searchQuery: '',
      loading: false,
      uploading: false,
      checkingPlagiarism: {},
      showReport: false,
      currentReport: null
    }
  },
  
  mounted() {
    this.loadDocuments()
  },
  
  methods: {
    async loadDocuments() {
      this.loading = true
      try {
        this.documents = await documentService.getAllDocuments()
      } catch (error) {
        console.error('Error loading documents:', error)
      } finally {
        this.loading = false
      }
    },
    
    async uploadDocument() {
      if (!this.newDocument.title || (!this.newDocument.content && !this.newDocument.file)) {
        alert('Please provide a title and either content or file')
        return
      }
      
      this.uploading = true
      try {
        await documentService.createDocument(this.newDocument)
        this.newDocument = { title: '', content: '', file: null }
        this.loadDocuments()
        alert('Document uploaded successfully!')
      } catch (error) {
        console.error('Error uploading document:', error)
        alert('Error uploading document')
      } finally {
        this.uploading = false
      }
    },
    
    handleFileUpload(event) {
      this.newDocument.file = event.target.files[0]
    },
    
    async searchDocuments() {
      if (this.searchQuery.trim()) {
        try {
          this.documents = await documentService.searchDocuments(this.searchQuery)
        } catch (error) {
          console.error('Error searching documents:', error)
        }
      } else {
        this.loadDocuments()
      }
    },
    
    async checkPlagiarism(documentId) {
      this.$set(this.checkingPlagiarism, documentId, true)
      try {
        const report = await documentService.checkPlagiarism(documentId)
        this.currentReport = report
        this.showReport = true
      } catch (error) {
        console.error('Error checking plagiarism:', error)
        alert('Error checking plagiarism')
      } finally {
        this.$set(this.checkingPlagiarism, documentId, false)
      }
    },
    
    async viewReport(documentId) {
      try {
        const reports = await reportService.getReports(documentId)
        if (reports.length > 0) {
          this.currentReport = reports[0]
          this.showReport = true
        } else {
          alert('No plagiarism report found for this document')
        }
      } catch (error) {
        console.error('Error loading report:', error)
        alert('Error loading report')
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    
    getSimilarityColor(similarity) {
      if (similarity >= 0.8) return 'text-red-600'
      if (similarity >= 0.5) return 'text-orange-600'
      return 'text-green-600'
    },
    
    getSimilarityBadgeClass(similarity) {
      if (similarity >= 0.8) return 'bg-red-100 text-red-800'
      if (similarity >= 0.5) return 'bg-orange-100 text-orange-800'
      return 'bg-green-100 text-green-800'
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>