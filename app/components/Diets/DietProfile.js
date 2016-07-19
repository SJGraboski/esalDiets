import React from 'react';

const DietProfile = ({diet}) => {

    const dietId = diet.id;
    const dietImage = diet.image;
    const dietName = diet.name;
    const dietDescription = diet.description;

    return(
        <div className="col-md-8">
            <div>
                {dietName}
            </div>
            <div>
                {dietImage}
            </div>
            <div>
                {dietDescription}
            </div>
        </div>

    )
};

module.exports = DietProfile;