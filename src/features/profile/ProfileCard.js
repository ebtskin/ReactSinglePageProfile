import { useEffect, useState } from 'react';

const ProfileCard = ({ field, value }) => {
    
    return (
        <div className="card">
            {field === "data" && (
                <img
                    className="avatar-img"
                    src={`data:image/jpg;base64,${value}`}
                    alt="avatar"
                ></img>
            )}
            {field === "username" && <h3 className="username">{value}</h3>}
            {field === "email" && (
                <p className="email">
                    {field}: {value}
                </p>
            )}
            {field === "phone" && (
                <p className="phone">
                    {field}: {value}
                </p>
            )}
        </div>
    );
};

export default ProfileCard;
