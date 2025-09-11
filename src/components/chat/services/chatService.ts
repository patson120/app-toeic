import type { Message, Contact, UploadProgress, Reaction } from '../types/chat'
import { FileCompressionService } from './fileCompression'

export class ChatService {
  private static messages: Message[] = []
  private static messageListeners: ((messages: Message[]) => void)[] = []
  private static uploadListeners: ((progress: UploadProgress) => void)[] = []
  private static searchResults: Message[] = []
  
  static getMessages(): Message[] {
    return this.messages
  }

  static addMessage(message: Omit<Message, 'id' | 'timestamp' | 'status'>): Message {
    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      status: 'sending',
      reactions: []
    }
    
    this.messages.push(newMessage)
    this.notifyMessageListeners()
    
    // Simuler l'envoi du message
    setTimeout(() => {
      newMessage.status = 'sent'
      this.notifyMessageListeners()
      
      setTimeout(() => {
        newMessage.status = 'delivered'
        this.notifyMessageListeners()
        
        setTimeout(() => {
          newMessage.status = 'read'
          this.notifyMessageListeners()
        }, 1000)
      }, 500)
    }, 300)
    
    return newMessage
  }

  static async uploadFile(file: File): Promise<Message> {
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    this.notifyUploadProgress({
      fileId,
      progress: 0,
      status: 'compressing'
    })

    const { file: processedFile, compressionRatio, thumbnail } = await FileCompressionService.compressFile(file)
    
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5
        
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          
          const fileUrl = URL.createObjectURL(processedFile)
          
          const message = this.addMessage({
            content: `Fichier envoyé: ${file.name}`,
            sender: 'user',
            type: file.type.startsWith('image/') ? 'image' : 
                  file.type.startsWith('video/') ? 'file' :
                  file.type.startsWith('audio/') ? 'voice' : 'file',
            fileData: {
              name: file.name,
              size: processedFile.size,
              originalSize: file.size,
              type: file.type,
              url: fileUrl,
              compressed: compressionRatio > 1.1,
              compressionRatio,
              thumbnail
            }
          })
          
          this.notifyUploadProgress({
            fileId,
            progress: 100,
            status: 'completed'
          })
          
          resolve(message)
        } else {
          this.notifyUploadProgress({
            fileId,
            progress,
            status: 'uploading'
          })
        }
      }, 80)
    })
  }

  static editMessage(messageId: string, newContent: string): void {
    const message = this.messages.find(m => m.id === messageId)
    if (message && message.sender === 'user') {
      message.content = newContent
      message.edited = true
      message.editedAt = new Date()
      this.notifyMessageListeners()
    }
  }

  static deleteMessage(messageId: string): void {
    const index = this.messages.findIndex(m => m.id === messageId)
    if (index > -1) {
      this.messages.splice(index, 1)
      this.notifyMessageListeners()
    }
  }

  static addReaction(messageId: string, emoji: string, userId: string): void {
    const message = this.messages.find(m => m.id === messageId)
    if (message) {
      if (!message.reactions) message.reactions = []
      
      // Supprimer la réaction existante si elle existe
      const existingIndex = message.reactions.findIndex(r => r.userId === userId && r.emoji === emoji)
      if (existingIndex > -1) {
        message.reactions.splice(existingIndex, 1)
      } else {
        message.reactions.push({
          emoji,
          userId,
          timestamp: new Date()
        })
      }
      
      this.notifyMessageListeners()
    }
  }

  static searchMessages(query: string): Message[] {
    if (!query.trim()) return []
    
    const lowercaseQuery = query.toLowerCase()
    return this.messages.filter(message => 
      message.content.toLowerCase().includes(lowercaseQuery) ||
      message.fileData?.name.toLowerCase().includes(lowercaseQuery)
    )
  }

  static onMessagesUpdate(callback: (messages: Message[]) => void): () => void {
    this.messageListeners.push(callback)
    return () => {
      const index = this.messageListeners.indexOf(callback)
      if (index > -1) {
        this.messageListeners.splice(index, 1)
      }
    }
  }

  static onUploadProgress(callback: (progress: UploadProgress) => void): () => void {
    this.uploadListeners.push(callback)
    return () => {
      const index = this.uploadListeners.indexOf(callback)
      if (index > -1) {
        this.uploadListeners.splice(index, 1)
      }
    }
  }

  private static notifyMessageListeners(): void {
    this.messageListeners.forEach(listener => listener(this.messages))
  }

  private static notifyUploadProgress(progress: UploadProgress): void {
    this.uploadListeners.forEach(listener => listener(progress))
  }

  static simulateContactResponse(): void {
    setTimeout(() => {
      const responses = [
        "Merci pour votre message ! 😊",
        "C'est très intéressant, pouvez-vous m'en dire plus ?",
        "J'ai bien reçu votre fichier, je regarde ça.",
        "Parfait ! Je vous reviens rapidement avec une réponse.",
        "Excellente idée ! Continuons sur cette voie.",
        "Je comprends votre point de vue. Voici ce que je propose...",
        "Merci pour ces informations détaillées ! 👍"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      this.addMessage({
        content: randomResponse,
        sender: 'contact',
        type: 'text'
      })
    }, 1000 + Math.random() * 2000)
  }

  // Simulation de statuts de contact plus réalistes
  static simulateContactActivity(): void {
    setInterval(() => {
      // Simuler des changements de statut aléatoires
      const statuses = ['online', 'away', 'busy'] as const
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
      
      // Émettre un événement de changement de statut (à implémenter si nécessaire)
    }, 30000) // Toutes les 30 secondes
  }
}