import React from 'react'

//Component for denomination filter checkboxes
function Checkbox({name, select, denominations}) {

    return (
        <div>
            <input type="checkbox" name={name} checked={denominations[name]} onChange={e => select(e)}/>
            <label htmlFor={name}>{name.toUpperCase()}</label>
        </div>
    )
}

export default Checkbox
