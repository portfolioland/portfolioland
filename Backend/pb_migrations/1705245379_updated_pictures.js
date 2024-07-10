/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("imagte5o4n6kp1p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xmxeovgb",
    "name": "field1",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("imagte5o4n6kp1p")

  // remove
  collection.schema.removeField("xmxeovgb")

  return dao.saveCollection(collection)
})
