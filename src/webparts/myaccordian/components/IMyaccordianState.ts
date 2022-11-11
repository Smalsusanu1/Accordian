import IAccordionListItem from '../models/IAccordionListItem';

export interface IMyaccordianState {
  status: string;
  pagedItems: IAccordionListItem[];
  items: IAccordionListItem[];
  listItems: IAccordionListItem[];
  isLoading: boolean;
  loaderMessage: string;
  error: string;
}