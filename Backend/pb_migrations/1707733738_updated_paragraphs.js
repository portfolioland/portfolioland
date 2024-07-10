/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("73jy8apc3ga6qxj")

  collection.name = "paragraph"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("73jy8apc3ga6qxj")

  collection.name = "paragraphs"

  return dao.saveCollection(collection)
})
