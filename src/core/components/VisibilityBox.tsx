import React from 'react'

interface Props{
    show: boolean,
    children?: any
}
const VisibilityBox = ({show,children}:Props) => {
  if(!show) return;
  return (children);
}

export default VisibilityBox;