import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const profilesSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(profile) {
                return {
                    payload: {
                        username: profile.username,
                        avatar: profile.avatar,
                        id: nanoid(),
                        email: profile.email,
                        phone: profile.phone,
                    },
                };
            }

        }
    }
})

export const selectAllProfile = (state) => state.profile;
export const { profileAdded } = profilesSlice.actions;
export default profilesSlice.reducer;
