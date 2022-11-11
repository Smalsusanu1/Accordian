import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version , DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {  PropertyPaneSlider,  PropertyPaneToggle } from "@microsoft/sp-property-pane";


import * as strings from 'MyaccordianWebPartStrings';
import Myaccordian from './components/Myaccordian';
import { IMyaccordianProps } from './components/IMyaccordianProps';

export interface IMyaccordianWebPartProps {
  listName: string;
  choice: string;
  title: string;
  displayMode: DisplayMode;
  totalItems: number;
  maxItemsPerPage: number;
  enablePaging: boolean;
  customSortField: string;
  sortById: boolean;
  sortByModified: boolean;
  updateProperty: (value: string) => void;
}

export default class MyaccordianWebPart extends BaseClientSideWebPart<IMyaccordianWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IMyaccordianProps> = React.createElement(
      Myaccordian,
      {
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        title: this.properties.title,
        displayMode: this.displayMode,
        totalItems: this.properties.totalItems,
        maxItemsPerPage: this.properties.maxItemsPerPage,
        enablePaging: this.properties.enablePaging,
        customSortField: this.properties.customSortField,
        sortById: this.properties.sortById,
        sortByModified: this.properties.sortByModified,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );
    ReactDom.render(element, this.domElement);
  }

  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                
                }),
                PropertyPaneSlider('totalItems', {
                  label: strings.TotalItemsLabel,
                  ariaLabel: strings.TotalItemsLabel,
                  min: 3,
                  max: 5000,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneToggle('enablePaging', {
                  label: strings.EnablePagingLabel
                }),
                PropertyPaneSlider('maxItemsPerPage', {
                  disabled: !this.properties.enablePaging,
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 5000,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneTextField('customSortField', {
                  label: strings.CustomSortOrder
                }),
                PropertyPaneToggle('sortById', {
                  label: strings.SortById
                }),PropertyPaneToggle('sortByModified', {
                  label: strings.SortByModified
                })
              ]
            }
          ]
        }
      ]
    };
  }
}