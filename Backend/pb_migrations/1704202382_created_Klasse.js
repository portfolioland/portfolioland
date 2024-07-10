/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0bs9v9f0beu6gtx",
    "created": "2024-01-02 13:33:02.564Z",
    "updated": "2024-01-02 13:33:02.564Z",
    "name": "Klasse",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pgjrhdf2",
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
  const collection = dao.findCollectionByNameOrId("0bs9v9f0beu6gtx");

  return dao.deleteCollection(collection);
})
