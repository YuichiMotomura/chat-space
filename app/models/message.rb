class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  # バリデーション
  # :imageが無い=>false => unlessなので、:contentは必要ということか？
  validates :content, presence: true, unless: :image?
  mount_uploader  :image, ImageUploader
end
