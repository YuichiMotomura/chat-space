class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # ユーザー非ログイン時、ログインページにリダイレクト
  before_action :authenticate_user!
  # deviseに、サインアップ時のストロングパラメータに、nameを追加
  # (deviseの初期設定のストロングパラメータはメールアドレスとPW)
  before_action :config_permitted_parameters, if: :devise_controller?

  protected

  def config_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

end
