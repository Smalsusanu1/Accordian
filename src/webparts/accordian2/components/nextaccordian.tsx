import * as React from "react";
import { useState, useEffect } from "react";
// import './FirstWebpart.module.scss';
import * as $ from 'jquery';
import * as Moment from 'moment';
// import './foundation.scss'
import "bootstrap/dist/css/bootstrap.min.css";  
import Accodian from "./accordian/accordian";

function Groupby() {

    const [show, setShow] = useState(false);
    const [data, setData] = useState([])
    const [Task, setTask] = useState([])
    const [expand, setExpand] = React.useState(false);
    const handleOpen = () => {
        setShow(!show);
    };
   
        RetrieveSPData();
        TaskUserItems();
   
    function TaskUserItems() {

        var spRequest = new XMLHttpRequest();
        var query = "Id,Title,Item_x0020_Cover,isDeleted,IsActive,UserGroup/Id,UserGroup/Title,ItemType,SortOrder,Suffix,AssingedToUserId,AssingedToUser/Title,AssingedToUser/EMail,AssingedToUser/Name,AssingedToUser/Id&$expand=UserGroup,AssingedToUser&$orderby=SortOrder asc,Title asc&$filter=IsActive eq 1";
        spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('b318ba84-e21d-4876-8851-88b94b9dc300')/items?$select=" + query);
        spRequest.setRequestHeader("Accept", "application/json");

        spRequest.onreadystatechange = function () {

            if (spRequest.readyState === 4 && spRequest.status === 200) {
                var result = JSON.parse(spRequest.responseText);


                setTask(result.value);


            }
            else if (spRequest.readyState === 4 && spRequest.status !== 200) {
                console.log('Error Occurred !');
            }
        };
        spRequest.send();
    }


    function RetrieveSPData() {


        var spRequest = new XMLHttpRequest();
        var query = "Id,Mileage,TaskListId,TaskListName,WorkspaceType,PortfolioLevel,PortfolioStructureID,component_x0020_link,Package,Comments,DueDate,Sitestagging,Body,Deliverables,SiteCompositionSettings,StartDate,Created,Item_x0020_Type,Help_x0020_Information,Background,Categories,TechnicalExplanations,Idea,ValueAdded,Synonyms,Package,Short_x0020_Description_x0020_On,Admin_x0020_Notes,AdminStatus,CategoryItem,Priority_x0020_Rank,Priority,TaskDueDate,DueDate,PercentComplete,Modified,CompletedDate,ItemRank,Title,Portfolio_x0020_Type,Parent/Id,Parent/Title,Component/Id,Component/Title,Component/ItemType,Services/Id,Services/Title,Services/ItemType,Events/Id,Events/Title,Events/ItemType,SharewebCategories/Id,SharewebCategories/Title,AssignedTo/Id,AssignedTo/Title,Team_x0020_Members/Id,Team_x0020_Members/Title,ClientCategory/Id,ClientCategory/Title&$expand=SharewebCategories,ClientCategory,Parent,Component,Services,Events,AssignedTo,Team_x0020_Members&$filter=((Item_x0020_Type eq 'Component') or (Item_x0020_Type eq 'SubComponent') or (Item_x0020_Type eq 'Feature'))and (Portfolio_x0020_Type eq 'Component')&$top=4999";
        spRequest.open('GET', "https://hhhhteams.sharepoint.com/sites/HHHH/SP/_api/lists/getbyid('ec34b38f-0669-480a-910c-f84e92e58adf')/items?$select=" + query);
        spRequest.setRequestHeader("Accept", "application/json");

        spRequest.onreadystatechange = function () {
            var RootComponentsData: any[] = [];
            var ComponentsData: any = [];
            var SubComponentsData: any = [];
            var FeatureData: any = [];
  
            if (spRequest.readyState === 4 && spRequest.status === 200) {
                var results = JSON.parse(spRequest.responseText);
                console.log(results)

                $.each(results.value, function (index, result) {
                    result.TeamLeaderUser=[]
                    result.DueDate = Moment(result.DueDate).format('DD-MM-YYYY')

                    if (result.AssignedTo != undefined && result.AssignedTo.length > 0) {
                        $.each(result.AssignedTo, function (index, Assig) {
                            if (Assig.Id != undefined) {
                                $.each(Task, function (index, users) {
                                    
                                    if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
                                        users.ItemCover = users.Item_x0020_Cover;
                                        result.TeamLeaderUser.push(users);
                                    }

                                })
                            }
                        })
                    }
                    if (result.Team_x0020_Members != undefined && result.Team_x0020_Members.length > 0) {
                        $.each(result.Team_x0020_Members, function (index, Assig) {
                            if (Assig.Id != undefined) {
                                $.each(Task, function (index, users) {
                                    if (Assig.Id != undefined && users.AssingedToUserId != undefined && Assig.Id == users.AssingedToUserId) {
                                        users.ItemCover = users.Item_x0020_Cover;
                                        result.TeamLeaderUser.push(users);
                                    }

                                })
                            }
                        })
                    }

                    if (result.ClientCategory != undefined && result.ClientCategory.length > 0) {
                        $.each(result.Team_x0020_Members, function (index, catego) {
                            result.ClientCategory.push(catego);
                        })
                    }
                    if (result.Item_x0020_Type == 'Root Component') {
                        result['Child'] = [];
                        RootComponentsData.push(result);
                    }
                    if (result.Item_x0020_Type == 'Component') {
                        result['Child'] = [];
                        ComponentsData.push(result);
                    }

                    if (result.Item_x0020_Type == 'SubComponent') {
                        result['Child'] = [];
                        SubComponentsData.push(result);
                    }
                    if (result.Item_x0020_Type == 'Feature') {
                        result['Child'] = [];
                        FeatureData.push(result);
                    }
                });

                $.each(SubComponentsData, function (index, subcomp) {
                    if (subcomp.Title != undefined) {
                        $.each(FeatureData, function (index, featurecomp) {
                            if (featurecomp.Parent != undefined && subcomp.Id === featurecomp.Parent.Id) {
                                subcomp['Child'].push(featurecomp);;
                            }
                        })
                    }
                })

                $.each(ComponentsData, function (index, subcomp) {
                    if (subcomp.Title !== undefined) {
                        $.each(SubComponentsData, function (index, featurecomp) {
                            if (featurecomp.Parent !== undefined && subcomp.Id === featurecomp.Parent.Id) {
                                subcomp['Child'].push(featurecomp);;
                            }
                        })
                    }
                })

                setData(ComponentsData);


            }
            else if (spRequest.readyState === 4 && spRequest.status !== 200) {
                console.log('Error Occurred !');
            }
        },
        spRequest.send();
    }
    return (
        <div className="app">
            <section className="TableContentSection">
                <div className="container-fluid">
                    <section className="TableSection">
                        <div className="container">
                            <div className="Alltable mt-10">
                                <table className='table table-hover'>
                                    <thead>
                                        <tr className="table table-striped">
                                            <th style={{ width: "2%" }}></th>
                                            <th style={{ width: "2%" }}></th>
                                            <th style={{ width: "6%" }}>Id</th>
                                            <th style={{ width: "20%" }}>
                                                <div style={{ width: "100%" }} className="tdcolm-relative">
                                                    <input type="search" placeholder="ID" className="full_width" ng-model="SearchComponent.Id" />
                                                    <span className="searchclear-bg" ng-show="SearchComponent.Id.length>0"
                                                        ng-click="clearSearchBox('SearchComponent','Id')">X</span>
                                                    <span className="sortingfilter">
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='Shareweb_x0020_ID'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('Shareweb_x0020_ID', false)"></i>
                                                        </span>
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-down hreflink {{orderBy.orderComponent=='Shareweb_x0020_ID'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('orderComponent','Shareweb_x0020_ID', true)"></i>
                                                        </span>
                                                    </span>

                                                </div>
                                            </th>
                                            <th style={{ width: "18%" }}>
                                                <div style={{ width: "100%" }} className="tdcolm-relative">
                                                    <input id="searchClientCategory" type="search" placeholder="Client Category"
                                                        title="Client Category" className="full_width"
                                                        ng-model="SearchComponent.searchClientCategory" />
                                                    <span className="searchclear-bg" ng-show="SearchComponent.searchClientCategory.length>0"
                                                        ng-click="clearSearchBox('SearchComponent','searchClientCategory')">X</span>
                                                    <span className="sortingfilter">
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('orderComponent','ClientCategoryTitle', false)"></i>
                                                        </span>
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-down hreflink {{orderB.orderComponenty=='ClientCategoryTitle'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('.orderComponent','ClientCategoryTitle', true)"></i>
                                                        </span>
                                                    </span>
                                                </div>
                                            </th>
                                            <th style={{ width: "20%" }}>
                                                <div style={{ width: "100%" }} className="tdcolm-relative">
                                                    <input id="searchClientCategory" type="search" placeholder="Client Category"
                                                        title="Client Category" className="full_width"
                                                        ng-model="SearchComponent.searchClientCategory" />
                                                    <span className="searchclear-bg" ng-show="SearchComponent.searchClientCategory.length>0"
                                                        ng-click="clearSearchBox('SearchComponent','searchClientCategory')">X</span>
                                                    <span className="sortingfilter">
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('orderComponent','ClientCategoryTitle', false)"></i>
                                                        </span>
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-down hreflink {{orderB.orderComponenty=='ClientCategoryTitle'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('.orderComponent','ClientCategoryTitle', true)"></i>
                                                        </span>
                                                    </span>
                                                </div>
                                            </th>
                                            <th style={{ width: "10%" }}>
                                                <div style={{ width: "100%" }} className="tdcolm-relative">
                                                    <input id="searchClientCategory" type="search" placeholder="Client Category"
                                                        title="Client Category" className="full_width"
                                                        ng-model="SearchComponent.searchClientCategory" />
                                                    <span className="searchclear-bg" ng-show="SearchComponent.searchClientCategory.length>0"
                                                        ng-click="clearSearchBox('SearchComponent','searchClientCategory')">X</span>
                                                    <span className="sortingfilter">
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('orderComponent','ClientCategoryTitle', false)"></i>
                                                        </span>
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-down hreflink {{orderB.orderComponenty=='ClientCategoryTitle'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('.orderComponent','ClientCategoryTitle', true)"></i>
                                                        </span>
                                                    </span>
                                                </div>
                                            </th>
                                            <th style={{ width: "10%" }}>
                                                <div style={{ width: "100%" }} className="tdcolm-relative">
                                                    <input id="searchClientCategory" type="search" placeholder="Client Category"
                                                        title="Client Category" className="full_width"
                                                        ng-model="SearchComponent.searchClientCategory" />
                                                    <span className="searchclear-bg" ng-show="SearchComponent.searchClientCategory.length>0"
                                                        ng-click="clearSearchBox('SearchComponent','searchClientCategory')">X</span>
                                                    <span className="sortingfilter">
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('orderComponent','ClientCategoryTitle', false)"/>
                                                        </span>
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-down hreflink {{orderB.orderComponenty=='ClientCategoryTitle'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('.orderComponent','ClientCategoryTitle', true)"/>
                                                        </span>
                                                    </span>
                                                </div>
                                            </th>
                                            <th style={{ width: "10%" }}>
                                                <div style={{ width: "100%" }} className="tdcolm-relative">
                                                    <input id="searchClientCategory" type="search" placeholder="Client Category"
                                                        title="Client Category" className="full_width"
                                                        ng-model="SearchComponent.searchClientCategory" />
                                                    <span className="searchclear-bg" ng-show="SearchComponent.searchClientCategory.length>0"
                                                        ng-click="clearSearchBox('SearchComponent','searchClientCategory')">X</span>
                                                    <span className="sortingfilter">
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-up hreflink {{orderBy.orderComponent=='ClientCategoryTitle'&&!reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('orderComponent','ClientCategoryTitle', false)"></i>
                                                        </span>
                                                        <span className="ml0">
                                                            <i className="fa fa-angle-down hreflink {{orderB.orderComponenty=='ClientCategoryTitle'&&reverse.orderComponent?'footerUsercolor':''}}"
                                                                ng-click="sortBy('.orderComponent','ClientCategoryTitle', true)"></i>
                                                        </span>
                                                    </span>
                                                </div>
                                            </th>
                                            <th style={{ width: "2%" }}></th>
                                        </tr>
                                    </thead>
                                    <Accodian explorer={data}/>
                                    <tbody>
                                        {data && data.map(function (item) {
                                            return (
                                                <>  <tr>
                                                    {/* <td colSpan={10}>
                            <table>
                              <tr> */}
                                                    <td >
                                                            <a className='hreflink' onClick={handleOpen}
                                                            
                                                                title="Tap to expand the childs">
                                                                    <div>{show?'+':'-'}</div>
                                                                <img ng-show="pagesType=='Team-Portfolio'" style={{ width: "10px" }}
                                                                    src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/right-list-icon.png" />
                                                             </a>
                                                        {/* {item.expanded ? (
                                                            <a className='hreflink'
                                                            onClick={() => setExpand((prevState) => !prevState)}
                                                                title="Tap to Shrink the childs">
                                                                <img ng-show="pagesType=='Team-Portfolio'" style={{ width: "10px" }}
                                                                    src="https://hhhhteams.sharepoint.com/sites/HHHH/SP/SiteCollectionImages/ICONS/24/list-icon.png" />
                                                            </a>) : null} */}

                                                    </td>
                                                    <td style={{ width: "2%" }}></td>
                                                    <td style={{ width: "6%" }}>{item.Id}</td>
                                                    <td style={{ width: "20%" }}>{item.Title}</td>
                                                    <td style={{ width: "18%" }}>
                                                        <div>
                                                            {item.ClientCategory.map(function (client: { Title: string; }) {
                                                                return (
                                                                    <div className="ClientCategory-Usericon"
                                                                        title="{client.ParentClientCategoryStructure}">
                                                                        <a>{client.Title.slice(0, 2).toUpperCase()}</a>
                                                                    </div>
                                                                )
                                                            })}</div>
                                                    </td>
                                                    <td style={{ width: "20%" }}>
                                                        <div>{item.TeamLeaderUser.map(function (client1: { Title: string; }) {
                                                            return (
                                                                <div className="ClientCategory-Usericon"
                                                                    title="{client.ParentClientCategoryStructure}">

                                                                    <a>{client1.Title.slice(0, 2).toUpperCase()}</a>

                                                                </div>
                                                            )
                                                        })}</div></td>
                                                    <td style={{ width: "10%" }}>{item.Status}</td>
                                                    <td style={{ width: "10%" }}>{item.ItemRank}</td>
                                                    <td style={{ width: "10%" }}>{item.DueDate}</td>
                                                    <td style={{ width: "2%" }}></td>

                                                </tr>
                                                    {show ? (
                                                        <span>
                                                            {item.Child.map(function (childitem: any) {

                                                                return (

                                                                    <tr >
                                                                        <td style={{ width: "2%" }}></td>
                                                                        <td style={{ width: "2%" }}></td>
                                                                        <td style={{ width: "6%" }}>Id1223</td>
                                                                        <td style={{ width: "20%" }}>{item.Title}</td>
                                                                        <td style={{ width: "18%" }}>
                                                                            <div>
                                                                                {item.ClientCategory.map(function (client: { Title: string; }) {
                                                                                    return (
                                                                                        <div className="ClientCategory-Usericon"
                                                                                            title="{client.ParentClientCategoryStructure}">
                                                                                            <a>{client.Title.slice(0, 2).toUpperCase()}</a>
                                                                                        </div>
                                                                                    )
                                                                                })}</div>
                                                                        </td>
                                                                        <td style={{ width: "20%" }}>
                                                                            <div>{item.TeamLeaderUser.map(function (client1: { Title: string; }) {
                                                                                return (
                                                                                    <div className="ClientCategory-Usericon"
                                                                                        title="{client.ParentClientCategoryStructure}">

                                                                                        <a>{client1.Title.slice(0, 2).toUpperCase()}</a>

                                                                                    </div>
                                                                                )
                                                                            })}</div></td>
                                                                        <td style={{ width: "10%" }}>{item.Status}</td>
                                                                        <td style={{ width: "10%" }}>{item.ItemRank}</td>
                                                                        <td style={{ width: "10%" }}>{item.DueDate}</td>
                                                                        <td style={{ width: "2%" }}></td>
                                                                    </tr>

                                                                )
                                                            })}
                                                        </span>
                                                    ) : false}
                                                </>


                                            )
                                        })}



                                    </tbody>



                                </table></div></div></section>
                </div></section>
        </div>
    );
}
export default Groupby;



