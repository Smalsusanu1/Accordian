import * as React from 'react';








function Accodian({ explorer }: any) {
  const [expand, setExpand] = React.useState(false);


     
  if (explorer.children) {
    return (
      <div>
        {/* {explorer.children ? ( */}


        <tbody>
                                        {explorer && explorer.map(function (item: { Id: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; Title: {}; ClientCategory: any[]; TeamLeaderUser: any[]; Status: {}; ItemRank: {}; DueDate: {}; Child: any[]; }) {
                                            return (
                                                <>  <tr>
                                                    {/* <td colSpan={10}>
                            <table>
                              <tr> */}
                                                    <td >
                                                            <a className='hreflink'
                                                            //  onClick={handleOpen}
                                                            
                                                                title="Tap to expand the childs">
                                                                    {/* <div>{show?'+':'-'}</div> */}
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
                                                    {explorer ? (
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






        {/* <>
          <div style={{"width":"100%","backgroundColor":"red","animation":"ease-in","font":"menu"}}  onClick={() => setExpand((prevState) => !prevState)}>
         {explorer.name}
          </div>
          {expand ? (
            <>
              {explorer.children.map((child: any) => {
                // return <div key={child.name} style = {{paddingLeft: '20px'}}>{child.name}</div>;
                return <Accodian explorer={child} key={child.name} />;
              })}
            </>
          ) : null}
        </> */}
        {/* ) : null} */}
      </div>
    );
  } else {
    return <div style={{ paddingLeft: "20px" }}>{explorer.name}</div>;
  }
}

export default Accodian;
