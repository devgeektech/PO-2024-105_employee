import React, { useEffect, useState } from 'react';

export default function Redirect() {
    useEffect(()=>{
      const queryParams = new URLSearchParams(location.search);
        console.log(queryParams,">>> queryParams >>>>")
      },
    [])
    return (
        <div className="container py-4">
          <div className="row justify-content-center">

          </div>
        </div>
      );
}
