/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("73jy8apc3ga6qxj")

  collection.createRule = "artist.id = @request.auth.artist.id"
  collection.updateRule = "artist.id = @request.auth.artist.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("73jy8apc3ga6qxj")

  collection.createRule = "artist = @request.auth.artist.id"
  collection.updateRule = "artist = @request.auth.artist.id"

  return dao.saveCollection(collection)
})
