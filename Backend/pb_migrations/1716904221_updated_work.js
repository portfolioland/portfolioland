/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  collection.indexes = [
    "CREATE INDEX `idx_u9saUfI` ON `work` (\n  `title`,\n  `public`,\n  `user`,\n  `description`,\n  `artists`,\n  `jahr`,\n  `tag`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  collection.indexes = []

  return dao.saveCollection(collection)
})
