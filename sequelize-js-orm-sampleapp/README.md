## setup
```sh
npm install
npx sequelize-cli init
```


## generate model/migrations
```sh
npx sequelize-cli model:generate --name User --attributes name:string,email:string
npx sequelize-cli model:generate --name Chatroom --attributes title:string
npx sequelize-cli model:generate --name ChatMember --attributes userId:integer,chatroomId:integer
npx sequelize-cli model:generate --name Message --attributes postedUserId:integer,content:text
```

stringはデフォルトで最大長255文字まで、textは任意長テキストっぽい
https://sequelize.org/master/class/lib/data-types.js~STRING.html
https://sequelize.org/master/class/lib/data-types.js~TEXT.html


## generate seeder

``` sh
npx sequelize-cli seed:generate --name create-users
npx sequelize-cli seed:generate --name create-chatroom
npx sequelize-cli seed:generate --name create-chatmember
```

many to manyではassociation用のテーブルを作成してモデル間のリレーションはthroughで指定するといいらしい

```js
Tutorial.belongsToMany(Tag, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tutorial_id",
});

Tag.belongsToMany(Tutorial, {
  through: "tutorial_tag",
  as: "tutorials",
  foreignKey: "tag_id",
});
```
