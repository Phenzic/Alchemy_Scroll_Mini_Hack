import React from 'react'
import PropTypes from 'prop-types'

function BtnSmall({title, onClick}) {
  return (
    <button
    className="border-[1px]  text-sm px-5 py-2 text-white bg-green-800 rounded-md"
    onClick={onClick}>
    {title}
  </button>

  )
}

BtnSmall.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default BtnSmall