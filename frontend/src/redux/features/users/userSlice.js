import {createSlice} from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
   try {
      const serializedState = JSON.parse(localStorage.getItem('user'));

      if (serializedState == null) {
         return {user: null};
      }
      return {user: serializedState};

   } catch(err) {
      return {user: null};

   }
}

const initialState = loadUserFromLocalStorage();

const userSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      setUser : (state, action) => {
         state.user = action.payload.user;
         localStorage.setItem('user', JSON.stringify( state.user))
      },
      signOut : (state) => {
         state.user = null;
         localStorage.removeItem('user');
      }

   }
});

export const {setUser, signOut} = userSlice.actions;
export default userSlice.reducer;