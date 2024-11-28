import { observable, action, runInAction, makeObservable } from "mobx";
import { swapiService } from "../services";
import { appStore } from "./AppStore";
import { Option } from "../types/apiTypes";
import { Categories } from "../enums/apiEnums";
import { DisplayFieldLabels } from "../enums/fieldsEnums";
import { capitalize } from "../utils/Strings";

class SwapiStore {
  @observable entities: { category: string; data: any[] }[] = [];
  @observable selectedOption: Option | null = null;
  @observable openModal: boolean = false;

  constructor() {
    makeObservable(this);
    this.fetchAllEntities();
  }

  setOpenModal(value: boolean) {
    this.openModal = value;
  }

  setSelectedOption(entity: Option | null) {
    this.selectedOption = entity;
  }

  public serializeEntitiesForSearch = (query: string) => {
    return this.entities
      .flatMap((category) =>
        category.data.map((item: any) => ({
          ...item,
          category: category.category,
        }))
      )
      .filter((item: any) =>
        (item.name || item.title).toLowerCase().includes(query.toLowerCase())
      );
  };

  @action public fetchAllEntities = async () => {
    try {
      appStore.setLoading(true);
      const results = await swapiService.getAllEntities();
      if (Array.isArray(results)) {
        runInAction(() => {
          this.entities = results;
        });
      } else {
        console.error("Unexpected API response:", results);
      }
    } catch (error) {
      console.error("Error fetching entities:", error);
    } finally {
      appStore.setLoading(false);
    }
  };

  @action public fetchEntity = async (url?: string, category?: Categories) => {
    try {
      appStore.setLoading(true);
      const entity = await swapiService.getEntityByUrl(url, category);
      if (entity) {
        return entity;
      } else {
        console.error(`No entity found`);
      }
    } catch (error) {
      console.error(`Error fetching`, error);
    } finally {
      appStore.setLoading(false);
    }
  };

  public getDisplayFields = (entity: any) => {
    return [
      { label: DisplayFieldLabels.Height, value: entity.height },
      { label: DisplayFieldLabels.Mass, value: entity.mass },
      {
        label: DisplayFieldLabels.Gender,
        value: capitalize(entity.gender || ""),
      },
      { label: DisplayFieldLabels.BirthYear, value: entity.birth_year },
      { label: DisplayFieldLabels.Director, value: entity.director },
      { label: DisplayFieldLabels.Producer, value: entity.producer },
      { label: DisplayFieldLabels.ReleaseDate, value: entity.release_date },
      {
        label: DisplayFieldLabels.Classification,
        value: capitalize(entity.classification || ""),
      },
      {
        label: DisplayFieldLabels.Designation,
        value: capitalize(entity.designation || ""),
      },
      { label: DisplayFieldLabels.AverageHeight, value: entity.average_height },
      {
        label: DisplayFieldLabels.RotationPeriod,
        value: entity.rotation_period,
      },
      { label: DisplayFieldLabels.OrbitalPeriod, value: entity.orbital_period },
      { label: DisplayFieldLabels.Diameter, value: entity.diameter },
    ].filter((field) => field.value && field.value !== "n/a");
  };

  public getEntityOpenCrawl = (entity: any) => {
    return entity?.opening_crawl;
  };

  public handleShowMore = (entity: Option) => {
    this.setSelectedOption(entity);
    this.setOpenModal(true);
  };
}

export const swapiStore = new SwapiStore();
