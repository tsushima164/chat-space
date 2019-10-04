# ChatSpace DB設計
## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

## groups_usersテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group# chat-space
