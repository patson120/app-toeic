export class FileCompressionService {
  private static readonly MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB
  private static readonly MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB
  private static readonly QUALITY_SETTINGS = {
    high: 0.9,
    medium: 0.7,
    low: 0.5
  }

  static async compressFile(file: File): Promise<{ file: File; compressionRatio: number; thumbnail?: string }> {
    if (this.isImageFile(file) && file.size > this.MAX_IMAGE_SIZE) {
      return this.compressImage(file)
    }
    
    if (this.isVideoFile(file)) {
      const thumbnail = await this.generateVideoThumbnail(file)
      return { file, compressionRatio: 1, thumbnail }
    }
    
    return { file, compressionRatio: 1 }
  }

  private static isImageFile(file: File): boolean {
    return file.type.startsWith('image/') && 
           ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
  }

  private static isVideoFile(file: File): boolean {
    return file.type.startsWith('video/')
  }

  private static async compressImage(file: File): Promise<{ file: File; compressionRatio: number }> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      
      img.onload = () => {
        const maxDimension = 1920
        let { width, height } = img
        
        if (width > height && width > maxDimension) {
          height = (height * maxDimension) / width
          width = maxDimension
        } else if (height > maxDimension) {
          width = (width * maxDimension) / height
          height = maxDimension
        }
        
        canvas.width = width
        canvas.height = height
        
        ctx.drawImage(img, 0, 0, width, height)
        
        let quality = this.QUALITY_SETTINGS.high
        if (file.size > 5 * 1024 * 1024) quality = this.QUALITY_SETTINGS.medium
        if (file.size > 10 * 1024 * 1024) quality = this.QUALITY_SETTINGS.low
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              
              const compressionRatio = file.size / compressedFile.size
              resolve({ file: compressedFile, compressionRatio })
            } else {
              resolve({ file, compressionRatio: 1 })
            }
          },
          'image/jpeg',
          quality
        )
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  private static async generateVideoThumbnail(file: File): Promise<string> {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      
      video.onloadedmetadata = () => {
        canvas.width = 320
        canvas.height = (video.videoHeight / video.videoWidth) * 320
        
        video.currentTime = Math.min(video.duration * 0.1, 5) // 10% ou 5s max
      }
      
      video.onseeked = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8)
        resolve(thumbnail)
      }
      
      video.src = URL.createObjectURL(file)
    })
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static getFileIcon(type: string): string {
    if (type.startsWith('image/')) return '🖼️'
    if (type.startsWith('video/')) return '🎥'
    if (type.startsWith('audio/')) return '🎵'
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    return '📎'
  }
}