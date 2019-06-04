const validateProfile = formData => {
  let errors = {};
  if (formData.address === undefined || formData.address === null || formData.address === '') {
    errors.address = "Address is required"
  }
  if (formData.city === undefined || formData.city === null || formData.city === '') {
    errors.city = "City is required"
  }
  if (formData.postalCode === undefined || formData.postalCode === null || formData.postalCode === '') {
    errors.postalCode = "Postal code is required"
  }
  if (formData.country === undefined || formData.country === null || formData.country === '') {
    errors.country = "Country is required"
  }
  if (formData.shipping_region_id === 1 || formData.shipping_region_id === '') {
    errors.shipping_region_id = "Kindly select a region"
  }
  return {
    errors
  }
}

const validateSignIn = formData => {
  let errors = {};

  if (formData.email === undefined || formData.email === "") {
    errors.email = "Email is required"
  }

  if (formData.password === undefined || formData.password === "") {
    errors.password = "Password is required"
  }

  return {
    errors
  }
}

const validateSignUp = formData => {
  let errors = {};

  if (formData.email === undefined || formData.email === "") {
    errors.email = "Email is required"
  }

  if (formData.password === undefined || formData.password === "") {
    errors.password = "Password is required"
  }

  if (formData.name === undefined || formData.name === "") {
    errors.name = "Name is required"
  }

  return {
    errors
  }
}

export {
  validateProfile,
  validateSignIn,
  validateSignUp
}