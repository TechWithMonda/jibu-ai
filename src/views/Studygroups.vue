<template>
    <NavBar/> 
  <div class="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
    <!-- Server/Class Sidebar -->
    <div class="w-16 md:w-20 bg-gray-900 flex flex-col items-center py-4 space-y-4 overflow-y-auto">
      <div class="w-full flex justify-center">
        <button class="p-3 bg-indigo-600 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      <div class="w-full border-t border-gray-700"></div>
      
      <div v-for="classItem in classes" :key="classItem.id" 
           @click="selectClass(classItem.id)"
           class="relative p-2 rounded-lg cursor-pointer transition-all"
           :class="{'bg-indigo-600': selectedClassId === classItem.id, 'bg-gray-700 hover:bg-gray-600': selectedClassId !== classItem.id}">
        <img :src="classItem.icon" :alt="classItem.name" class="w-10 h-10 rounded-lg">
        <div v-if="classItem.unread" class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-gray-900"></div>
      </div>
    </div>

    <!-- Channels/Modules Sidebar -->
    <div class="w-60 bg-gray-800 text-gray-300 flex flex-col">
      <div class="p-4 border-b border-gray-900 shadow-sm flex items-center justify-between">
        <h2 class="font-bold truncate">{{ selectedClass?.name || 'Select a class' }}</h2>
        <button class="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto">
        <div v-for="module in modules" :key="module.id" class="mb-4">
          <div class="px-4 py-2 flex items-center justify-between text-gray-400 hover:text-white cursor-pointer"
               @click="toggleModule(module.id)">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 transform transition-transform"
                   :class="{'rotate-90': expandedModules.includes(module.id)}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-xs font-semibold uppercase">{{ module.name }}</span>
            </div>
            <span class="text-xs bg-gray-700 px-2 py-1 rounded-full">{{ module.unread }}</span>
          </div>

          <div v-if="expandedModules.includes(module.id)" class="ml-6">
            <div v-for="channel in module.channels" :key="channel.id"
                 @click="selectChannel(channel)"
                 class="px-2 py-1 flex items-center rounded text-sm cursor-pointer hover:bg-gray-700"
                 :class="{'bg-gray-700': selectedChannel?.id === channel.id}">
              <span class="mr-2" :class="channelIcon(channel.type)"></span>
              <span class="truncate">{{ channel.name }}</span>
              <span v-if="channel.unread" class="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{{ channel.unread }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-900 bg-gray-850">
        <div class="flex items-center space-x-2">
          <img :src="user.avatar" class="w-8 h-8 rounded-full" alt="User">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ user.name }}</p>
            <p class="text-xs text-gray-400 truncate">#{{ user.discriminator }}</p>
          </div>
          <button class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col bg-white">
      <!-- Channel Header -->
      <div class="h-14 border-b border-gray-200 flex items-center px-4 shadow-sm">
        <div class="flex items-center">
          <span class="mr-2" :class="channelIcon(selectedChannel?.type)"></span>
          <h2 class="font-bold">{{ selectedChannel?.name || 'Select a channel' }}</h2>
        </div>
        
        <div class="ml-auto flex items-center space-x-4">
          <button class="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button class="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="p-1 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Channel Content -->
      <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
        <!-- Empty State -->
        <div v-if="!selectedChannel" class="h-full flex flex-col items-center justify-center text-center p-8">
          <div class="max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-gray-900">No channel selected</h3>
            <p class="mt-2 text-sm text-gray-500">Select a channel from the sidebar to start collaborating with your classmates.</p>
          </div>
        </div>

        <!-- Channel Content -->
        <div v-else>
          <!-- Discussion Tab -->
          <div v-if="activeTab === 'discussion'" class="space-y-4">
            <div v-for="thread in currentThreads" :key="thread.id" class="bg-white rounded-lg shadow p-4">
              <div class="flex items-start space-x-3">
                <img :src="thread.author.avatar" class="w-10 h-10 rounded-full" alt="Author">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2">
                    <h3 class="font-medium text-gray-900">{{ thread.author.name }}</h3>
                    <span class="text-xs text-gray-500">{{ formatTime(thread.timestamp) }}</span>
                  </div>
                  <p class="mt-1 text-gray-700">{{ thread.content }}</p>
                  <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <button class="flex items-center hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {{ thread.replies }} replies
                    </button>
                    <button class="flex items-center hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      {{ thread.reactions }} reactions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Questions Tab -->
          <div v-else-if="activeTab === 'questions'" class="space-y-4">
            <div v-for="question in currentQuestions" :key="question.id" class="bg-white rounded-lg shadow p-4">
              <div class="flex items-start space-x-3">
                <img :src="question.author.avatar" class="w-10 h-10 rounded-full" alt="Author">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <h3 class="font-medium text-gray-900">{{ question.author.name }}</h3>
                      <span class="text-xs text-gray-500">{{ formatTime(question.timestamp) }}</span>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full" 
                          :class="question.answered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                      {{ question.answered ? 'Answered' : 'Unanswered' }}
                    </span>
                  </div>
                  <p class="mt-1 text-gray-700">{{ question.content }}</p>
                  <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <button class="flex items-center hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {{ question.answers }} answers
                    </button>
                    <button class="flex items-center hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      {{ question.upvotes }} upvotes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Tab -->
          <div v-else-if="activeTab === 'chat'" class="space-y-4">
            <div v-for="message in currentMessages" :key="message.id" 
                 class="flex"
                 :class="{'justify-end': message.author.id === user.id}">
              <div class="max-w-xs md:max-w-md lg:max-w-lg" 
                   :class="{'flex-row-reverse': message.author.id === user.id}">
                <div v-if="message.author.id !== user.id" class="flex-shrink-0 mr-3">
                  <img :src="message.author.avatar" class="w-8 h-8 rounded-full" alt="Author">
                </div>
                <div class="mt-1">
                  <div v-if="message.author.id !== user.id" class="text-xs font-medium text-gray-500 mb-1">
                    {{ message.author.name }}
                  </div>
                  <div class="px-4 py-2 rounded-lg"
                       :class="message.author.id === user.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'">
                    {{ message.content }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1 text-right">
                    {{ formatTime(message.timestamp) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Group Tab -->
          <div v-else-if="activeTab === 'group'" class="space-y-4">
            <div class="bg-white rounded-lg shadow p-4">
              <h3 class="font-medium text-gray-900 mb-3">Study Groups</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="group in currentGroups" :key="group.id" class="border rounded-lg p-3 hover:border-indigo-300 transition">
                  <div class="flex items-center space-x-3 mb-2">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-medium">{{ group.name }}</h4>
                      <p class="text-xs text-gray-500">{{ group.members }} members</p>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">{{ group.description }}</p>
                  <button class="w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Channel Tabs -->
      <div v-if="selectedChannel" class="border-t border-gray-200 bg-white">
        <div class="flex border-b border-gray-200">
          <button v-for="tab in tabs" :key="tab.id"
                  @click="activeTab = tab.id"
                  class="px-4 py-2 text-sm font-medium relative"
                  :class="{'text-indigo-600': activeTab === tab.id, 'text-gray-500 hover:text-gray-700': activeTab !== tab.id}">
            {{ tab.name }}
            <span v-if="tab.unread" class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        <!-- Input Area -->
        <div class="p-4">
          <div class="border border-gray-300 rounded-lg overflow-hidden">
            <textarea v-model="newMessage" @keyup.enter="sendMessage"
                      class="w-full px-3 py-2 focus:outline-none resize-none"
                      rows="2"
                      placeholder="Type your message here..."></textarea>
            <div class="bg-gray-50 px-3 py-2 flex justify-between items-center">
              <div class="flex space-x-2">
                <button class="p-1 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button class="p-1 text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <button @click="sendMessage"
                      class="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Members Sidebar -->
    <div v-if="selectedChannel" class="w-60 bg-gray-50 border-l border-gray-200 hidden lg:block overflow-y-auto">
      <div class="p-4 border-b border-gray-200">
        <h3 class="font-medium text-gray-900">Online - {{ onlineMembers.length }}</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div v-for="member in onlineMembers" :key="member.id" class="p-3 hover:bg-gray-100 transition">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <img :src="member.avatar" class="w-8 h-8 rounded-full" alt="Member">
              <div class="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p class="text-sm font-medium">{{ member.name }}</p>
              <p class="text-xs text-gray-500">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-b border-gray-200">
        <h3 class="font-medium text-gray-900">Offline - {{ offlineMembers.length }}</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div v-for="member in offlineMembers" :key="member.id" class="p-3 hover:bg-gray-100 transition">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <img :src="member.avatar" class="w-8 h-8 rounded-full opacity-60" alt="Member">
              <div class="absolute bottom-0 right-0 h-3 w-3 bg-gray-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">{{ member.name }}</p>
              <p class="text-xs text-gray-400">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
export default {
  name: 'StudyDiscord',
  data() {
    return {
      user: {
        id: 'user1',
        name: 'Alex Johnson',
        discriminator: '1234',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4e73df&color=ffffff&rounded=true'
      },
      selectedClassId: 'class1',
      selectedChannel: null,
      activeTab: 'discussion',
      expandedModules: ['module1', 'module2'],
      newMessage: '',
      tabs: [
        { id: 'discussion', name: 'Discussion', unread: 3 },
        { id: 'questions', name: 'Questions', unread: 1 },
        { id: 'chat', name: 'Chat', unread: 0 },
        { id: 'group', name: 'Groups', unread: 0 }
      ],
      classes: [
        {
          id: 'class1',
          name: 'CS101',
          icon: 'https://ui-avatars.com/api/?name=CS101&background=4e73df&color=ffffff&rounded=true',
          unread: 2
        },
        {
          id: 'class2',
          name: 'Math202',
          icon: 'https://ui-avatars.com/api/?name=Math202&background=e74a3b&color=ffffff&rounded=true',
          unread: 0
        },
        {
          id: 'class3',
          name: 'Physics101',
          icon: 'https://ui-avatars.com/api/?name=Physics101&background=1cc88a&color=ffffff&rounded=true',
          unread: 5
        }
      ],
      modules: [
        {
          id: 'module1',
          name: 'Introduction',
          unread: 3,
          channels: [
            { id: 'channel1', name: 'lecture-notes', type: 'text', unread: 2 },
            { id: 'channel2', name: 'assignments', type: 'text', unread: 1 },
            { id: 'channel3', name: 'resources', type: 'text', unread: 0 }
          ]
        },
        {
          id: 'module2',
          name: 'Data Structures',
          unread: 5,
          channels: [
            { id: 'channel4', name: 'arrays', type: 'text', unread: 3 },
            { id: 'channel5', name: 'linked-lists', type: 'text', unread: 2 },
            { id: 'channel6', name: 'study-group', type: 'voice', unread: 0 }
          ]
        },
        {
          id: 'module3',
          name: 'Algorithms',
          unread: 0,
          channels: [
            { id: 'channel7', name: 'sorting', type: 'text', unread: 0 },
            { id: 'channel8', name: 'searching', type: 'text', unread: 0 }
          ]
        }
      ],
      currentThreads: [
        {
          id: 'thread1',
          author: {
            id: 'user2',
            name: 'Maria Garcia',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=1cc88a&color=ffffff&rounded=true'
          },
          content: 'Has anyone completed the assignment yet? I\'m stuck on question 3.',
          timestamp: '2023-05-20T14:30:00',
          replies: 5,
          reactions: 3
        },
        {
          id: 'thread2',
          author: {
            id: 'user3',
            name: 'James Wilson',
            avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=f6c23e&color=ffffff&rounded=true'
          },
          content: 'I found this great resource for understanding linked lists: https://example.com/linked-lists',
          timestamp: '2023-05-19T10:15:00',
          replies: 2,
          reactions: 8
        }
      ],
      currentQuestions: [
        {
          id: 'question1',
          author: {
            id: 'user4',
            name: 'Sarah Lee',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=e74a3b&color=ffffff&rounded=true'
          },
          content: 'What\'s the time complexity of bubble sort in the worst case scenario?',
          timestamp: '2023-05-20T15:45:00',
          answers: 3,
          upvotes: 5,
          answered: true
        },
        {
          id: 'question2',
          author: {
            id: 'user5',
            name: 'Taylor Smith',
            avatar: 'https://ui-avatars.com/api/?name=Taylor+Smith&background=36b9cc&color=ffffff&rounded=true'
          },
          content: 'Can someone explain how recursive functions work with stack memory?',
          timestamp: '2023-05-19T18:20:00',
          answers: 1,
          upvotes: 2,
          answered: false
        }
      ],
      currentMessages: [
        {
          id: 'message1',
          author: {
            id: 'user2',
            name: 'Maria Garcia',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=1cc88a&color=ffffff&rounded=true'
          },
          content: 'Hey everyone! Does anyone want to form a study group for the exam?',
          timestamp: '2023-05-20T16:30:00'
        },
        {
          id: 'message2',
          author: {
            id: 'user1',
            name: 'Alex Johnson',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4e73df&color=ffffff&rounded=true'
          },
          content: 'I\'d be interested! What times work for everyone?',
          timestamp: '2023-05-20T16:35:00'
        },
        {
          id: 'message3',
          author: {
            id: 'user3',
            name: 'James Wilson',
            avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=f6c23e&color=ffffff&rounded=true'
          },
          content: 'I\'m free most evenings after 7pm. We could meet in the library?',
          timestamp: '2023-05-20T16:40:00'
        }
      ],
      currentGroups: [
        {
          id: 'group1',
          name: 'CS101 Study Group',
          description: 'Weekly meetups to review lecture material and work on assignments together',
          members: 8,
          active: true
        },
        {
          id: 'group2',
          name: 'Algorithm Masters',
          description: 'For students who want to go deeper into algorithm design and analysis',
          members: 5,
          active: true
        },
        {
          id: 'group3',
          name: 'Programming Help',
          description: 'Get help with coding problems and debugging from peers',
          members: 12,
          active: true
        }
      ],
      members: [
        {
          id: 'user1',
          name: 'Alex Johnson',
          avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4e73df&color=ffffff&rounded=true',
          role: 'Student',
          status: 'online'
        },
        {
          id: 'user2',
          name: 'Maria Garcia',
          avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=1cc88a&color=ffffff&rounded=true',
          role: 'TA',
          status: 'online'
        },
        {
          id: 'user3',
          name: 'James Wilson',
          avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=f6c23e&color=ffffff&rounded=true',
          role: 'Student',
          status: 'online'
        },
        {
          id: 'user4',
          name: 'Sarah Lee',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=e74a3b&color=ffffff&rounded=true',
          role: 'Student',
          status: 'offline'
        },
        {
          id: 'user5',
          name: 'Taylor Smith',
          avatar: 'https://ui-avatars.com/api/?name=Taylor+Smith&background=36b9cc&color=ffffff&rounded=true',
          role: 'Student',
          status: 'offline'
        }
      ]
    }
  },
  computed: {
    selectedClass() {
      return this.classes.find(c => c.id === this.selectedClassId);
    },
    onlineMembers() {
      return this.members.filter(m => m.status === 'online');
    },
    offlineMembers() {
      return this.members.filter(m => m.status === 'offline');
    }
  },
  methods: {
    selectClass(classId) {
      this.selectedClassId = classId;
      this.selectedChannel = null;
    },
    toggleModule(moduleId) {
      if (this.expandedModules.includes(moduleId)) {
        this.expandedModules = this.expandedModules.filter(id => id !== moduleId);
      } else {
        this.expandedModules.push(moduleId);
      }
    },
    selectChannel(channel) {
      this.selectedChannel = channel;
      this.activeTab = 'discussion';
    },
    channelIcon(type) {
      return type === 'voice' ? 'text-gray-500' : 'text-gray-400';
    },
    formatTime(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    sendMessage() {
      if (!this.newMessage.trim()) return;
      
      const message = {
        id: `message${this.currentMessages.length + 1}`,
        author: this.user,
        content: this.newMessage,
        timestamp: new Date().toISOString()
      };
      
      this.currentMessages.push(message);
      this.newMessage = '';
    }
  },
  mounted() {
    // Auto-select the first channel for demo purposes
    if (this.modules.length > 0 && this.modules[0].channels.length > 0) {
      this.selectedChannel = this.modules[0].channels[0];
    }
  }
}
</script>

<style>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
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