import React from 'react';

const Diet = ({diet}) => {

	if (!diet) {
		return <div>Loading...</div>
	}

	const dietId = diet.id;
	const url = `https://www.youtube.com/embed/${videoId}`;

	return(
		<div className="video-detail col-md-8">
			<div className="embed-responsive embed-responsive-16by9">
			</div>
			<div className="details">
				<div>{diet.name}</div>
				<div>{diet.description}</div>
			</div>
		</div>

	)
};

module.exports = Diet;