import React from 'react';

const ListItem = ({diet, onDietSelect}) => {
    const imgURL = "http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/128/Accept-icon.png";
    console.log(diet);


    return (
        <li onClick={() => onDietSelect(diet) } className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                   {/* <img className="media-object" src={imgURL} /> */}
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