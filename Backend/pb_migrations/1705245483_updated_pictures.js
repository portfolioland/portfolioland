/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("imagte5o4n6kp1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sbhtglah",
    "name": "artist",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ekyttsa2tlutw93",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("imagte5o4n6kp1p")

  // remove
  collection.schema.removeField("sbhtglah")

  return dao.saveCollection(collection)
})
