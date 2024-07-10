/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  // remove
  collection.schema.removeField("eh2ohccq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "erckfpwu",
    "name": "tag",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "7bqmym825fumeh4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eh2ohccq",
    "name": "tag",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  // remove
  collection.schema.removeField("erckfpwu")

  return dao.saveCollection(collection)
})
