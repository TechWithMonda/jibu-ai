<template>
    <NavBar/> 
  <div class="collaboration-suite bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 class="text-xl font-bold">StudyCollab</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="toggleNotificationPanel" class="relative p-2 rounded-full hover:bg-blue-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadNotifications" class="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          <div class="flex items-center space-x-2 cursor-pointer">
            <img :src="user.avatar" alt="User" class="h-8 w-8 rounded-full border-2 border-blue-400">
            <span class="font-medium">{{ user.name }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      <!-- Sidebar -->
      <aside class="w-full lg:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-blue-800 mb-3">Active Sessions</h2>
          <div class="space-y-2">
            <div v-for="session in activeSessions" :key="session.id" 
                 @click="joinSession(session.id)"
                 class="flex items-center p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                 :class="{ 'bg-blue-100': currentSession?.id === session.id }">
              <div class="h-3 w-3 rounded-full mr-2" :class="session.active ? 'bg-green-500' : 'bg-gray-400'"></div>
              <div>
                <p class="font-medium text-gray-800">{{ session.name }}</p>
                <p class="text-xs text-gray-500">{{ session.participants }} participants</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-lg font-semibold text-blue-800 mb-3">Quick Actions</h2>
          <button @click="startNewSession('whiteboard')" class="w-full flex items-center justify-between p-3 mb-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition">
            <span>New Whiteboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button @click="startNewSession('document')" class="w-full flex items-center justify-between p-3 mb-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition">
            <span>New Document</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button @click="startNewSession('meeting')" class="w-full flex items-center justify-between p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition">
            <span>Schedule Meeting</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-blue-800 mb-3">Recent Files</h2>
          <div class="space-y-2">
            <div v-for="file in recentFiles" :key="file.id" class="flex items-center p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition">
              <div class="p-2 mr-3 rounded-lg" :class="getFileBgClass(file.type)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getFileIcon(file.type)" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-800 truncate" style="max-width: 150px;">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(file.updated) }}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Collaboration Area -->
      <main class="flex-1 flex flex-col">
        <!-- Session Header -->
        <div v-if="currentSession" class="bg-white rounded-lg shadow-md p-4 mb-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-bold text-blue-800">{{ currentSession.name }}</h2>
              <p class="text-sm text-gray-600">Created by {{ currentSession.creator }} on {{ formatDate(currentSession.createdAt) }}</p>
            </div>
            <div class="flex items-center space-x-3">
              <div class="flex -space-x-2">
                <img v-for="participant in currentParticipants" :key="participant.id" 
                     :src="participant.avatar" :alt="participant.name" 
                     class="h-8 w-8 rounded-full border-2 border-white hover:border-blue-300 transition cursor-pointer"
                     :title="participant.name">
              </div>
              <button @click="inviteParticipants" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Invite
              </button>
            </div>
          </div>
        </div>

        <!-- Collaboration Content -->
        <div v-if="currentSession" class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Whiteboard/Document Area -->
          <div class="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-blue-800">
                {{ currentSession.type === 'whiteboard' ? 'Shared Whiteboard' : 'Collaborative Document' }}
              </h3>
              <div class="flex space-x-2">
                <button v-if="currentSession.type === 'whiteboard'" 
                        @click="toggleWhiteboardTool('pen')"
                        class="p-2 rounded-lg hover:bg-blue-50 transition"
                        :class="{ 'bg-blue-100': whiteboardTool === 'pen' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button v-if="currentSession.type === 'whiteboard'" 
                        @click="toggleWhiteboardTool('text')"
                        class="p-2 rounded-lg hover:bg-blue-50 transition"
                        :class="{ 'bg-blue-100': whiteboardTool === 'text' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button v-if="currentSession.type === 'whiteboard'" 
                        @click="toggleWhiteboardTool('shape')"
                        class="p-2 rounded-lg hover:bg-blue-50 transition"
                        :class="{ 'bg-blue-100': whiteboardTool === 'shape' }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button @click="downloadCurrentSession" class="p-2 rounded-lg hover:bg-blue-50 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Whiteboard Canvas -->
            <div v-if="currentSession.type === 'whiteboard'" 
                 class="border-2 border-dashed border-gray-300 rounded-lg h-96 bg-white relative overflow-hidden">
              <!-- This would be the actual whiteboard canvas in a real implementation -->
              <div class="absolute inset-0 flex items-center justify-center text-gray-400">
                <p>Draw here with {{ whiteboardTool }} tool</p>
              </div>
              <!-- Cursors of other participants -->
              <div v-for="participant in currentParticipants" :key="participant.id" 
                   class="absolute w-4 h-4 rounded-full border-2"
                   :class="`border-${participant.color}-500`"
                   :style="{ left: `${Math.random() * 90 + 5}%`, top: `${Math.random() * 90 + 5}%` }">
                <div class="absolute -top-6 left-0 bg-white px-2 py-1 rounded-lg shadow-sm text-xs whitespace-nowrap"
                     :class="`text-${participant.color}-700`">
                  {{ participant.name }}
                </div>
              </div>
            </div>

            <!-- Document Editor -->
            <div v-if="currentSession.type === 'document'" class="border border-gray-200 rounded-lg h-96 bg-white p-4">
              <!-- This would be the actual document editor in a real implementation -->
              <div contenteditable="true" class="h-full outline-none">
                <h2 class="text-2xl font-bold text-blue-800 mb-4">{{ currentSession.name }}</h2>
                <p class="mb-4">Start typing here... Changes are saved automatically and visible to all participants in real-time.</p>
                <ul class="list-disc pl-5 mb-4">
                  <li>Collaborative editing</li>
                  <li>Version history</li>
                  <li>Comments and suggestions</li>
                </ul>
              </div>
            </div>

            <!-- Meeting Scheduler -->
            <div v-if="currentSession.type === 'meeting'" class="border border-gray-200 rounded-lg h-96 bg-white p-4">
              <div class="h-full flex flex-col">
                <h3 class="text-xl font-bold text-blue-800 mb-4">Schedule Group Study Session</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" v-model="meetingDate" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" v-model="meetingTime" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select v-model="meetingDuration" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea v-model="meetingDescription" rows="3" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="What will this study session cover?"></textarea>
                </div>

                <button @click="scheduleMeeting" class="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
                  Schedule Session
                </button>
              </div>
            </div>
          </div>

          <!-- Chat and Participants Panel -->
          <div class="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-blue-800">Collaboration Chat</h3>
              <button @click="toggleParticipantsPanel" class="p-1 rounded-lg hover:bg-blue-50 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
            </div>

            <!-- Participants Panel (shown when toggled) -->
            <div v-if="showParticipantsPanel" class="mb-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Participants ({{ currentParticipants.length }})</h4>
              <div class="space-y-2">
                <div v-for="participant in currentParticipants" :key="participant.id" class="flex items-center p-2 hover:bg-blue-50 rounded-lg transition">
                  <img :src="participant.avatar" :alt="participant.name" class="h-8 w-8 rounded-full mr-3">
                  <div>
                    <p class="font-medium text-gray-800">{{ participant.name }}</p>
                    <p class="text-xs text-gray-500">{{ participant.status }}</p>
                  </div>
                  <div class="ml-auto h-3 w-3 rounded-full" :class="participant.active ? 'bg-green-500' : 'bg-gray-400'"></div>
                </div>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="flex-1 overflow-y-auto mb-4 space-y-3" ref="chatMessages">
              <div v-for="message in chatMessages" :key="message.id" 
                   class="flex"
                   :class="{ 'justify-end': message.sender === user.id, 'justify-start': message.sender !== user.id }">
                <div class="max-w-xs lg:max-w-md p-3 rounded-lg"
                     :class="message.sender === user.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'">
                  <div v-if="message.sender !== user.id" class="text-xs font-semibold mb-1" :class="`text-${getParticipant(message.sender).color}-600`">
                    {{ getParticipant(message.sender).name }}
                  </div>
                  <p>{{ message.text }}</p>
                  <div class="text-right mt-1 text-xs opacity-70">
                    {{ formatTime(message.timestamp) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="border-t border-gray-200 pt-3">
              <div class="flex">
                <input v-model="newMessage" @keyup.enter="sendMessage" 
                       type="text" placeholder="Type a message..." 
                       class="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500">
                <button @click="sendMessage" class="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center text-center h-96">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Start Collaborating</h3>
          <p class="text-gray-600 mb-6 max-w-md">Select an existing session or create a new whiteboard, document, or meeting to begin working with your team.</p>
          <div class="flex space-x-3">
            <button @click="startNewSession('whiteboard')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Whiteboard
            </button>
            <button @click="startNewSession('document')" class="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Document
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Notification Panel -->
    <div v-if="showNotificationPanel" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div class="bg-white w-80 h-full shadow-xl">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="font-bold text-lg">Notifications</h2>
          <button @click="toggleNotificationPanel" class="p-1 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="overflow-y-auto h-full">
          <div v-for="notification in notifications" :key="notification.id" 
               class="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
            <div class="flex items-start">
              <div class="p-2 rounded-lg mr-3" :class="getNotificationBgClass(notification.type)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getNotificationIcon(notification.type)" />
                </svg>
              </div>
              <div>
                <p class="font-medium">{{ notification.title }}</p>
                <p class="text-sm text-gray-600">{{ notification.message }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatTime(notification.timestamp) }}</p>
              </div>
            </div>
          </div>
          <div v-if="notifications.length === 0" class="p-8 text-center text-gray-500">
            No new notifications
          </div>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="font-bold text-lg">Invite Participants</h2>
          <button @click="showInviteModal = false" class="p-1 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Search Students</label>
            <input type="text" v-model="inviteSearch" placeholder="Type a name or email" 
                   class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="max-h-60 overflow-y-auto mb-4">
            <div v-for="student in filteredStudents" :key="student.id" 
                 class="flex items-center p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">
              <img :src="student.avatar" :alt="student.name" class="h-8 w-8 rounded-full mr-3">
              <div>
                <p class="font-medium">{{ student.name }}</p>
                <p class="text-xs text-gray-500">{{ student.email }}</p>
              </div>
              <input type="checkbox" v-model="selectedStudents" :value="student.id" class="ml-auto h-4 w-4 text-blue-600 rounded">
            </div>
          </div>
          <div class="flex justify-end space-x-3">
            <button @click="showInviteModal = false" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
            <button @click="sendInvites" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
              Send Invites
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
export default {
  name: 'CollaborationSuite',
  data() {
    return {
      user: {
        id: 'user1',
        name: 'Alex Johnson',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4e73df&color=ffffff&rounded=true'
      },
      activeSessions: [
        { id: 'session1', name: 'CS101 Study Group', type: 'whiteboard', creator: 'Maria Garcia', createdAt: '2023-05-20T14:30:00', participants: 4, active: true },
        { id: 'session2', name: 'Project Documentation', type: 'document', creator: 'James Wilson', createdAt: '2023-05-18T10:15:00', participants: 3, active: false },
        { id: 'session3', name: 'Final Exam Prep', type: 'meeting', creator: 'Sarah Lee', createdAt: '2023-05-15T16:45:00', participants: 5, active: true }
      ],
      currentSession: null,
      whiteboardTool: 'pen',
      showParticipantsPanel: true,
      chatMessages: [
        { id: 'msg1', sender: 'user2', text: 'Hey team! I just added the study notes to the document.', timestamp: '2023-05-20T15:30:00' },
        { id: 'msg2', sender: 'user1', text: 'Thanks Maria! I\'ll review them and add my comments.', timestamp: '2023-05-20T15:32:00' },
        { id: 'msg3', sender: 'user3', text: 'Can we schedule a meeting to go over the difficult concepts?', timestamp: '2023-05-20T15:35:00' },
        { id: 'msg4', sender: 'user4', text: 'I\'ve created a whiteboard for the algorithm diagrams.', timestamp: '2023-05-20T15:40:00' }
      ],
      newMessage: '',
      participants: [
        { id: 'user1', name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4e73df&color=ffffff&rounded=true', status: 'Online', active: true, color: 'blue' },
        { id: 'user2', name: 'Maria Garcia', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=1cc88a&color=ffffff&rounded=true', status: 'Online', active: true, color: 'green' },
        { id: 'user3', name: 'James Wilson', avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=f6c23e&color=ffffff&rounded=true', status: 'Away', active: false, color: 'yellow' },
        { id: 'user4', name: 'Sarah Lee', avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=e74a3b&color=ffffff&rounded=true', status: 'Offline', active: false, color: 'red' }
      ],
      recentFiles: [
        { id: 'file1', name: 'Lecture Notes.pdf', type: 'pdf', updated: '2023-05-20T12:30:00' },
        { id: 'file2', name: 'Study Guide.docx', type: 'docx', updated: '2023-05-19T09:15:00' },
        { id: 'file3', name: 'Project Diagram.png', type: 'png', updated: '2023-05-18T14:45:00' },
        { id: 'file4', name: 'Meeting Minutes.docx', type: 'docx', updated: '2023-05-17T16:20:00' }
      ],
      showNotificationPanel: false,
      unreadNotifications: 3,
      notifications: [
        { id: 'notif1', type: 'invite', title: 'New Session Invite', message: 'You\'ve been invited to join "CS101 Study Group"', timestamp: '2023-05-20T14:25:00' },
        { id: 'notif2', type: 'mention', title: 'You were mentioned', message: 'Maria mentioned you in a comment on "Project Documentation"', timestamp: '2023-05-19T11:40:00' },
        { id: 'notif3', type: 'update', title: 'Document updated', message: 'James updated "Study Guide.docx"', timestamp: '2023-05-18T17:15:00' },
        { id: 'notif4', type: 'reminder', title: 'Meeting reminder', title: 'Meeting starts in 15 minutes', message: 'Final Exam Prep session is about to start', timestamp: '2023-05-15T16:30:00' }
      ],
      showInviteModal: false,
      inviteSearch: '',
      selectedStudents: [],
      students: [
        { id: 'student1', name: 'Taylor Smith', email: 'taylor@university.edu', avatar: 'https://ui-avatars.com/api/?name=Taylor+Smith&background=36b9cc&color=ffffff&rounded=true' },
        { id: 'student2', name: 'Jordan Kim', email: 'jordan@university.edu', avatar: 'https://ui-avatars.com/api/?name=Jordan+Kim&background=5a5c69&color=ffffff&rounded=true' },
        { id: 'student3', name: 'Casey Brown', email: 'casey@university.edu', avatar: 'https://ui-avatars.com/api/?name=Casey+Brown&background=1cc88a&color=ffffff&rounded=true' },
        { id: 'student4', name: 'Riley Davis', email: 'riley@university.edu', avatar: 'https://ui-avatars.com/api/?name=Riley+Davis&background=f6c23e&color=ffffff&rounded=true' }
      ],
      meetingDate: '',
      meetingTime: '',
      meetingDuration: '60',
      meetingDescription: ''
    }
  },
computed: {
  currentParticipants() {
    if (!this.currentSession) return [];
    // In a real app, this would filter participants actually in the session
    return this.participants;
  },
  filteredStudents() {
    return this.students.filter(student => 
      student.name.toLowerCase().includes(this.inviteSearch.toLowerCase()) ||
      student.email.toLowerCase().includes(this.inviteSearch.toLowerCase())
    );
  },
},
  methods: {
    joinSession(sessionId) {
      this.currentSession = this.activeSessions.find(s => s.id === sessionId);
      // In a real app, this would connect to the actual session
    },
    startNewSession(type) {
      const newSession = {
        id: `session${this.activeSessions.length + 1}`,
        name: type === 'whiteboard' ? 'New Whiteboard' : 
              type === 'document' ? 'New Document' : 'New Meeting',
        type,
        creator: this.user.name,
        createdAt: new Date().toISOString(),
        participants: 1,
        active: true
      };
      this.activeSessions.unshift(newSession);
      this.currentSession = newSession;
    },
    toggleWhiteboardTool(tool) {
      this.whiteboardTool = tool;
    },
    toggleParticipantsPanel() {
      this.showParticipantsPanel = !this.showParticipantsPanel;
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      
      const message = {
        id: `msg${this.chatMessages.length + 1}`,
        sender: this.user.id,
        text: this.newMessage,
        timestamp: new Date().toISOString()
      };
      this.chatMessages.push(message);
      this.newMessage = '';
      
      // Auto-scroll to bottom of chat
      this.$nextTick(() => {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        }
      });
    },
    getParticipant(userId) {
      return this.participants.find(p => p.id === userId) || {};
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatTime(dateString) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    },
    getFileIcon(fileType) {
      switch(fileType) {
        case 'pdf': return 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z';
        case 'docx': return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
        case 'png': 
        case 'jpg': return 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z';
        default: return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      }
    },
    getFileBgClass(fileType) {
      switch(fileType) {
        case 'pdf': return 'bg-red-500';
        case 'docx': return 'bg-blue-500';
        case 'png': 
        case 'jpg': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    },
    toggleNotificationPanel() {
      this.showNotificationPanel = !this.showNotificationPanel;
      if (!this.showNotificationPanel) {
        this.unreadNotifications = 0;
      }
    },
    getNotificationIcon(type) {
      switch(type) {
        case 'invite': return 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z';
        case 'mention': return 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z';
        case 'update': return 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15';
        case 'reminder': return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z';
        default: return 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9';
      }
    },
    getNotificationBgClass(type) {
      switch(type) {
        case 'invite': return 'bg-blue-500';
        case 'mention': return 'bg-green-500';
        case 'update': return 'bg-yellow-500';
        case 'reminder': return 'bg-purple-500';
        default: return 'bg-gray-500';
      }
    },
    inviteParticipants() {
      this.showInviteModal = true;
      this.selectedStudents = [];
      this.inviteSearch = '';
    },
    sendInvites() {
      // In a real app, this would send actual invites
      this.showInviteModal = false;
      this.notifications.unshift({
        id: `notif${this.notifications.length + 1}`,
        type: 'invite',
        title: 'Invites sent',
        message: `You've invited ${this.selectedStudents.length} participants to ${this.currentSession.name}`,
        timestamp: new Date().toISOString()
      });
      this.unreadNotifications++;
    },
    downloadCurrentSession() {
      // In a real app, this would download the actual content
      alert(`Downloading ${this.currentSession.name}`);
    },
    scheduleMeeting() {
      if (!this.meetingDate || !this.meetingTime) {
        alert('Please select date and time');
        return;
      }
      
      // In a real app, this would schedule the meeting
      alert(`Meeting scheduled for ${this.meetingDate} at ${this.meetingTime} for ${this.meetingDuration} minutes`);
      
      this.notifications.unshift({
        id: `notif${this.notifications.length + 1}`,
        type: 'reminder',
        title: 'Meeting scheduled',
        message: `"${this.currentSession.name}" scheduled for ${this.meetingDate} at ${this.meetingTime}`,
        timestamp: new Date().toISOString()
      });
      this.unreadNotifications++;
    }
  },
  mounted() {
    // Auto-join the first active session for demo purposes
    if (this.activeSessions.length > 0) {
      this.joinSession(this.activeSessions[0].id);
    }
  }
}
</script>

<style>
/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>