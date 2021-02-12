import { CLEAR_USER_ID, HIDE_LOADER, SET_USER_DATA, SET_USER_ID, SHOW_LOADER, CLEAR_USER_DATA } from "./types"
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
        type: CLEAR_USER_ID,
    };
};

export const setUserData = (payload) => {
    return {
        type: SET_USER_DATA,
        payload
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA,
    }
}

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
                    return base.firestore().collection('usersData').doc(userID).set(userData)
                        .then(() => {
                            dispatch(setUserId(userID));
                            dispatch(setUserData(userData));
                            dispatch(hideLoader());
                            history.push('/');
                        });
                });
        } catch (error) {
            dispatch(hideLoader());
            console.log(error);
        }
    }
}

export const authWithEmailAndPassword = (formData) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            await base.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(async cred => {
                    let userID = cred.user.uid;
                    return await base.firestore().collection('usersData').doc(userID).get()
                        .then(doc => {
                            let userData = doc.data()
                            dispatch(setUserData(userData ? userData : {}));
                            dispatch(setUserId(userID));
                            dispatch(hideLoader());
                            history.push('/');
                        });
                });
        } catch (error) {
            dispatch(hideLoader());
            alert("Please enter correct email/password!")
        }
    }
}

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
            alert("Something Wrong!")
            dispatch(hideLoader());
        }
    }
}