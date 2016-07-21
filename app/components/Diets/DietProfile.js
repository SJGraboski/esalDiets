import React from 'react';

const DietProfile = ({diet, home}) => {
    const imgURL = 'http://www.clipartbest.com/cliparts/ace/6oX/ace6oXBc4.jpeg';

    if (!diet){
        return <div><img src={imgURL} /><div>Cannot find a match...</div></div>
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