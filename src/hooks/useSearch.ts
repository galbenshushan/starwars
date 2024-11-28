import { useQuery } from "react-query";
import { swapiService } from "../services";

export const useSearch = (query: string) => {
  const { searchAllEntities } = swapiService;
  return useQuery(["search", query], () => searchAllEntities(query), {
    enabled: !!query,
  });
};
