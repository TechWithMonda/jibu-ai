<template>
    <NavBar/> 
  <div class="resource-library">
    <!-- Header Section -->
    <header class="library-header">
      <h1><i class="fas fa-book-open"></i> Study Cloud</h1>
      <div class="user-controls">
        <button @click="toggleUploadModal" class="upload-btn">
          <i class="fas fa-cloud-upload-alt"></i> Upload
        </button>
        <div class="user-menu">
          <img :src="user.avatar" alt="User" class="user-avatar">
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="library-container">
      <!-- Sidebar Navigation -->
      <aside class="library-sidebar">
        <div class="search-box">
          <input type="text" placeholder="Search resources..." v-model="searchQuery">
          <i class="fas fa-search"></i>
        </div>
        
        <nav class="category-nav">
          <ul>
            <li v-for="category in categories" 
                :key="category.id"
                :class="{ active: activeCategory === category.id }"
                @click="setActiveCategory(category.id)">
              <i :class="category.icon"></i>
              {{ category.name }}
              <span class="item-count">{{ category.count }}</span>
            </li>
          </ul>
        </nav>
        
        <div class="storage-info">
          <div class="storage-progress">
            <div class="progress-bar" :style="{ width: storagePercentage + '%' }"></div>
          </div>
          <p>{{ usedStorage }} MB of {{ totalStorage }} MB used</p>
        </div>
      </aside>

      <!-- Main Resource Display -->
      <main class="resource-display">
        <div class="display-controls">
          <div class="view-options">
            <button :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
              <i class="fas fa-th"></i> Grid
            </button>
            <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
              <i class="fas fa-list"></i> List
            </button>
          </div>
          
          <div class="sort-options">
            <select v-model="sortBy">
              <option value="date">Date Added</option>
              <option value="name">Name</option>
              <option value="type">File Type</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>

        <!-- Resource Grid View -->
        <div v-if="viewMode === 'grid'" class="resource-grid">
          <div v-for="resource in filteredResources" 
               :key="resource.id" 
               class="resource-card"
               @dblclick="openResource(resource)">
            <div class="card-icon" :class="getFileTypeClass(resource.type)">
              <i :class="getFileIcon(resource.type)"></i>
            </div>
            <div class="card-info">
              <h3>{{ resource.name }}</h3>
              <p>{{ formatDate(resource.date) }}</p>
              <p>{{ formatFileSize(resource.size) }}</p>
            </div>
            <div class="card-actions">
              <button @click.stop="showResourceActions(resource.id)">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div v-if="activeResourceActions === resource.id" class="action-menu">
                <button @click="downloadResource(resource)">Download</button>
                <button @click="shareResource(resource)">Share</button>
                <button @click="deleteResource(resource.id)" class="delete">Delete</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Resource List View -->
        <div v-if="viewMode === 'list'" class="resource-list">
          <table>
            <thead>
              <tr>
                <th @click="sortResources('name')">Name <i class="fas fa-sort"></i></th>
                <th @click="sortResources('type')">Type <i class="fas fa-sort"></i></th>
                <th @click="sortResources('size')">Size <i class="fas fa-sort"></i></th>
                <th @click="sortResources('date')">Date Added <i class="fas fa-sort"></i></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resource in filteredResources" :key="resource.id">
                <td @dblclick="openResource(resource)">
                  <i :class="getFileIcon(resource.type)"></i>
                  {{ resource.name }}
                </td>
                <td>{{ resource.type.toUpperCase() }}</td>
                <td>{{ formatFileSize(resource.size) }}</td>
                <td>{{ formatDate(resource.date) }}</td>
                <td class="action-cell">
                  <button @click="downloadResource(resource)" title="Download">
                    <i class="fas fa-download"></i>
                  </button>
                  <button @click="shareResource(resource)" title="Share">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button @click="deleteResource(resource.id)" title="Delete" class="delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredResources.length === 0" class="empty-state">
          <i class="fas fa-cloud"></i>
          <h3>No resources found</h3>
          <p>Upload your first resource or try a different search</p>
          <button @click="toggleUploadModal" class="upload-btn">
            <i class="fas fa-cloud-upload-alt"></i> Upload Files
          </button>
        </div>
      </main>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="modal-overlay">
      <div class="upload-modal">
        <div class="modal-header">
          <h2>Upload Resources</h2>
          <button @click="toggleUploadModal" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="upload-area" @dragover.prevent="dragOver = true" 
             @dragleave="dragOver = false" 
             @drop.prevent="handleDrop"
             :class="{ 'drag-over': dragOver }">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>Drag & drop files here or</p>
          <input type="file" id="file-upload" multiple @change="handleFileSelect" hidden>
          <label for="file-upload" class="browse-btn">Browse Files</label>
        </div>
        
        <div v-if="uploadQueue.length > 0" class="upload-queue">
          <div v-for="(file, index) in uploadQueue" :key="index" class="queue-item">
            <div class="file-info">
              <i :class="getFileIcon(file.name.split('.').pop())"></i>
              <span>{{ file.name }}</span>
              <span>{{ formatFileSize(file.size) }}</span>
            </div>
            <div class="upload-progress">
              <div class="progress-bar" :style="{ width: file.progress + '%' }"></div>
            </div>
            <button @click="removeFromQueue(index)" class="cancel-upload">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="upload-actions">
            <button @click="startUpload" class="start-upload" :disabled="uploading">
              {{ uploading ? 'Uploading...' : 'Start Upload' }}
            </button>
            <button @click="clearQueue" class="cancel-all" :disabled="uploading">
              Cancel All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="previewResource" class="modal-overlay preview-overlay">
      <div class="preview-modal">
        <div class="modal-header">
          <h2>{{ previewResource.name }}</h2>
          <div class="preview-actions">
            <button @click="downloadResource(previewResource)" title="Download">
              <i class="fas fa-download"></i>
            </button>
            <button @click="shareResource(previewResource)" title="Share">
              <i class="fas fa-share-alt"></i>
            </button>
            <button @click="closePreview" class="close-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="preview-content">
          <div v-if="isImage(previewResource.type)" class="image-preview">
            <img :src="getPreviewUrl(previewResource)" :alt="previewResource.name">
          </div>
          
          <div v-else-if="isPDF(previewResource.type)" class="pdf-preview">
            <iframe :src="'https://docs.google.com/gview?url=' + getPreviewUrl(previewResource) + '&embedded=true'"></iframe>
          </div>
          
          <div v-else-if="isVideo(previewResource.type)" class="video-preview">
            <video controls>
              <source :src="getPreviewUrl(previewResource)" :type="'video/' + previewResource.type">
            </video>
          </div>
          
          <div v-else class="generic-preview">
            <i :class="getFileIcon(previewResource.type)"></i>
            <p>No preview available for this file type</p>
            <button @click="downloadResource(previewResource)" class="download-btn">
              <i class="fas fa-download"></i> Download File
            </button>
          </div>
        </div>
        
        <div class="file-details">
          <div class="detail-row">
            <span>File Name:</span>
            <span>{{ previewResource.name }}</span>
          </div>
          <div class="detail-row">
            <span>Type:</span>
            <span>{{ previewResource.type.toUpperCase() }}</span>
          </div>
          <div class="detail-row">
            <span>Size:</span>
            <span>{{ formatFileSize(previewResource.size) }}</span>
          </div>
          <div class="detail-row">
            <span>Uploaded:</span>
            <span>{{ formatDate(previewResource.date) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
<Footer/>
</template>

<script>
export default {
  name: 'ResourceLibrary',
  data() {
    return {
      user: {
        name: 'Student User',
        avatar: 'https://ui-avatars.com/api/?name=Student+User&background=4e73df&color=ffffff&rounded=true'
      },
      categories: [
        { id: 'all', name: 'All Resources', icon: 'fas fa-boxes', count: 42 },
        { id: 'documents', name: 'Documents', icon: 'fas fa-file-alt', count: 18 },
        { id: 'pdfs', name: 'PDFs', icon: 'fas fa-file-pdf', count: 12 },
        { id: 'videos', name: 'Videos', icon: 'fas fa-video', count: 5 },
        { id: 'images', name: 'Images', icon: 'fas fa-image', count: 7 },
        { id: 'audio', name: 'Audio', icon: 'fas fa-music', count: 3 },
        { id: 'links', name: 'Web Links', icon: 'fas fa-link', count: 4 },
        { id: 'favorites', name: 'Favorites', icon: 'fas fa-star', count: 9 }
      ],
      resources: [
        { id: 1, name: 'Introduction to Computer Science.pdf', type: 'pdf', size: 2456789, date: '2023-05-15', category: 'pdfs', favorite: true },
        { id: 2, name: 'Lecture 1 - Algorithms.mp4', type: 'mp4', size: 156789432, date: '2023-05-10', category: 'videos' },
        { id: 3, name: 'Study Notes.docx', type: 'docx', size: 456789, date: '2023-05-18', category: 'documents', favorite: true },
        { id: 4, name: 'Research Paper References.pdf', type: 'pdf', size: 3456789, date: '2023-05-12', category: 'pdfs' },
        { id: 5, name: 'Project Diagram.png', type: 'png', size: 1234567, date: '2023-05-20', category: 'images' },
        { id: 6, name: 'Important Website.url', type: 'url', size: 1024, date: '2023-05-05', category: 'links', favorite: true },
        { id: 7, name: 'Audio Lecture.mp3', type: 'mp3', size: 45678901, date: '2023-05-08', category: 'audio' },
        { id: 8, name: 'Course Syllabus.docx', type: 'docx', size: 345678, date: '2023-05-01', category: 'documents' },
        { id: 9, name: 'Study Group Notes.pdf', type: 'pdf', size: 2345678, date: '2023-05-17', category: 'pdfs' },
        { id: 10, name: 'Whiteboard Photo.jpg', type: 'jpg', size: 987654, date: '2023-05-19', category: 'images' },
        { id: 11, name: 'Programming Cheat Sheet.pdf', type: 'pdf', size: 1234567, date: '2023-05-14', category: 'pdfs', favorite: true },
        { id: 12, name: 'Tutorial Video.mp4', type: 'mp4', size: 234567890, date: '2023-05-09', category: 'videos' }
      ],
      activeCategory: 'all',
      viewMode: 'grid',
      sortBy: 'date',
      sortDirection: 'desc',
      searchQuery: '',
      showUploadModal: false,
      dragOver: false,
      uploadQueue: [],
      uploading: false,
      activeResourceActions: null,
      previewResource: null,
      usedStorage: 1024,
      totalStorage: 5120
    }
  },
  computed: {
    filteredResources() {
      let filtered = this.resources;
      
      // Filter by category
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(resource => {
          if (this.activeCategory === 'favorites') {
            return resource.favorite;
          }
          return resource.category === this.activeCategory;
        });
      }
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(resource => 
          resource.name.toLowerCase().includes(query)
        );
      }
      
      // Sort resources
      return this.sortResourcesArray(filtered);
    },
    storagePercentage() {
      return (this.usedStorage / this.totalStorage) * 100;
    }
  },
  methods: {
    setActiveCategory(category) {
      this.activeCategory = category;
    },
    sortResources(sortBy) {
      if (this.sortBy === sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = sortBy;
        this.sortDirection = 'asc';
      }
    },
    sortResourcesArray(array) {
      return array.slice().sort((a, b) => {
        let compareA, compareB;
        
        switch (this.sortBy) {
          case 'name':
            compareA = a.name.toLowerCase();
            compareB = b.name.toLowerCase();
            break;
          case 'type':
            compareA = a.type;
            compareB = b.type;
            break;
          case 'size':
            compareA = a.size;
            compareB = b.size;
            break;
          case 'date':
          default:
            compareA = new Date(a.date);
            compareB = new Date(b.date);
        }
        
        if (compareA < compareB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (compareA > compareB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    },
    getFileIcon(fileType) {
      switch (fileType) {
        case 'pdf':
          return 'fas fa-file-pdf';
        case 'docx':
        case 'doc':
          return 'fas fa-file-word';
        case 'xlsx':
        case 'xls':
          return 'fas fa-file-excel';
        case 'pptx':
        case 'ppt':
          return 'fas fa-file-powerpoint';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
          return 'fas fa-file-image';
        case 'mp4':
        case 'mov':
        case 'avi':
        case 'mkv':
          return 'fas fa-file-video';
        case 'mp3':
        case 'wav':
        case 'ogg':
          return 'fas fa-file-audio';
        case 'zip':
        case 'rar':
        case '7z':
          return 'fas fa-file-archive';
        case 'txt':
          return 'fas fa-file-alt';
        case 'url':
          return 'fas fa-link';
        default:
          return 'fas fa-file';
      }
    },
    getFileTypeClass(fileType) {
      switch (fileType) {
        case 'pdf':
          return 'pdf-type';
        case 'docx':
        case 'doc':
          return 'doc-type';
        case 'xlsx':
        case 'xls':
          return 'xls-type';
        case 'pptx':
        case 'ppt':
          return 'ppt-type';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
          return 'image-type';
        case 'mp4':
        case 'mov':
        case 'avi':
        case 'mkv':
          return 'video-type';
        case 'mp3':
        case 'wav':
        case 'ogg':
          return 'audio-type';
        case 'zip':
        case 'rar':
        case '7z':
          return 'archive-type';
        case 'url':
          return 'link-type';
        default:
          return 'default-type';
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    toggleUploadModal() {
      this.showUploadModal = !this.showUploadModal;
      if (!this.showUploadModal) {
        this.dragOver = false;
      }
    },
    handleFileSelect(event) {
      const files = Array.from(event.target.files);
      this.addFilesToQueue(files);
    },
    handleDrop(event) {
      this.dragOver = false;
      const files = Array.from(event.dataTransfer.files);
      this.addFilesToQueue(files);
    },
    addFilesToQueue(files) {
      files.forEach(file => {
        this.uploadQueue.push({
          file,
          name: file.name,
          size: file.size,
          type: file.name.split('.').pop(),
          progress: 0
        });
      });
    },
    removeFromQueue(index) {
      this.uploadQueue.splice(index, 1);
    },
    clearQueue() {
      this.uploadQueue = [];
    },
    startUpload() {
      if (this.uploading || this.uploadQueue.length === 0) return;
      
      this.uploading = true;
      this.simulateUpload();
    },
    simulateUpload() {
      // Simulate upload progress
      this.uploadQueue.forEach((item, index) => {
        const interval = setInterval(() => {
          if (item.progress < 100) {
            item.progress += Math.floor(Math.random() * 10) + 5;
            if (item.progress > 100) item.progress = 100;
          } else {
            clearInterval(interval);
            
            // Move to resources when all are uploaded
            if (this.uploadQueue.every(item => item.progress === 100)) {
              setTimeout(() => {
                this.finishUpload();
              }, 500);
            }
          }
        }, 300);
      });
    },
    finishUpload() {
      // Add uploaded files to resources
      this.uploadQueue.forEach(item => {
        const newResource = {
          id: this.resources.length + 1,
          name: item.name,
          type: item.type,
          size: item.size,
          date: new Date().toISOString().split('T')[0],
          category: this.getCategoryForType(item.type)
        };
        this.resources.unshift(newResource);
      });
      
      // Update storage usage
      const totalUploaded = this.uploadQueue.reduce((sum, item) => sum + item.size, 0);
      this.usedStorage += Math.ceil(totalUploaded / (1024 * 1024));
      
      // Reset upload state
      this.uploadQueue = [];
      this.uploading = false;
      this.showUploadModal = false;
    },
    getCategoryForType(type) {
      if (['pdf'].includes(type)) return 'pdfs';
      if (['docx', 'doc', 'txt'].includes(type)) return 'documents';
      if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(type)) return 'images';
      if (['mp4', 'mov', 'avi', 'mkv'].includes(type)) return 'videos';
      if (['mp3', 'wav', 'ogg'].includes(type)) return 'audio';
      if (['url'].includes(type)) return 'links';
      return 'documents';
    },
    showResourceActions(resourceId) {
      this.activeResourceActions = this.activeResourceActions === resourceId ? null : resourceId;
    },
    downloadResource(resource) {
      // Simulate download
      console.log('Downloading:', resource.name);
      // In a real app, this would trigger a file download
    },
    shareResource(resource) {
      // Simulate share
      console.log('Sharing:', resource.name);
      // In a real app, this would open a share dialog
    },
    deleteResource(resourceId) {
      if (confirm('Are you sure you want to delete this resource?')) {
        const index = this.resources.findIndex(r => r.id === resourceId);
        if (index !== -1) {
          // Update storage usage
          this.usedStorage -= Math.ceil(this.resources[index].size / (1024 * 1024));
          this.resources.splice(index, 1);
        }
      }
      this.activeResourceActions = null;
    },
    openResource(resource) {
      this.previewResource = resource;
    },
    closePreview() {
      this.previewResource = null;
    },
    isImage(type) {
      return ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(type);
    },
    isPDF(type) {
      return type === 'pdf';
    },
    isVideo(type) {
      return ['mp4', 'mov', 'avi', 'mkv'].includes(type);
    },
    getPreviewUrl(resource) {
      // In a real app, this would return the actual file URL
      // For demo, we'll return placeholder URLs based on file type
      if (this.isImage(resource.type)) {
        return 'https://via.placeholder.com/800x600?text=' + encodeURIComponent(resource.name);
      } else if (this.isPDF(resource.type)) {
        return 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      } else if (this.isVideo(resource.type)) {
        return 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';
      }
      return '';
    }
  }
}
</script>

<style scoped>
/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

.resource-library {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Header Styles */
.library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.library-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.upload-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.upload-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

/* Main Container */
.library-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar Styles */
.library-sidebar {
  width: 280px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1.5rem 0;
}

.search-box {
  position: relative;
  padding: 0 1.5rem;
  margin-bottom: 1.5rem;
}

.search-box input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.2);
}

.search-box i {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.category-nav ul {
  list-style: none;
}

.category-nav li {
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.category-nav li:hover {
  background-color: #f8f9fc;
}

.category-nav li.active {
  background-color: #f0f3ff;
  color: #4e73df;
  font-weight: 500;
}

.category-nav li.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #4e73df;
  border-radius: 0 4px 4px 0;
}

.category-nav li i {
  width: 20px;
  text-align: center;
}

.item-count {
  margin-left: auto;
  background-color: #e9ecef;
  color: #495057;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  font-weight: 500;
}

.category-nav li.active .item-count {
  background-color: #d6e0ff;
  color: #4e73df;
}

.storage-info {
  margin-top: auto;
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.storage-progress {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.storage-progress .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4e73df 0%, #224abe 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.storage-info p {
  font-size: 0.85rem;
  color: #6c757d;
  text-align: center;
}

/* Main Content Styles */
.resource-display {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #f8f9fc;
}

.display-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-options button {
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.view-options button:hover {
  border-color: #c4c9d6;
}

.view-options button.active {
  background-color: #4e73df;
  border-color: #4e73df;
  color: white;
}

.sort-options select {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-options select:focus {
  outline: none;
  border-color: #4e73df;
  box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.2);
}

/* Resource Grid View */
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-icon {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
}

.pdf-type { background-color: #e74a3b; }
.doc-type { background-color: #2c59a3; }
.xls-type { background-color: #1d7044; }
.ppt-type { background-color: #d24726; }
.image-type { background-color: #36b9cc; }
.video-type { background-color: #4e73df; }
.audio-type { background-color: #f6c23e; }
.archive-type { background-color: #858796; }
.link-type { background-color: #1cc88a; }
.default-type { background-color: #5a5c69; }

.card-info {
  padding: 1rem;
}

.card-info h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info p {
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.card-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.card-actions button {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.card-actions button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.action-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.action-menu button {
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: #333;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0;
  width: 100%;
}

.action-menu button:hover {
  background-color: #f8f9fa;
}

.action-menu button.delete {
  color: #e74a3b;
}

/* Resource List View */
.resource-list {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.resource-list table {
  width: 100%;
  border-collapse: collapse;
}

.resource-list th, .resource-list td {
  padding: 1rem;
  text-align: left;
}

.resource-list th {
  background-color: #f8f9fc;
  font-weight: 600;
  color: #4e73df;
  cursor: pointer;
  user-select: none;
}

.resource-list th:hover {
  background-color: #f0f3ff;
}

.resource-list th i {
  margin-left: 0.5rem;
  font-size: 0.8rem;
}

.resource-list tr {
  border-bottom: 1px solid #e0e0e0;
}

.resource-list tr:last-child {
  border-bottom: none;
}

.resource-list tr:hover {
  background-color: #f8f9fc;
}

.resource-list td:first-child {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.resource-list td i {
  color: #6c757d;
  font-size: 1.1rem;
}

.action-cell {
  display: flex;
  gap: 0.5rem;
}

.action-cell button {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.action-cell button:hover {
  background-color: #f8f9fa;
  color: #4e73df;
}

.action-cell button.delete:hover {
  color: #e74a3b;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.empty-state i {
  font-size: 3rem;
  color: #4e73df;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-state p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.upload-modal {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #f8f9fa;
  color: #333;
}

.upload-area {
  padding: 3rem 2rem;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  margin: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.upload-area.drag-over {
  border-color: #4e73df;
  background-color: #f8faff;
}

.upload-area i {
  font-size: 3rem;
  color: #4e73df;
  margin-bottom: 1rem;
}

.upload-area p {
  margin-bottom: 1.5rem;
  color: #6c757d;
}

.browse-btn {
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.browse-btn:hover {
  background-color: #3a5bc7;
}

.upload-queue {
  padding: 0 1.5rem 1.5rem;
}

.queue-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

.file-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.file-info i {
  font-size: 1.25rem;
  color: #6c757d;
  flex-shrink: 0;
}

.file-info span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-info span:last-child {
  margin-left: auto;
  font-size: 0.85rem;
  color: #6c757d;
  padding-left: 1rem;
}

.upload-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #e9ecef;
}

.upload-progress .progress-bar {
  height: 100%;
  background-color: #4e73df;
  transition: width 0.3s ease;
}

.cancel-upload {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-upload:hover {
  color: #e74a3b;
}

.upload-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.start-upload {
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.start-upload:hover:not(:disabled) {
  background-color: #3a5bc7;
}

.start-upload:disabled {
  background-color: #aab5e0;
  cursor: not-allowed;
}

.cancel-all {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e0e0e0;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-all:hover:not(:disabled) {
  background-color: #e9ecef;
}

.cancel-all:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Preview Modal */
.preview-modal {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.preview-overlay {
  align-items: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.preview-actions button {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6c757d;
  transition: all 0.2s ease;
}

.preview-actions button:hover {
  background-color: #f8f9fa;
  color: #4e73df;
}

.preview-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 500px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.pdf-preview, .video-preview {
  width: 100%;
  height: 500px;
}

.pdf-preview iframe, .video-preview video {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.generic-preview {
  text-align: center;
  padding: 2rem;
}

.generic-preview i {
  font-size: 5rem;
  color: #4e73df;
  margin-bottom: 1.5rem;
}

.generic-preview p {
  margin-bottom: 1.5rem;
  color: #6c757d;
}

.download-btn {
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.download-btn:hover {
  background-color: #3a5bc7;
}

.file-details {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.detail-row {
  display: flex;
  margin-bottom: 0.75rem;
}

.detail-row span:first-child {
  font-weight: 500;
  color: #6c757d;
  width: 120px;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .library-sidebar {
    width: 240px;
  }
  
  .resource-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .library-container {
    flex-direction: column;
  }
  
  .library-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .category-nav ul {
    display: flex;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .category-nav li {
    white-space: nowrap;
    border-radius: 4px;
  }
  
  .category-nav li.active::before {
    width: 100%;
    height: 4px;
    top: auto;
    bottom: 0;
    border-radius: 4px 4px 0 0;
  }
  
  .storage-info {
    display: none;
  }
}

@media (max-width: 576px) {
  .library-header {
    padding: 1rem;
  }
  
  .resource-display {
    padding: 1rem;
  }
  
  .display-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .upload-modal {
    margin: 0 1rem;
  }
  
  .preview-modal {
    margin: 0 1rem;
  }
}
</style>