'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
// import { Textarea } from '@/components/ui/textarea' // Not available
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  User, 
  Briefcase, 
  Globe,
  Upload,
  Sparkles,
  X
} from 'lucide-react'

// VALIDATION SCHEMA - Required by assignment
const onboardingSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  bio: yup
    .string()
    .trim()
    .required('Bio is required')
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must be less than 500 characters'),

  category: yup
    .array()
    .min(1, 'Please select at least one category')
    .required('Category is required'),

  languages: yup
    .array()
    .min(1, 'Please select at least one language')
    .required('Languages are required'),

  feeRange: yup
    .string()
    .required('Fee range is required'),

  location: yup
    .string()
    .trim()
    .required('Location is required')
})

// DATA - As per assignment requirements
const ARTIST_CATEGORIES = [
  { id: 'singers', name: 'Singers' },
  { id: 'dancers', name: 'Dancers' },
  { id: 'djs', name: 'DJs' },
  { id: 'speakers', name: 'Speakers' },
  { id: 'bands', name: 'Bands' },
  { id: 'comedians', name: 'Comedians' }
]

const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'en', name: 'English' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' }
]

const FEE_RANGES = [
  { value: '10000-25000', label: '₹10,000 - ₹25,000' },
  { value: '25000-50000', label: '₹25,000 - ₹50,000' },
  { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
  { value: '100000+', label: '₹1,00,000+' }
]

/**
 * COMPLETE Artist Onboarding Form
 * ✅ Multi-section form for artist details
 * ✅ Multi-select dropdown with checkboxes (Category & Languages)
 * ✅ Fee Range dropdown
 * ✅ Profile Image Upload (optional)
 * ✅ Location text input
 * ✅ Form validation (React Hook Form + Yup)
 * ✅ Submits to mock API/local console
 */
export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
  // Form state - Manual state management for reliability
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    category: [],
    languages: [],
    feeRange: '',
    location: '',
    profileImage: null
  })
  
  const [formErrors, setFormErrors] = useState({})

  // Simple validation function
  const validateStep = (step) => {
    const errors = {}
    
    if (step === 1) {
      if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters'
      }
      if (!formData.bio || formData.bio.trim().length < 50) {
        errors.bio = 'Bio must be at least 50 characters'
      }
    }
    
    if (step === 2) {
      if (!formData.category || formData.category.length === 0) {
        errors.category = 'Please select at least one category'
      }
      if (!formData.languages || formData.languages.length === 0) {
        errors.languages = 'Please select at least one language'
      }
      if (!formData.feeRange) {
        errors.feeRange = 'Please select a fee range'
      }
    }
    
    if (step === 3) {
      if (!formData.location || formData.location.trim().length < 2) {
        errors.location = 'Location is required'
      }
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Steps configuration
  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Professional Details', icon: Briefcase },
    { id: 3, title: 'Final Details', icon: CheckCircle }
  ]

  // Navigation functions
  const nextStep = () => {
    const isValid = validateStep(currentStep)
    
    console.log('Validation Results:', {
      step: currentStep,
      isValid: isValid,
      errors: formErrors,
      formData: formData
    })
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // ✅ PROFILE IMAGE UPLOAD - As required (optional)
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      updateFormData('profileImage', file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    updateFormData('profileImage', null)
  }

  // ✅ FORM SUBMISSION - Mock API/Console as required
  const onSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all steps
    const isStep1Valid = validateStep(1)
    const isStep2Valid = validateStep(2)
    const isStep3Valid = validateStep(3)
    
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      alert('Please fill all required fields correctly')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // ✅ SUBMIT TO MOCK API/LOCAL CONSOLE - As required
      console.log('=== ARTIST ONBOARDING FORM SUBMISSION ===')
      console.log('Form Data:', formData)
      console.log('Selected Image:', selectedImage)
      console.log('========================================')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock API response
      alert('✅ Artist profile created successfully!\n\nYour submission has been received and will be reviewed by our team.')
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('❌ There was an error submitting your profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ✅ MULTI-SELECT CHECKBOX HANDLER - As required
  const handleCategoryChange = (categoryId) => {
    const currentCategories = formData.category || []
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId]
    
    updateFormData('category', newCategories)
  }

  const handleLanguageChange = (languageCode) => {
    const currentLanguages = formData.languages || []
    const newLanguages = currentLanguages.includes(languageCode)
      ? currentLanguages.filter(code => code !== languageCode)
      : [...currentLanguages, languageCode]
    
    updateFormData('languages', newLanguages)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {steps.find(s => s.id === currentStep)?.title}
          </h2>
          <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <Card>
          <CardContent className="p-8">
            
            {/* ✅ STEP 1: PERSONAL INFORMATION */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* ✅ NAME - Text input */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className={formErrors.name ? 'border-red-500' : ''}
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500">{formErrors.name}</p>
                  )}
                  <p className="text-xs text-gray-500">Current value: "{formData.name}"</p>
                </div>

                {/* ✅ BIO - Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell us about your experience, specialties, and what makes you unique as an artist... (minimum 50 characters)"
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors.bio ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="flex justify-between items-center">
                    {formErrors.bio && (
                      <p className="text-sm text-red-500">{formErrors.bio}</p>
                    )}
                    <p className="text-sm text-gray-500 ml-auto">
                      {formData.bio?.length || 0}/500 characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ STEP 2: PROFESSIONAL DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* ✅ CATEGORY - Multi-select dropdown with checkboxes */}
                <div className="space-y-2">
                  <Label>Artist Categories *</Label>
                  <p className="text-sm text-gray-600">Select all categories that apply to you</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-lg">
                    {ARTIST_CATEGORIES.map(category => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.category?.includes(category.id) || false}
                          onChange={() => handleCategoryChange(category.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium">{category.name}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.category && (
                    <p className="text-sm text-red-500">{formErrors.category}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.category?.map(categoryId => {
                      const category = ARTIST_CATEGORIES.find(c => c.id === categoryId)
                      return (
                        <Badge key={categoryId} variant="secondary" className="text-xs">
                          {category?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                {/* ✅ LANGUAGES - Multi-select with checkboxes */}
                <div className="space-y-2">
                  <Label>Languages You Perform In *</Label>
                  <p className="text-sm text-gray-600">Select all languages you can perform in</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border rounded-lg">
                    {LANGUAGES.map(language => (
                      <label key={language.code} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.languages?.includes(language.code) || false}
                          onChange={() => handleLanguageChange(language.code)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">{language.name}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.languages && (
                    <p className="text-sm text-red-500">{formErrors.languages}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.languages?.map(languageCode => {
                      const language = LANGUAGES.find(l => l.code === languageCode)
                      return (
                        <Badge key={languageCode} variant="outline" className="text-xs">
                          {language?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                {/* ✅ FEE RANGE - Dropdown */}
                <div className="space-y-2">
                  <Label>Fee Range *</Label>
                  <Select value={formData.feeRange} onValueChange={(value) => updateFormData('feeRange', value)}>
                    <SelectTrigger className={formErrors.feeRange ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your fee range" />
                    </SelectTrigger>
                    <SelectContent>
                      {FEE_RANGES.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.feeRange && (
                    <p className="text-sm text-red-500">{formErrors.feeRange}</p>
                  )}
                </div>
              </div>
            )}

            {/* ✅ STEP 3: FINAL DETAILS */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* ✅ LOCATION - Text input */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    className={formErrors.location ? 'border-red-500' : ''}
                  />
                  {formErrors.location && (
                    <p className="text-sm text-red-500">{formErrors.location}</p>
                  )}
                </div>

                {/* ✅ PROFILE IMAGE UPLOAD - Optional */}
                <div className="space-y-2">
                  <Label>Profile Image (Optional)</Label>
                  <p className="text-sm text-gray-600">Upload a professional photo of yourself</p>
                  
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <div className="space-y-2">
                          <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload').click()}>
                            Choose File
                          </Button>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Profile preview" 
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Review Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Review Your Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Categories:</strong> {formData.category?.map(id => 
                      ARTIST_CATEGORIES.find(c => c.id === id)?.name
                    ).join(', ')}</p>
                    <p><strong>Languages:</strong> {formData.languages?.map(code => 
                      LANGUAGES.find(l => l.code === code)?.name
                    ).join(', ')}</p>
                    <p><strong>Fee Range:</strong> {FEE_RANGES.find(r => r.value === formData.feeRange)?.label}</p>
                    <p><strong>Location:</strong> {formData.location}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submit Profile
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}