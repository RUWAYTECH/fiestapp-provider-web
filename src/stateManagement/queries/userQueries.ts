import { endpoints as ep } from "../../core/constants";
import { TagDescription } from "@reduxjs/toolkit/dist/query";

export const loginMutation = {
  query: (data: any) => {
    return {
      url: ep.user.login,
      data,
      method: "POST",
    };
  },
  transformResponse: (response: any) => response,
};

export const forgotPasswordMutation = {
  query: (data: any) => {
    return {
      url: ep.user.forgotPassword,
      data,
      method: "POST",
    };
  },
  transformResponse: (response: any) => response,
};

export const resetPasswordMutation = {
  query: (data: any) => {
    return {
      url: ep.user.resetPassword,
      data,
      method: "POST",
    };
  },
  transformResponse: (response: any) => response,
};

export const allSelectUserQuery = {
  query: () => {
    const path = ep.user.allSelectUser;
    return {
      url: path,
    };
  },
  transformResponse: (response: any) => response,
};

export const getUserByeRoleQuery = {
  query: (params: { params: any; rolType: any }) => {
    const path = ep.user.getUserByeRole
      .replace(":params", params.params)
      .replace(":rolType", params.rolType);
    return {
      url: path,
      method: "GET",
    };
  },
  transformResponse: (response: any) => response,
};

export const allSearchUserQuery = {
  query: (searchParams: string) => {
    const path = ep.user.allSearchchUser.replace(
      /:searchParams/g,
      encodeURIComponent(searchParams)
    );
    return {
      url: path,
      method: "GET",
    };
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
  providesTags: (result: any) =>
    result
      ? [
          ...result.map((user: any) => ({ type: "User", id: user.id })),
          { type: "User", id: "USER_LIST" },
        ]
      : [{ type: "User", id: "USER_LIST" }],
};

export const getUserById = {
  query: (idUser: string) => {
    const path = ep.user.getUserById.replace(":idUser", idUser);
    return {
      url: path,
      method: "GET",
    };
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
};

export const getUserIdQuery = {
  query: (id: any) => {
    return {
      url: ep.user.getUserId.replace(":id", id),
      method: "GET",
    };
  },
  keepUnusedDataFor: 0,
  transformResponse: (response: any) => response,
  providesTags: [{ type: "User", id: "USER_ITEM" } as TagDescription<any>],
};

export const addUserMutation = {
  query: (data: any) => {
    return {
      url: ep.user.addUser,
      data,
      method: "POST",
    };
  },
  transformResponse: (response: any) => response,
  invalidatesTags: (): TagDescription<any>[] => {
    return [
      { type: "User", id: "USER_LIST" },
      { type: "User", id: "USER_ITEM" },
    ];
  },
};

export const updateUserMutation = {
  query: ({ id, data }: { id: any; data: any }) => {
    return {
      url: ep.user.updateUser.replace(":id", id),
      data,
      method: "PUT",
    };
  },
  invalidatesTags: (): TagDescription<any>[] => {
    return [
      { type: "User", id: "USER_LIST" },
      { type: "User", id: "USER_ITEM" },
    ];
  },
};

export const deleteUserMutation = {
  query: (id: any) => {
    return {
      url: ep.user.deleteUser.replace(":id", id),
      method: "DELETE",
    };
  },
  invalidatesTags: (): TagDescription<any>[] => {
    return [
      { type: "User", id: "USER_LIST" },
      { type: "User", id: "USER_ITEM" },
    ];
  },
};

export const allUserRolQuery = {
  query: () => {
    const path = ep.user.getUserRol;
    return {
      url: path,
    };
  },
  transformResponse: (response: any) => response,
};
