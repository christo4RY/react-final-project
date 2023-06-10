import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'https://contact-app.mmsdev.site/api/v1/'}),
    tagTypes:"authApi",
    endpoints:(builder) => ({
        setUser:builder.mutation({
            query:(data)=>({
                url:'register',
                method:"POST",
                body:data
            }),
            invalidatesTags:['authApi']
        }),
        getUser:builder.mutation({
            query:(data)=>({
                url:'login',
                method:"POST",
                body:data
            }),
            invalidatesTags:['authApi']
        }),
        logoutUser:builder.mutation({
            query:(token)=>({
                url:'user-logout',
                method:"POST",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        })
    })
})

export const { useSetUserMutation,useGetUserMutation,useLogoutUserMutation} = authApi