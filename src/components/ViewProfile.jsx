import "../stylesheets/ViewProfile.css"

export default function ViewProfile({profileData}) {
    if (profileData.name) {
        return (
            <div className="profileView">
                <section className="profileViewLeft">
                    <h2 className="viewName viewLocation">{profileData.name}, {profileData.location}</h2>

                    {profileData.profilePic && <img src={profileData.profilePic} alt="Profile Picture" id="viewProfilePic" />}

                    <h3 id="viewStatus">{profileData.status}</h3>
                </section>
                <section className="profileViewRight">
                    {profileData.travelPreferencesAndGoals.length > 0 ?
                    <div className="viewTravelPrefAndGoals"> 
                        <p>Travel Preferences & Goals:</p>
                        <ul className="viewTravelPrefAndGoalsItem">
                            {profileData.travelPreferencesAndGoals.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div> :
                    null}

                    {profileData.itineraries.length > 0 ?
                    <div className="viewItineraries"> 
                        <p>Travel Itineraries:</p>
                        {profileData.itineraries.map((itinerary, index) => {
                            return <div key={index} className="itineraryCard">
                                <p className="itineraryDestination">Destination: {itinerary.destination} <br /></p>
                                <p className="itineraryDates">Dates: {itinerary.startDate} - {itinerary.endDate}</p>
                            </div>
                        })}
                    </div> :
                    null}

                    {profileData.socialMediaLink && <a id="viewSocialMedia" href={profileData.socialMediaLink}>{profileData.socialMediaLink}</a>} <br />
                </section>
            </div>
        )
    } else {
        return (
            <h3 className="error">Error in loading profile, please try again.</h3>
        )
    }
}