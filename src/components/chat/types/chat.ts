export interface Message {
  id: string
  content: string
  sender: 'user' | 'contact'
  timestamp: Date
  type: 'text' | 'file' | 'image' | 'voice'
  fileData?: FileData
  status: 'sending' | 'sent' | 'delivered' | 'read'
  replyTo?: string
  reactions?: Reaction[]
  edited?: boolean
  editedAt?: Date
}

export interface FileData {
  name: string
  size: number
  originalSize?: number
  type: string
  url: string
  compressed?: boolean
  compressionRatio?: number
  duration?: number // Pour les fichiers audio/vidéo
  thumbnail?: string
}

export interface Contact {
  id: string
  name: string
  avatar: string
  lastSeen: Date
  isOnline: boolean
  isTyping: boolean
  status: 'online' | 'away' | 'busy' | 'offline'
}

export interface UploadProgress {
  fileId: string
  progress: number
  status: 'compressing' | 'uploading' | 'completed' | 'error'
}

export interface Reaction {
  emoji: string
  userId: string
  timestamp: Date
}

export interface ChatSettings {
  theme: 'light' | 'dark' | 'auto'
  notifications: boolean
  soundEnabled: boolean
  fontSize: 'small' | 'medium' | 'large'
  autoDownload: boolean
}