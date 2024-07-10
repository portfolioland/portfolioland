/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aumshklglg0uhjk")

  // remove
  collection.schema.removeField("10hd8slh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edkif1u9",
    "name": "condition",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aumshklglg0uhjk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "10hd8slh",
    "name": "condition",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("edkif1u9")

  return dao.saveCollection(collection)
})
