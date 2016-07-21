import React from 'react';

const DietProfile = ({diet, home}) => {

    if (!diet){
        return <div>Loading...</div>
    }

    const dietId = diet.id;
    const dietImage = diet.image;
    const dietName = diet.name;
    const dietDescription = diet.description;

    return(
        <div className="col-md-8">
            <div>
                {dietName}
            </div>
            <img className="media-object" src={dietImage} />
            <div>
                {dietDescription}
            </div>
        </div>

    )
};

module.exports = DietProfile;