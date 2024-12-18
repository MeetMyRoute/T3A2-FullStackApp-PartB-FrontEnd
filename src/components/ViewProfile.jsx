import "../stylesheets/ViewProfile.css"

export default function ViewProfile({profile}) {
    if (profile.data) {
        return (
            <div className="profileView">
                <section className="profileViewLeft">
                    <h2 className="viewName viewLocation">{profile.data.data.name}, {profile.data.data.location}</h2>

                    {profile.data.data.profilePic && <img src={profile.data.data.profilePic} alt="Profile Picture" id="viewProfilePic" />}

                    <h3 id="viewStatus">{profile.data.data.status}</h3>
                </section>
                <section className="profileViewRight">
                    {profile.data.data.travelPreferencesAndGoals.length > 0 ?
                    <div className="viewTravelPrefAndGoals"> 
                        <p>Travel Preferences & Goals:</p>
                        <ul className="viewTravelPrefAndGoalsItem">
                            {profile.data.data.travelPreferencesAndGoals.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div> :
                    null}

                    {profile.data.data.itineraries.length > 0 ?
                    <div className="viewItineraries"> 
                        <p>Travel Itineraries:</p>
                        {profile.data.data.itineraries.map((itinerary, index) => {
                            return <div key={index} className="itineraryCard">
                                <p className="itineraryDestination">Destination: {itinerary.destination} <br /></p>
                                <p className="itineraryDates">Dates: {itinerary.startDate} - {itinerary.endDate}</p>
                            </div>
                        })}
                    </div> :
                    null}

                    {profile.data.data.socialMediaLink && <a id="viewSocialMedia" href={profile.data.data.socialMediaLink}>{profile.data.data.socialMediaLink}</a>} <br />
                </section>
            </div>
        )
    } else {
        return (
            <h3 className="error">Error in loading profile, please try again.</h3>
        )
    }
}