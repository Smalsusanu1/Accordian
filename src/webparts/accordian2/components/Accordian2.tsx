import * as React from 'react';
import styles from './Accordian2.module.scss';
import { IAccordian2Props } from './IAccordian2Props';
import { escape } from '@microsoft/sp-lodash-subset';
// import App from './accordian/accord';
import Getdata from './accordian/getdata';
import Groupby from './nextaccordian';

export default class Accordian2 extends React.Component<IAccordian2Props, {}> {
  public render(): React.ReactElement<IAccordian2Props> {
    return (
      <section >
        {/* <App/>
         <Getdata/> */}
         <Groupby/>
        
      </section>
    );
  }
}
