import { useSelector } from "react-redux";
import { selectAllProfile } from "./profileSlice";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

const ProfileList = () => {
    const [usersProfiles, setUsersProfiles] = useState([]);
    const profiles = useSelector((state) => state.profiles);

    useEffect(() => {
        setUsersProfiles(profiles);
    }, [profiles]);

    return (
        <article className="profile-cards">
            <div className="card-containers">
                {profiles.length < 1 && <h3>No Profiles</h3>}
                {profiles.map((profile) => {
                    let data = [];
                    for (const [field, value] of Object.entries(profile)) {
                        data.push(
                            <ProfileCard
                                key={field}
                                field={field}
                                value={value}
                            />
                        );
                    }
                    return (<div className = "card-container" > { data } </div>);
                })}
            </div>
        </article>
    );
};

export default ProfileList;
