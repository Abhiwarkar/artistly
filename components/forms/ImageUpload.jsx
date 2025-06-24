'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * ImageUpload Component
 * Handles image file upload with preview, validation, and drag-and-drop
 * Supports multiple file formats and size limits
 */
export default function ImageUpload({
  value,
  onChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ""
}) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  // Validate file
  const validateFile = (file) => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please use: ${acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}`
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1)
      return `File size too large. Maximum size is ${maxSizeMB}MB`
    }

    return null
  }

  // Handle file selection
  const handleFileSelect = (file) => {
    setError('')
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(file)

    // Update form value
    onChange(file)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  // Remove image
  const removeImage = () => {
    setPreview(null)
    setError('')
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Open file dialog
  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Upload area */}
      {!preview ? (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer",
            isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-gray-300 hover:border-gray-400",
            error && "border-red-300"
          )}
          onClick={openFileDialog}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4",
              isDragOver ? "bg-primary/10" : "bg-gray-100 dark:bg-gray-800"
            )}>
              <Upload className={cn(
                "h-8 w-8",
                isDragOver ? "text-primary" : "text-gray-400"
              )} />
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Upload Profile Image
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your image here, or click to browse
            </p>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>Supported formats: {acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}</p>
              <p>Maximum size: {formatFileSize(maxSize)}</p>
            </div>
            
            <Button type="button" variant="outline" className="mt-4">
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Preview area */
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Image preview */}
              <div className="relative">
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Remove button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* File info */}
              {value && (
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>{value.name}</span>
                  </div>
                  <span>{formatFileSize(value.size)}</span>
                </div>
              )}
              
              {/* Replace button */}
              <Button
                type="button"
                variant="outline"
                onClick={openFileDialog}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Upload tips */}
      {!preview && !error && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Tips:</strong> Use a high-quality, professional photo with good lighting. 
            Square images work best for profile pictures.
          </p>
        </div>
      )}
    </div>
  )
}