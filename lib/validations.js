import * as yup from 'yup'

/**
 * Form validation schemas using Yup
 * Provides comprehensive validation for all forms in the application
 */

// Common validation patterns
const PHONE_REGEX = /^[+]?[91]?[6-9]\d{9}$/
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

// Artist onboarding form validation schema
export const onboardingSchema = yup.object().shape({
  // Personal Information
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  bio: yup
    .string()
    .required('Professional bio is required')
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must be less than 500 characters'),

  contactEmail: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(PHONE_REGEX, 'Please enter a valid Indian phone number'),

  // Professional Details
  category: yup
    .array()
    .of(yup.string())
    .required('At least one category is required')
    .min(1, 'Please select at least one category')
    .max(3, 'Maximum 3 categories allowed'),

  languages: yup
    .array()
    .of(yup.string())
    .required('At least one language is required')
    .min(1, 'Please select at least one language')
    .max(5, 'Maximum 5 languages allowed'),

  feeRange: yup
    .string()
    .required('Fee range is required'),

  location: yup
    .string()
    .required('Location is required'),

  experience: yup
    .number()
    .required('Experience is required')
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience cannot exceed 50 years')
    .integer('Experience must be a whole number'),

  // Social Media (optional but must be valid URLs if provided)
  socialMedia: yup.object().shape({
    instagram: yup
      .string()
      .nullable()
      .test('is-url', 'Please enter a valid Instagram URL', function(value) {
        if (!value) return true // Allow empty
        return URL_REGEX.test(value) && value.includes('instagram.com')
      }),

    youtube: yup
      .string()
      .nullable()
      .test('is-url', 'Please enter a valid YouTube URL', function(value) {
        if (!value) return true // Allow empty
        return URL_REGEX.test(value) && (value.includes('youtube.com') || value.includes('youtu.be'))
      }),

    website: yup
      .string()
      .nullable()
      .test('is-url', 'Please enter a valid website URL', function(value) {
        if (!value) return true // Allow empty
        return URL_REGEX.test(value)
      })
  })
})

// Contact form validation schema
export const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),

  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),

  message: yup
    .string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters')
})

// Validation helper functions
export const validateField = async (schema, field, value) => {
  try {
    await yup.reach(schema, field).validate(value)
    return null // No error
  } catch (error) {
    return error.message
  }
}

export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false })
    return { isValid: true, errors: {} }
  } catch (error) {
    const errors = {}
    error.inner.forEach(err => {
      errors[err.path] = err.message
    })
    return { isValid: false, errors }
  }
}