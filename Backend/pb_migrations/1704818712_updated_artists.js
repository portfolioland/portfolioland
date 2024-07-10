/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ekyttsa2tlutw93")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ekyttsa2tlutw93")

  collection.updateRule = "@collection.artists.name ?= @request.auth.name"

  return dao.saveCollection(collection)
})
