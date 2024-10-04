import React from 'react'

const Checkbox = () => {
  return (
    <div className="flex">
        <label className="label p-2">
            <span className="text-base label-text">Male</span>
        </label>
        <input type="checkbox" id="male" checked={isChecked.male} onChange={(e)=>handleCheckbox(e)} className="p-2 border-1 border-gray-500 border-solid"/>
        <label className="label p-2">
            <span className="text-base label-text">Female</span>
        </label>
        <input type="checkbox" id="female" checked={isChecked.female} onChange={(e)=>handleCheckbox(e)} className="p-2 border-1 border-gray-500 border-solid"/>
    </div>
  )
}

export default Checkbox