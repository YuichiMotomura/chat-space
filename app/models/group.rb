class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users
  has_many :messages
  validates :name, presence: true

  def show_last_message
    last_message = messages.last
    if last_message.present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージがありません'
    end
  end
end
