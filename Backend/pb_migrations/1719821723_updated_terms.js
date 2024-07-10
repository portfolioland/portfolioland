/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aumshklglg0uhjk")

  // update
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aumshklglg0uhjk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "10hd8slh",
    "name": "terms",
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

  return dao.saveCollection(collection)
})
