import React from 'react';
import SelectItem from './components/SelectItem';
import './Selects.scss';




const Selects = ({
    selectItems,
    showDropdown
}) => {
    let className = "select "
    if(showDropdown){
        className += "select__active"
    }
    return (
        <div className={className}>
            <div className='select__corner' />
            <div className='select__incer'>
                {selectItems.map((item) => {
                    return (
                        <SelectItem key={item.key}
                                    item = {item.value} />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Selects;