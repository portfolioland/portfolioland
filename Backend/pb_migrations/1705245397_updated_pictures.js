/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("imagte5o4n6kp1p")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("imagte5o4n6kp1p")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
