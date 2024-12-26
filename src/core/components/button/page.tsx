"use client"
import React from 'react'
import { Button } from 'react-bootstrap'
interface Props{
  
    type?: "button" | "submit" | "reset",
    className? : string,
    label?: string,
    onPress?(): void
}
export default function CommonButton({label,type='button',onPress, className}:Props) {
  return (
    <>
        <Button type={type} className={className} onClick={onPress} > {label}</Button>
    </>
  )
}
