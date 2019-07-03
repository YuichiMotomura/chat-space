class MessagesController < ApplicationController
  before_action :set_group
  def index
    @message = Message.new
    # @group.messagesの個々のメッセージのuserをincludesで取得
    @messages = @group.messages.includes(:user)
  end

  def create
    # @group.messages.new が今ひとつ..
    # 保存に成功した場合と失敗した場合で分岐
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力して下さい'
      render  :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
end
