import {LoginRequest} from "@/lib/types";
import {createAppSlice} from "@/lib/createAppSlice";

export interface AuthSlice{
    token : string;
}

const initialState: AuthSlice = {
    token: '',
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authSlice = createAppSlice({
    name : "auth",
    initialState,
    reducers : (create ) => ({
       login : create.asyncThunk(
           async (request : LoginRequest, {rejectWithValue}) => {
                const response = await fetch(`${BASE_URL}/users/login`, {
                   headers : {
                        "content-type": "application/json"
                    },
                    method : 'POST',
                    body : JSON.stringify(request),
                });
                const json = await response.json();
                if(!json.token){
                    console.log('Failed to login ', json);
                    //throw new Error(json.message); same line work  rejectWithValue(json.message)
                    rejectWithValue(json.message)
                }
                return json.token; // payload-> fulfilled
           },
           {
               pending : (state ) => {
                   state.token = '';
               },
               fulfilled : (state, action) => {
                    state.token = action.payload;
               },
               rejected: (state) => {

               }
           }
       ),
        logout : create.reducer((state) => {
            state.token = '';
        })
    }),

    selectors : {
        selectAuth : (state ) => state.token
    }
});

export const {login, logout} = authSlice.actions;
export const {selectAuth} = authSlice.selectors;

//30min