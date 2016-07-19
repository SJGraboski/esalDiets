import React from 'react';
import Listitem from './ListItem';

const DietList = (props) => {
    const dietItems = props.diets.map((diet) => {
        return (
            <Listitem
                onDietSelect= {props.onDietSelect}
                diet={diet} />
        )
    });

    return(
        <ul className="col-md-4 list-group">
            {dietItems}
        </ul>
    )
};

module.exports = DietList;