const path = require('path')

exports.hentaiViewing = async ({ actions, graphql }) => {
  const { createPage } = actions

  const gqlFetch = await graphql(`
    query HentaiViewingQuery {
      allHentai {
        edges {
          node {
            exclude
            raw {
              id
              images {
                cover {
                  h
                  t
                  w
                }
                pages {
                  h
                  t
                  w
                }
              }
              title {
                pretty
              }
              media_id
              tags {
                type
                name
                id
              }
            }
          }
        }
      }
    }
  `)

  const tranformedData = gqlFetch.data.allHentai.edges.map(edge => edge.node)

  /**
   * Create gallery pages
   */
  tranformedData.map(node => {
    createPage({
      path: `/r/${node.raw.id}`,
      component: path.resolve(
        `./src/templates/hentai/viewing/components/index.tsx`
      ),
      context: {
        raw: node,
      },
    })
  })
}
