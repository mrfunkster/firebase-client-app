import { CLEAR_USER_ID, HIDE_LOADER, SET_USER_DATA, SET_USER_ID, SHOW_LOADER, CLEAR_USER_DATA, ENTER_EDIT_MODE, EXIT_EDIT_MODE } from "./types"
import base from '../../firebase';
import history from '../history'


export const showLoader = () => {
    return {
        type: SHOW_LOADER
    };
};

export const hideLoader = () => {
    return {
        type: HIDE_LOADER
    };
};

export const setUserId = (payload) => {
    return {
        type: SET_USER_ID,
        payload
    };
};

export const clearUserId = () => {
    return {
        type: CLEAR_USER_ID
    };
};

export const setUserData = (payload) => {
    return {
        type: SET_USER_DATA,
        payload
    };
};

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    };
};

export const enterEditMode = () => {
    return {
        type: ENTER_EDIT_MODE
    };
};

export const exitEditMode = () => {
    return {
        type: EXIT_EDIT_MODE
    };
};

export const registerWithByEmailAndPassword = (formData) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            await base.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(cred => {
                    let userID = cred.user.uid;
                    const userData = {
                        email: formData.email,
                        password: formData.password
                    }
                    return base.database().ref('users/' + userID).set(userData)
                        .then(() => {
                            dispatch(setUserId(userID));
                            dispatch(setUserData(userData));
                            dispatch(hideLoader());
                            history.push('/account');
                        });
                });
        } catch (error) {
            alert(error.message);
            dispatch(hideLoader());
        }
    }
}

export const authWithEmailAndPassword = (formData) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            await base.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(cred => {
                    let userID = cred.user.uid;
                    return base.database().ref('users/' + userID).get()
                        .then(snapshot => {
                            if (snapshot.exists()) {
                                let userData = snapshot.val();
                                dispatch(setUserData(userData ? userData : {}));
                                dispatch(setUserId(userID));
                                dispatch(hideLoader());
                                history.push('/');
                            } else {
                                console.log("No Data available!")
                            }
    
                        });
                });
        } catch (error) {
            alert(error.message);
            dispatch(hideLoader());
        }
    }
}

export const updateUserInfo = (formData, userID) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            await base.database().ref('users/' + userID).update(formData)
                .then(() => {
                    dispatch(setUserData(formData));
                    dispatch(hideLoader());
                    dispatch(exitEditMode());
                });
        } catch (error) {
            alert(error.message);
            dispatch(hideLoader());
        };
    };
};

export const logOut = () => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            await base.auth().signOut()
                .then(() => {
                    dispatch(clearUserId());
                    dispatch(clearUserData());
                    dispatch(hideLoader());
                    history.push('/login');
                })
        } catch (error) {
            alert(error.message)
            dispatch(hideLoader());
        };
    };
};