class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string  :content
      t.string  :image
      # 外部キー references型で設定するので、group_idのような_idは不要となる
      # referencesを使用すると、インデックスの設定も自動的に行われる
      t.references  :group, foreign_key: true
      t.references  :user, foreign_key: true
      t.timestamps
    end
  end
end
