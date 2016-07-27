import React from 'react';
import ListItem from './ListItem';

const DietList = (props) => {
    const dietItems = props.diets.map((diet) => {
        return (
            <ListItem
                key={diet.id}
                onDietSelect={props.onDietSelect}
                diet={diet} />
        )
    });

    return(
        <ul className="col-md-3 list-group dietSearch">
            {dietItems}
        </ul>
    )
};

module.exports = DietList;