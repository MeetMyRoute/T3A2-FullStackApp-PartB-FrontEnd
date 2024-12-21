import "../stylesheets/ViewProfile.css"

export default function ViewProfile({profile}) {
    console.log(profile)
        return (
            <div className="profileView">
                <section className="profileViewLeft">
                    {/* Name and location display*/}
                    <h2 className="viewName viewLocation">{profile.name}, {profile.location}</h2>

                    {/* Profile picture display*/}
                    {profile.profilePic && <img src={profile.profilePic} alt="Profile Picture" id="viewProfilePic" />}

                    {/* Status display*/}
                    <h3 id="viewStatus">{profile.status}</h3>
                </section>
                <section className="profileViewRight">

                    {/* Travel preferences and goals display*/}
                    {profile.travelPreferencesAndGoals.length > 0 ?
                    <div className="viewTravelPrefAndGoals"> 
                        <p>Travel Preferences & Goals:</p>
                        <ul className="viewTravelPrefAndGoalsItem">
                            {profile.travelPreferencesAndGoals.map((item, index) => (
                            <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div> :
                    null}

                    {/* Itinerary display*/}
                    {profile.itineraries.length > 0 ?
                    <div className="viewItineraries"> 
                        <p>Travel Itineraries:</p>
                        {profile.itineraries.map((itinerary, index) => {
                            return <div key={index} className="itineraryCard">
                                <p className="itineraryDestination">Destination: {itinerary.destination} <br /></p>
                                <p className="itineraryDates">Dates: {itinerary.startDate} - {itinerary.endDate}</p>
                            </div>
                        })}
                    </div> :
                    null}

                    {/* Social media link display*/}
                    {profile.socialMediaLink && <a id="viewSocialMedia" href={profile.socialMediaLink}>{profile.socialMediaLink}</a>} <br />
                </section>
            </div>
        )
}