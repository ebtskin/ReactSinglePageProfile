import { useSelector, useDispatch } from "react-redux";
import { selectAllProfile, getPostByID } from "./profileSlice";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

const ProfileList = ({ title, setTitle, setFormInputFields }) => {
    const dispatch = useDispatch();
    const [profiles, setProfiles] = useState();
    const allProfiles = useSelector(selectAllProfile);

    useEffect(() => {
        setProfiles(allProfiles);
    }, [allProfiles]);

    const handleEditPost = async (ids) => {
        setTitle("Edit Post");
        const editPostInfo = await dispatch(getPostByID(ids));
        const {
            payload: { email, username, phone},
        } = editPostInfo;
        setFormInputFields({
            avatar: null,
            id: ids,
            username: username,
            email: email,
            phone: phone,
        });
    };

    return (
        <section className="profile-container">
            <button onClick={() => setProfiles(null)}>Clear</button>
            <hr />
            <article className="profile-cards">
                <div className="card-containers">
                    {allProfiles?.length < 1 && <h3>No Profiles</h3>}
                    {allProfiles?.map((profile) => {
                        let data = [];
                        for (const [field, value] of Object.entries(profile)) {
                            data.push(
                                <ProfileCard
                                    key={profile.id + field}
                                    field={field}
                                    value={value}
                                />
                            );
                        }
                        return (
                            <div className="card-container">
                                {" "}
                                {data}{" "}
                                <div className="form-buttons">
                                    <button
                                        className="edit"
                                        onClick={() =>
                                            handleEditPost(profile.id)
                                        }
                                    >
                                        Edit
                                    </button>{" "}
                                    <button className="delete">Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>
        </section>
    );
};

export default ProfileList;
