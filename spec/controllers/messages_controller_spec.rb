require 'rails_helper'

describe MessagesController do
  # letメソッド: 初回呼び出し時のみ実行される
  # インスタンス生成
  # beforeブロック内:書くexampleが実行される直前に
  # 毎回実行される
  let(:group) {create(:group)}
  let(:user) {create(:user)}
  describe '#index' do
    context 'log in' do
      before do
        # loginメソッド=>controller_macroに定義
        login user
        get :index, params: { group_id: group.id}
      end
      # アクション内で定義しているインスタンス変数があるか
      # assigns(:message)で@messageを参照
      # be_a_newマッチャ:未保存のレコードであるかテスト
      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { {group_id: group.id, user_id: user.id, message: attributes_for(:message)}}

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post  :create,
          params: params
        }

        # changeマッチャで、レコードの総数が1個増えたかどうかを確認
        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { {group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil)}}
        
        subject {
          post  :create,
          params: invalid_params
        }

        # not_to で、Messageモデルのレコード数が変化しないことを確認
        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it  'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post  :create, params:  params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end