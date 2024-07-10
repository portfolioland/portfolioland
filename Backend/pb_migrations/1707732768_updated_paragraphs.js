/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("73jy8apc3ga6qxj")

  collection.createRule = "id = @request.auth.id"
  collection.updateRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("73jy8apc3ga6qxj")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
