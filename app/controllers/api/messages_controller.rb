class Api::MessagesController < ApplicationController
  # 送られてきたメッセージのidを取得して、それよりも後に
  # 投稿されたメッセージのみ、DBから取得する
  def index
    @group = Group.find(params[:group_id])
    @messages = @group.messages.where("id > ?", params[:id]).includes(:user) if @group.messages.where("id > ?", params[:id])
    # binding.pry
    
    respond_to do |format|
      format.html
      format.json
    end
  end
end