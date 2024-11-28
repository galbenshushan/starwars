import axios from "axios";
import { Categories } from "../enums/apiEnums";
import { Result } from "../types/apiTypes";

export default class SwapiService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || "https://swapi.dev/api";
  }

  public searchAllEntities = async (query: string) => {
    const endpoints = Object.values(Categories);
    const results = [];
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/${endpoint}?search=${query}`
        );
        results.push({
          category: endpoint,
          data: response.data.results,
        });
      } catch (error) {
        console.error(`Error fetching ${endpoint} with query ${query}:`, error);
      }
    }

    return results;
  };

  public getEntityByUrl = async (url?: string, endpoint?: Categories) => {
    try {
      if (!url) {
        url = `${this.baseUrl}/${endpoint}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching entity with url of ${url}:`, error);
      return null;
    }
  };

  public getAllEntities = async () => {
    const endpoints = Object.values(Categories);
    const results: Result[] = [];
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${this.baseUrl}/${endpoint}`);
        results.push({
          category: endpoint,
          data: response.data.results,
        });
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    }
    return results;
  };
}
