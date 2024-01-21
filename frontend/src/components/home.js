import React from 'react'
import axios from 'axios'

const id = localStorage.getItem('id');


const home = () => {
  return (
    <div>home
    <h1> user id is {id}</h1>
    </div>
  )
}

export default home