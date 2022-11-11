declare interface IMyaccordianWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListNameLabel: string;
  MaxItemsPerPageLabel: string;
  EnablePagingLabel: string;
  TotalItemsLabel:string;
  CustomSortOrder:string;
  SortById:string;
  SortByModified:string;
}

declare module 'MyaccordianWebPartStrings' {
  const strings: IMyaccordianWebPartStrings;
  export = strings;
}
