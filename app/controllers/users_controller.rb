class UsersController < ApplicationController
  def index
    user = params[:user]
    @users = User.where('name like ?', "%#{user}%").where.not(id: current_user) if user.length > 0
    # binding.pry
    respond_to do |format|
      format.html
      format.json
    end

  end

  def edit
  end

  # ユーザー変更処理(update)出来た場合と出来なかった場合の分岐
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end