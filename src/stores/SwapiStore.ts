import { observable, action, runInAction, makeObservable } from "mobx";
import { swapiService } from "../services";
import { appStore } from "./AppStore";
import { Option } from "../types/apiTypes";
import { Categories } from "../enums/apiEnums";
import { DisplayFieldLabels } from "../enums/fieldsEnums";
import { capitalize } from "../utils/Strings";

class SwapiStore {
  @observable public entities: { category: string; data: any[] }[] = [];
  @observable public selectedOption: Option | null = null;
  @observable public openEntityModal: boolean = false;
  @observable public openShowMoreModal: boolean = false;
  @observable public entityFieldsConfig: any = {};

  constructor() {
    makeObservable(this);
    this.fetchAllEntities();
  }

  setOpenEntityModal(value: boolean) {
    this.openEntityModal = value;
  }

  setOpenShowMoreModal(value: boolean) {
    this.openShowMoreModal = value;
  }

  setSelectedOption(entity: Option | null) {
    this.selectedOption = entity;
  }

  setEntityFieldsConfig(config: any) {
    this.entityFieldsConfig = config;
  }

  public resetAndCloseEntityModal = () => {
    this.setEntityFieldsConfig({});
    this.setOpenEntityModal(false);
    if (this.selectedOption) this.setSelectedOption(null);
  };

  private get serializeEntities() {
    return this.entities.flatMap((category) =>
      category.data.map((item: any) => ({
        ...item,
        category: category.category,
      }))
    );
  }

  public serializeEntitiesForSearch = (query: string) => {
    return this.serializeEntities.filter((item: any) =>
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

  public addEntity(newEntity: Option) {
    const categoryIndex = this.entities.findIndex(
      (item) => item.category === newEntity.category
    );
    if (categoryIndex !== -1) {
      this.entities[categoryIndex].data.push(newEntity);
    } else {
      this.entities.push({
        category: newEntity.category,
        data: [newEntity],
      });
    }
  }

  public removeEntity = (entity: Option) => {
    this.entities = this.entities.map((category) => ({
      category: category.category,
      data: category.data.filter(
        (item) => item.name !== entity.name || item.title !== entity.title
      ),
    }));
  };

  public updateEntity = (updatedEntity: Option) => {
    this.entities = this.entities.map((category) => ({
      category: category.category,
      data: category.data,
    }));
  };

  public getEntityConfig = (
    templateEntity: Record<string, any>
  ): Record<string, string> => {
    return Object.keys(templateEntity).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as Record<string, string>);
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

  public handleNewOrEdit = (entity: Option) => {
    this.setSelectedOption(entity);
    this.setOpenEntityModal(true);
  };
}

export const swapiStore = new SwapiStore();
