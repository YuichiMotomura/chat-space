class GroupUser < ApplicationRecord
  # 中間テーブル
  belongs_to :user
  belongs_to :group
end
