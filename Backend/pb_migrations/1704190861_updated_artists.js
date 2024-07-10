/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("72ait7gic5s6y7j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b15a1n2t",
    "name": "pronomen",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cmgscuhl",
    "name": "klasse",
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
  const collection = dao.findCollectionByNameOrId("72ait7gic5s6y7j")

  // remove
  collection.schema.removeField("b15a1n2t")

  // remove
  collection.schema.removeField("cmgscuhl")

  return dao.saveCollection(collection)
})
