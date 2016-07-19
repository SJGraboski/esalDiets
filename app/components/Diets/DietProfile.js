import React from 'react';

const DietProfile = ({diet}) => {

    const dietId = diet.id;
    const dietPicture = diet.picture;
    const dietName = diet.name;
    const dietDescription = diet.description;

    return(
        <div className="col-md-8">
            <div>
                {dietName}
            </div>
            <div>
                {dietPicture}
            </div>
            <div>
                {dietDescription}
            </div>
        </div>

    )
};

module.exports = DietProfile;