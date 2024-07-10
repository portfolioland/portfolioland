/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7bqmym825fumeh4",
    "created": "2024-02-05 10:54:40.783Z",
    "updated": "2024-02-05 10:54:40.783Z",
    "name": "tag",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pyjxxhey",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7bqmym825fumeh4");

  return dao.deleteCollection(collection);
})
