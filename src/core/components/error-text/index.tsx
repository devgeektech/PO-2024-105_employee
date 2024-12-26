import React from 'react'

interface Props{
    show?: any,
    message?: string| any
}
const ErrorText = ({show, message}:Props) => {
  if (!show) return "";
  return (
    <p className="errorMessage">{message}</p>
  )
}

export default ErrorText;