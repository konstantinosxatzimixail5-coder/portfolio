// The left-hand list in the Studio, set in the order the site reads: the pages
// first, then the collections, then settings at the bottom.
//
// The four singletons are pinned to a fixed document id so the site can fetch
// them without guessing, and so a second one cannot be created by accident.

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('Reel')
        .id('reelPage')
        .child(S.document().schemaType('reelPage').documentId('reelPage')),

      S.listItem()
        .title('Spec shelf')
        .id('specPage')
        .child(S.document().schemaType('specPage').documentId('specPage')),

      S.divider(),

      S.listItem()
        .title('Case studies')
        .schemaType('work')
        .child(S.documentTypeList('work').title('Case studies').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.listItem()
        .title('Spec brands')
        .schemaType('specBrand')
        .child(
          S.documentTypeList('specBrand')
            .title('Spec brands')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Shelf cards')
        .schemaType('shelfCard')
        .child(
          S.documentTypeList('shelfCard')
            .title('Shelf cards')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Pipelines')
        .schemaType('pipeline')
        .child(
          S.documentTypeList('pipeline')
            .title('Pipelines')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);
