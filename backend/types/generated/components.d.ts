import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutDockItem extends Struct.ComponentSchema {
  collectionName: 'components_layout_dock_items';
  info: {
    description: '';
    displayName: 'DockItem';
    icon: 'link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    iconKey: Schema.Attribute.Enumeration<
      [
        'home',
        'palette',
        'folder',
        'camera',
        'file',
        'linkedin',
        'github',
        'envelope',
      ]
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    path: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectPdfLink extends Struct.ComponentSchema {
  collectionName: 'components_project_pdf_links';
  info: {
    description: '';
    displayName: 'PdfLink';
    icon: 'file-pdf';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'layout.dock-item': LayoutDockItem;
      'project.pdf-link': ProjectPdfLink;
    }
  }
}
