import { endpoints as ep } from "../../core/constants";
import  menu from "../../stateManagement/models/dataMock/menuWeb.json";
export const getAccountMenuQuery = {
  query: (data: any) => {
      return {
        url: ep.account.menu.replace(':profileId', data.profileId),
        data,
        method: "GET",
      };
    },
  transformResponse: (response: any) => menu
}

