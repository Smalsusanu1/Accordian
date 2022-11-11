export type SectionData = {
    title: string;
    text?: string;
    children?: Array<SectionData>;
  };
  
  const createSection = (sectionData: SectionData): string => {
    const hasText = 'text' in sectionData && sectionData.text.length > 0;
    const hasChildren =
      'children' in sectionData && sectionData.children.length > 0;
  
    return `<details ${
      !hasText && !hasChildren ? 'class="empty" tabindex="-1"' : ''
    }>
  <summary>${sectionData.title}</summary>
  ${
    hasText
      ? sectionData.text
          .split('\n\n')
          .map((t) => `<p>${t}</p>`)
          .join('\n')
      : ''
  }
  ${
    hasChildren
      ? `<div>${sectionData.children.map(createSection).join('\n')}</div>`
      : ''
  }
  </details>`;
  };
  
  const generateHtml = (data: Array<SectionData>): string => {
    return `<div id="nested-accordion">\n${data
      .map(createSection)
      .join('\n')}\n</div>`;
  };
  
  export default generateHtml;