/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("apy0eo8uitwvf99")

  collection.listRule = "@request.auth.username =\"ElkoBraas\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("apy0eo8uitwvf99")

  collection.listRule = "@request.auth.username =\"Elko\""

  return dao.saveCollection(collection)
})
