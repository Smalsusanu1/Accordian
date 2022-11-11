export default (
    activeColour: string,
    inactiveColor: string,
    textColor: string,
  ): string =>
    `  
  #nested-accordion details[open] {
    border-style: solid;
    border-color: ${activeColour};
  }
  
  #nested-accordion summary {
    color: ${textColor};
    background-color: ${inactiveColor};
    cursor: pointer;
    padding: 1rem;
    font-weight: bold;
  }
  
  #nested-accordion summary:hover, #nested-accordion summary:focus, #nested-accordion details[open] > summary {
    background-color: ${activeColour};
  }
  
  #nested-accordion details.empty summary {
    background-color: ${inactiveColor};
    cursor: auto;
    color: ${activeColour};
    font-style: italic;
    list-style: none;
    padding-left: 2rem;
  }
  
  #nested-accordion details.empty summary::-webkit-details-marker {
    display:none;
  }
  
  #nested-accordion details > p {
    padding: 1rem;
  }
  
  #nested-accordion details > div {
    padding: 0.5rem;
  }
  `;