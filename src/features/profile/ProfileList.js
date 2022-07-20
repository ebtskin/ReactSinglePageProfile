import { useSelector, useDispatch } from "react-redux";
import { selectAllProfile, getPostByID, deletePostByID, getStateError } from "./profileSlice";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import Search from "./Search";

const ProfileList = ({ title, setTitle, setFormInputFields }) => {
    const dispatch = useDispatch();
    const [profiles, setProfiles] = useState();
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState();

    const allProfiles = useSelector(selectAllProfile);
    const error = useSelector(getStateError);

    useEffect(() => {
        setErrors(error);
    },[error])

    useEffect(() => {
        setProfiles(allProfiles);
    }, [allProfiles]);

    useEffect(() => {
        const filteredResults = profiles?.filter(
            (post) =>
                post.username.includes(search) || post.email.includes(search)
        );
        setProfiles(filteredResults);
        if (search.length < 1) {
            setProfiles(allProfiles)
        }
    }, [search, allProfiles]);

    const handleEditPost = async (ids) => {
        setTitle("Edit Post");
        const editPostInfo = await dispatch(getPostByID(ids));
        const {
            payload: { email, username, phone },
        } = editPostInfo;
        setFormInputFields({
            avatar: null,
            id: ids,
            username: username,
            email: email,
            phone: phone,
        });
    };

    const handleDelete = async (ids) => {
        try {
            const deleteResponse = await dispatch(deletePostByID(ids));
            console.log(deleteResponse);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="profile-container">
            <article className="nav">
                <Search search={search} setSearch={setSearch} />
                <button className="clear" onClick={() => setProfiles(null)}>
                    Clear
                </button>
            </article>
            <hr />
            {errors && errors !== "loading" ? (
                <article className="profile-cards">
                    <div className="card-containers">
                        {profiles?.length < 1 && <h3>No Profiles</h3>}
                        {profiles?.map((profile) => {
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
                                        <button
                                            className="delete"
                                            onClick={() => handleDelete(profile.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </article>
            ) : (<h3 className="loading">Loading Posts...</h3>)
            }
        </section>
    );
};

export default ProfileList;
