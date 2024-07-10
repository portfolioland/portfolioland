/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "obtnjbgm",
    "name": "artists",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ekyttsa2tlutw93",
      "cascadeDelete": true,
      "minSelect": 1,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("83ypztxha25124w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "obtnjbgm",
    "name": "artists",
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
})
