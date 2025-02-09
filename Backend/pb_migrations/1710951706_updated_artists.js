/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ekyttsa2tlutw93")

  collection.createRule = "user.artist.id = @request.auth.id"
  collection.updateRule = "user.artist.id = @request.auth.id"
  collection.deleteRule = "user.artist.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ekyttsa2tlutw93")

  collection.createRule = "id = @request.auth.id"
  collection.updateRule = "id = @request.auth.id"
  collection.deleteRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
