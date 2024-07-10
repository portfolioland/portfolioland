/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lfqnn1kd",
    "name": "position",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  // remove
  collection.schema.removeField("lfqnn1kd")

  return dao.saveCollection(collection)
})
