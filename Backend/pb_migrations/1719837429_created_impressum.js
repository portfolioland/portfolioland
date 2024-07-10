/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "u4jhmc9ivv2zcda",
    "created": "2024-07-01 12:37:09.397Z",
    "updated": "2024-07-01 12:37:09.397Z",
    "name": "impressum",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nfhrsflc",
        "name": "impressum",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
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
  const collection = dao.findCollectionByNameOrId("u4jhmc9ivv2zcda");

  return dao.deleteCollection(collection);
})
