require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it "is valid with content and image "do
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end

      it "is valid with content "do
        message = build(:message, image: nil)
        message.valid?
        expect(message).to be_valid
      end

      it "is valid with image "do
      message = build(:message, content: nil)
      message.valid?
      expect(message).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        # errorsメソッドは、valid?メソッドを利用したインスタンスに対して
        # 使用することで、バリデーションエラーの理由を確認できる
        expect(message.errors[:content]).to include("を入力してください")
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'is invalid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        # binding.pry
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end