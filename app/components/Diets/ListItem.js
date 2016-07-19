import React from 'react';

const ListItem = ({diet, onDietSelect}) => {
    const imgURL = diet.picture;


    return (
        <li onClick={() => onDietSelect(diet)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" src={imgURL} />
                </div>
                <div className="media-body">
                    <div className="media-heading">
                        {diet.name}
                    </div>
                </div>
            </div>
        </li>
    )
};

module.exports = ListItem;