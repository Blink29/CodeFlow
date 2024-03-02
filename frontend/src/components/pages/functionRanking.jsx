import React from 'react'
import { useLocation } from 'react-router-dom'

const FunctionRanking = () => {
    const location = useLocation();
    const data = location.state
    console.log(data);

  return (
    <div>FunctionRanking</div>
  )
}

export default FunctionRanking