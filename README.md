## messagesテーブル

| Column   | Type    | Options                          |
| -------- | ------- | -------------------------------- |
| body     | text    | null:  false                     |
| image    | string  |                                  |
| user_id  | integer | null:  false, foreign_key:  true |
| group_id | integer | null:  false, foreign_key:  true |

### Association

- belongs_to	:user
- belongs_to	:group



## usersテーブル

| Column | Type   | Options                    |
| ------ | ------ | -------------------------- |
| name   | string | null: false                |
| email  | string | null: false,  unique: true |

### Association

- has_many	:messages
- has_many :users_groups
- has_many   :groups, through:	:users_groups



## groupsテーブル

| Column     | Type    | Options                         |
| ---------- | ------- | ------------------------------- |
| group_name | string  | null: false, unique: true       |
| user_id    | integer | null: false, foreign_key: true  |
| message_id | integer | unique: true, foreign_key: true |

###Association

- has_many :messages
- has_many :users_groups
- has_many  :users, through:  :users_groups



##users_groupsテーブル
| Column    | Type    | Options                        |
| --------- | ------- | ------------------------------ |
| users_id  | integer | null: false, foreign_key: true |
| groups_id | integer | null: false, foreign_key: true |

###Association

- belongs_to :user
- belongs_to :group