require 'test_helper'

class TempUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @temp_user = temp_users(:one)
  end

  test "should get index" do
    get temp_users_url, as: :json
    assert_response :success
  end

  test "should create temp_user" do
    assert_difference('TempUser.count') do
      post temp_users_url, params: { temp_user: { string: @temp_user.string, username: @temp_user.username } }, as: :json
    end

    assert_response 201
  end

  test "should show temp_user" do
    get temp_user_url(@temp_user), as: :json
    assert_response :success
  end

  test "should update temp_user" do
    patch temp_user_url(@temp_user), params: { temp_user: { string: @temp_user.string, username: @temp_user.username } }, as: :json
    assert_response 200
  end

  test "should destroy temp_user" do
    assert_difference('TempUser.count', -1) do
      delete temp_user_url(@temp_user), as: :json
    end

    assert_response 204
  end
end
